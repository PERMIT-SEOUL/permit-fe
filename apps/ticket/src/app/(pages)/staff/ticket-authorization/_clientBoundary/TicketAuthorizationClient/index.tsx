"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { Flex, Typography } from "@permit/design-system";
import { useGuestTicketDoorValidationQuery } from "@/data/tickets/getGuestTicketDoorValidation/queries";
import { useTicketDoorValidationQuery } from "@/data/tickets/getTicketDoorValidation/queries";
import { isAxiosErrorResponse } from "@/shared/types/axioxError";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

// 에러 코드 상수
const NO_ENTRY_TIME = 40013;
const ALREADY_USED_TICKET = 40906;
const CANCELED_TICKET = 40015;

/**
 * QR 코드에서 ticketCode 추출
 * URL 형식: /entry/{ticketCode} 또는 /entry/guest/{ticketCode}
 */
const extractTicketCode = (qrData: string): { ticketCode: string; isGuest: boolean } | null => {
  try {
    // URL 형식인 경우
    const urlPattern = /\/entry\/(?:guest\/)?([^/?\s]+)/;
    const match = qrData.match(urlPattern);

    if (match && match[1]) {
      const isGuest = qrData.includes("/entry/guest/");

      return { ticketCode: match[1], isGuest };
    }

    // URL이 아닌 경우 직접 ticketCode로 간주
    return { ticketCode: qrData.trim(), isGuest: false };
  } catch {
    return null;
  }
};

// 성공 효과음
const playDing = () => {
  if (typeof window === "undefined") return;

  const audioCtx = new AudioContext();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(880, audioCtx.currentTime); // 높은 음

  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.8);
};

const playErrorDing = () => {
  if (typeof window === "undefined") return;

  const ctx = new AudioContext();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle"; // 부드러운데 약간의 경고감
  osc.frequency.setValueAtTime(520, ctx.currentTime); // 시작은 밝게
  osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.3); // 살짝 내려감

  gain.gain.setValueAtTime(0.16, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.5);
};

/**
 * 음성 알림 함수
 */
const speak = (text: string) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  // 기존 음성이 있으면 취소
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "ko-KR";
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  window.speechSynthesis.speak(utterance);
};

/**
 * 토스트 메시지 표시 및 음성 알림
 */
