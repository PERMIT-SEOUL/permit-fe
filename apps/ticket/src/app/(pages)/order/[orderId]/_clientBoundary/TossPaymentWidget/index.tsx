"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";
import { useReservationReadyQuery } from "@/data/reservations/getReservationReady/queries";
import { LoadingIndicator } from "@/shared/components/LoadingIndicator";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  orderId: string;
};

export const TossPaymentWidget = ({ orderId }: Props) => {
  const { data: reservationReady } = useReservationReadyQuery({});

  const [isSDKLoaded, setSDKLoaded] = useState(false);
  const [isWidgetRendered, setIsWidgetRendered] = useState(false);

  const paymentRef = useRef<HTMLDivElement>(null);
  const agreementRef = useRef<HTMLDivElement>(null);

  const initTossPayment = useCallback(async () => {
    if (!window.TossPayments || !paymentRef.current || !agreementRef.current) {
      console.warn("SDK 또는 DOM 요소가 준비되지 않았습니다.");

      return;
    }

    if (!reservationReady) {
      return;
    }

    const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY;
    const customerKey = reservationReady.customerKey;
    const tossPayments = window.TossPayments(clientKey);
    const widgets = tossPayments.widgets({ customerKey });

    /**
     * 토스 결제 위젯 초기화
     */
    try {
      await widgets.setAmount({
        currency: "KRW",
        value: reservationReady.totalAmount,
      });

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setIsWidgetRendered(true);

      const button = document.getElementById("payment-button");

      button?.addEventListener("click", async () => {
        /**
         * 결제 요청
         * @docs https://docs.tosspayments.com/sdk/widget-js#requestpayment%EA%B2%B0%EC%A0%9C-%EC%A0%95%EB%B3%B4
         */
        await widgets.requestPayment({
          orderId,
          orderName: reservationReady.orderName,
          customerName: reservationReady.userName,
          customerEmail: reservationReady.userEmail,
          successUrl: `${window.location.origin}/order/${orderId}/process`,
          failUrl: `${window.location.origin}/order/${orderId}/fail`,
        });
      });
    } catch (error) {
      console.error("결제 요청 실패:", error);
    }
  }, [orderId, reservationReady]);

  useEffect(() => {
    initTossPayment();
  }, [initTossPayment]);

  return (
    <>
      <Script
        src="https://js.tosspayments.com/v2/standard"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ TossPayments SDK loaded");
          setSDKLoaded(true);
        }}
        onError={(e) => {
          console.error("❌ SDK load failed:", e);
        }}
      />

      {!isSDKLoaded && <LoadingIndicator className={cx("loading_wrap")} size="large" />}

      {/* TODO: 따로 컴포넌트 분리 */}
      <div className={cx("payment_wrap")}>
        <div id="payment-method" ref={paymentRef} />
        <div id="agreement" ref={agreementRef} style={{ display: "none" }} />
        <button id="payment-button" className={cx("payment_button", { hidden: !isWidgetRendered })}>
          결제하기
        </button>
        <br />
        <br />
        <Typography type="body14" color="gray300">
          * 환불 정책은 페이지 하단을 참고해주세요.
        </Typography>
        <Typography type="body14" color="gray300">
          * 결제창이 계속해서 보이지 않는다면 새로고침 해주세요.
        </Typography>
      </div>
    </>
  );
};