const showToast = (message: string, type: "success" | "error" = "success") => {
  // 간단한 토스트 메시지 (나중에 토스트 라이브러리로 교체 가능)
  const toast = document.createElement("div");

  toast.className = cx("toast", type);
  toast.textContent = message;
  document.body.appendChild(toast);

  // 3초 후 제거
  setTimeout(() => {
    toast.classList.add(cx("toast_hide"));
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 2000);

  if (type === "success") {
    playDing();
  } else {
    // 실패 케이스에는 음성 알림
    playErrorDing();
    speak(message);
  }
};

export const TicketAuthorizationClient = () => {
  const qc = useQueryClient();
  const [scannedTicketCode, setScannedTicketCode] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const qrCodeRef = useRef<any>(null);
  const scanningRef = useRef(false);

  // html5-qrcode 스타일 주입
  useEffect(() => {
    const styleId = "qr-reader-styles";

    // 이미 스타일이 있으면 추가하지 않음
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement("style");

    style.id = styleId;
    style.textContent = `
      #qr-reader {
        width: 100% !important;
      }
      #qr-reader video {
        width: 100% !important;
        height: auto !important;
        transform: scaleX(-1);
      }
      #qr-reader__dashboard {
        display: none !important;
      }
      #qr-reader__camera_selection {
        display: none !important;
      }
      #qr-reader #qr-shaded-region{
        border-width: 12px !important
      }
      #qr-reader #qr-shaded-region__border-top-left,
      #qr-reader #qr-shaded-region__border-top-right,
      #qr-reader #qr-shaded-region__border-bottom-left,
      #qr-reader #qr-shaded-region__border-bottom-right {
        border-color: #00ff00 !important;
        border-width: 12px !important;
      }
    `;

    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);

      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  // html5-qrcode 라이브러리 사용을 위한 초기화
  useEffect(() => {
    let isMounted = true;

    const initQRScanner = async () => {
      try {
        // html5-qrcode 동적 import
        const { Html5Qrcode } = await import("html5-qrcode");
        const html5QrCode = new Html5Qrcode("qr-reader");

        qrCodeRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: "user" }, // 전면 카메라
          {
            fps: 10, // 초당 프레임
            qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
              const minEdgePercentage = 0.9;
              const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
              const qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);

              return {
                width: qrboxSize,
                height: qrboxSize,
              };
            },
            aspectRatio: 1.0, // 화면 비율
          },
          (decodedText: string) => {
            // 중복 스캔 방지
            if (lastScannedCode === decodedText || scanningRef.current || !isMounted) {
              return;
            }

            setLastScannedCode(decodedText);
            scanningRef.current = true;

            const extracted = extractTicketCode(decodedText);

            if (!extracted) {
              showToast("올바른 QR 코드가 아닙니다.", "error");
              setTimeout(() => {
                scanningRef.current = false;
              }, 2000);

              return;
            }

            setScannedTicketCode(extracted.ticketCode);
            setIsGuest(extracted.isGuest);
          },
          (_errorMessage: string) => {
            // 에러는 무시 (스캔 중 계속 발생하는 정상적인 에러)
          },
        );
      } catch (error) {
        console.error("QR 코드 스캔 초기화 실패:", error);
        showToast("카메라 접근 권한이 필요합니다.", "error");
      }
    };

    initQRScanner();

    return () => {
      isMounted = false;

      // 컴포넌트 언마운트 시 스캐너 정리
      if (qrCodeRef.current) {
        qrCodeRef.current
          .stop()
          .then(() => {
            qrCodeRef.current.clear();
            qrCodeRef.current = null;
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .catch((err: any) => {
            console.error("QR 스캐너 정리 실패:", err);
          });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 검증 결과 처리
  useEffect(() => {
    console.log(scannedTicketCode, scanningRef.current);

    if (!scannedTicketCode || !scanningRef.current) {
      return;
    }

    // staff 권한으로 ticketCode 에 대해서 입장 가능하다는 API 를 쏘면 해당 티켓 체크

    // if (error) {
    //   if (isAxiosErrorResponse(error)) {
    //     let message = "티켓 검증에 실패했습니다.";

    //     if (error.code === NO_ENTRY_TIME) {
    //       message = "해당 티켓의 유효 시간이 아닙니다.";
    //     } else if (error.code === ALREADY_USED_TICKET) {
    //       message = "이미 사용한 티켓입니다.";
    //     } else if (error.code === CANCELED_TICKET) {
    //       message = "취소된 티켓입니다.";
    //     } else if (error.message) {
    //       message = error.message;
    //     }

    //     showToast(message, "error");
    //   } else {
    //     showToast("티켓 검증에 실패했습니다.", "error");
    //   }

    // 검증 실패 후 스캔 재개
    setTimeout(() => {
      scanningRef.current = false;
      setScannedTicketCode(null);
    }, 2000);

    showToast(`확인되었습니다.`, "success");

    // 검증 성공 후 스캔 재개
    setTimeout(() => {
      scanningRef.current = false;
      setScannedTicketCode(null);
      setLastScannedCode(null);
    }, 2000);
  }, [scannedTicketCode, isGuest]);

  return (
    <div className={cx("container")}>
      <Flex className={cx("header")} direction="column" align="center" gap={16}>
        <Typography type="title18" weight="bold" color="white">
          QR 코드를 스캔해주세요
        </Typography>
      </Flex>

      <div className={cx("camera_container")}>
        <div id="qr-reader" className={cx("qr_reader")} />
      </div>
    </div>
  );
};
