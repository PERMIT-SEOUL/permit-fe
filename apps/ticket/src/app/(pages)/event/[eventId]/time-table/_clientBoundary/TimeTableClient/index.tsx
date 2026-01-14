"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button, Flex, Typography } from "@permit/design-system";
import { useIsMobile } from "@permit/design-system/hooks";
import { useTimetablesSuspenseQuery } from "@/data/events/getTimetables/queries";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

import { Block, Stages } from "@/data/events/getTimetables/types";

import { TimeTableDetailModal } from "../../_components/TimeTableDetailModal";
import { TimeTableLayout } from "../../_components/TimeTableLayout";

type Props = {
  eventId: string;
};

export const TimeTableClient = ({ eventId }: Props) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();
  // NOTE: 모바일뷰 여부를 SSR 시점에 알 수 없어 기본값(110px)을 사용하고, 클라이언트에서 마운트된 후에만 실제 값 적용
  // TODO: 모바일여부 확인 가능한지 알아보기
  const columnWidth = isMounted ? (isMobile ? 110 : 160) : 110;

  const { data: timetablesData } = useTimetablesSuspenseQuery({
    eventId,
    options: {
      refetchOnWindowFocus: true,
    },
  });

  const [timetables, setTimetables] = useState(timetablesData);

  const timeSlots = useMemo(
    () => generateTimeSlots(timetables.startDate, timetables.endDate),
    [timetables.startDate, timetables.endDate],
  );

  const stages = useMemo(
    () => timetables.stages.sort((a, b) => a.sequence - b.sequence),
    [timetables.stages],
  );

  const [currentTimePosition, setCurrentTimePosition] = useState<number | null>(null);

  // 모달 상태 관리
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const timeColumnRef = useRef<HTMLDivElement>(null);
  const rightScrollAreaRef = useRef<HTMLDivElement>(null);

  // 블록 클릭 핸들러
  const handleBlockClick = (block: Block) => {
    setSelectedBlock(block);
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBlock(null);
  };

  // 클라이언트 마운트 감지
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 현재 시간 위치 업데이트
  useEffect(() => {
    const updateCurrentTime = () => {
      const position = calcCurrentTimeLine(timeSlots);

      setCurrentTimePosition(position);
    };

    // 초기 설정
    updateCurrentTime();

    // 1분마다 업데이트
    const interval = setInterval(updateCurrentTime, 60000);

    return () => clearInterval(interval);
  }, [timeSlots]);

  // 세로 스크롤 동기화
  useEffect(() => {
    const timeColumn = timeColumnRef.current;
    const rightScrollArea = rightScrollAreaRef.current;

    if (!timeColumn || !rightScrollArea) return;

    const syncScrollFromTimeColumn = () => {
      rightScrollArea.scrollTop = timeColumn.scrollTop;
    };

    const syncScrollFromRightArea = () => {
      timeColumn.scrollTop = rightScrollArea.scrollTop;
    };

    timeColumn.addEventListener("scroll", syncScrollFromTimeColumn);
    rightScrollArea.addEventListener("scroll", syncScrollFromRightArea);

    return () => {
      timeColumn.removeEventListener("scroll", syncScrollFromTimeColumn);
      rightScrollArea.removeEventListener("scroll", syncScrollFromRightArea);
    };
  }, []);

  // 블록 위치 계산된 데이터 준비
  const blocksWithPosition = timetables.blocks.map((block) => {
    const { top, height, left } = calcBlockPosition(block, timeSlots, stages, columnWidth);
    const blockWidth = columnWidth - 20; // 좌우 마진 10px씩 제외

    return {
      ...block,
      style: {
        top,
        height,
        left,
        width: blockWidth,
        backgroundColor: block.blockBackgroundColor,
        color: block.blockLineColor,
        borderColor: block.blockLineColor,
      },
    };
  });

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = async () => {
    if (isFavorite) {
      setIsFavorite(false);
      setTimetables(timetablesData);
    } else {
      setIsFavorite(true);
      setTimetables({
        ...timetablesData,
        blocks: timetablesData.blocks.filter((block) => block.isUserLiked),
      });
    }
  };

  const handleBackButtonClick = () => {
    // 히스토리가 있는지 확인
    if (window.history.length > 1 && document.referrer) {
      // 이전 페이지가 같은 도메인이고, 이벤트 디테일 페이지인지 확인
      const referrerUrl = new URL(document.referrer);
      const currentUrl = new URL(window.location.href);

      if (referrerUrl.origin === currentUrl.origin) {
        // 같은 도메인에서 온 경우 뒤로가기
        router.back();

        return;
      }
    }

    // 직접 접근이거나 외부에서 온 경우 이벤트 디테일 페이지로 이동
    router.push(`/event/${eventId}`);
  };

  return (
    <>
      <header className={cx("header")}>
        <Flex gap={8} justify="space-between">
          <Flex direction="column" gap={16}>
            <Typography type="title20">{timetables.eventName}</Typography>

            <Button
              className={cx("back_button")}
              variant="secondary"
              onClick={handleBackButtonClick}
            >
              {"< back"}
            </Button>

            <Flex gap={8}>
              <Button
                variant="secondary"
                onClick={() => router.push(`/event/${eventId}/time-table`)}
              >
                {"Timetable"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push(`/event/${eventId}/time-table/site-map`)}
              >
                {"Sitemap"}
              </Button>
            </Flex>
          </Flex>
          <>
            {/* 즐겨찾기 버튼 영역 (media query 로 분기) */}
            <button
              className={cx("star_button", { liked: isFavorite })}
              aria-label="즐겨찾기"
              onClick={handleFavoriteClick}
            >
              <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
                <path
                  d="M12.1191 6.92285L12.2959 7.33887L12.7471 7.37695L18.165 7.83691L14.0488 11.4033L13.707 11.6992L13.8096 12.1406L15.0449 17.4385L10.3877 14.6279L10 14.3936L9.6123 14.6279L4.9541 17.4385L6.19043 12.1406L6.29297 11.6992L5.95117 11.4033L1.83398 7.83691L7.25293 7.37695L7.7041 7.33887L7.88086 6.92285L10 1.92188L12.1191 6.92285Z"
                  fill={isFavorite ? "currentColor" : "transparent"}
                  fillOpacity={isFavorite ? "1" : "0.1"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <Button
              className={cx("favorite_button")}
              variant={isFavorite ? "cta" : "primary"}
              onClick={handleFavoriteClick}
            >
              favorite
            </Button>
          </>
        </Flex>
      </header>
      <TimeTableLayout
        timeSlots={timeSlots}
        stages={stages}
        blocks={blocksWithPosition}
        columnWidth={columnWidth}
        hourHeight={hourHeight}
        currentTimePosition={currentTimePosition}
        timeColumnRef={timeColumnRef as React.RefObject<HTMLDivElement>}
        rightScrollAreaRef={rightScrollAreaRef as React.RefObject<HTMLDivElement>}
        onBlockClick={handleBlockClick}
      />

      {isModalOpen && (
        <TimeTableDetailModal
          block={selectedBlock}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

const hourHeight = 60; // px per hour

// 날짜 문자열을 Date 객체로 변환하는 함수
function parseCustomDate(dateStr: string): Date {
  // "2025.08.24 14:00" 형식을 파싱
  const [datePart, timePart] = dateStr.split(" ");
  const [year, month, day] = datePart.split(".").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  return new Date(year, month - 1, day, hour, minute);
}

// 시간 슬롯 생성 함수
function generateTimeSlots(startDateStr: string, endDateStr: string) {
  const start = parseCustomDate(startDateStr);
  const end = parseCustomDate(endDateStr);
  const timeSlots = [];
  const current = new Date(start);

  // 요일 배열 (일요일부터 시작)
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  while (current.getTime() <= end.getTime()) {
    for (let h = 0; h < 24; h++) {
      const slot = new Date(current);

      slot.setHours(h, 0, 0, 0);

      // 범위 내의 시간만 추가
      if (slot >= start && slot <= end) {
        const dayOfWeek = dayNames[slot.getDay()];

        timeSlots.push({
          datetime: new Date(slot),
          label: `${slot.getMonth() + 1}/${slot.getDate()} ${h.toString().padStart(2, "0")}:00 (${dayOfWeek})`,
        });
      }
    }

    current.setDate(current.getDate() + 1);
  }

  return timeSlots;
}

// 타입 정의
export interface TimeSlot {
  datetime: Date;
  label: string;
}

// 블록 위치 계산 함수
function calcBlockPosition(
  block: Block,
  timeSlots: TimeSlot[],
  stages: Stages[],
  columnWidth: number,
) {
  const start = parseCustomDate(block.blockStartDate);
  const end = parseCustomDate(block.blockEndDate);

  const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

  // 타임테이블 시작 시간을 기준으로 계산
  if (timeSlots.length === 0) {
    const DISABLE_DISPLAY_HEIGHT = -200;

    return { top: DISABLE_DISPLAY_HEIGHT, height: durationInHours * hourHeight, left: 0 };
  }

  const tableStartTime = timeSlots[0].datetime.getTime();
  const tableEndTime = timeSlots[timeSlots.length - 1].datetime.getTime();
  const blockStartTime = start.getTime();

  // 블록이 타임테이블 범위 내에 있는지 확인
  if (blockStartTime < tableStartTime) {
    const DISABLE_DISPLAY_HEIGHT = 0;
    const stage = stages.find((a) => a.stageNotionId === block.blockStageNotionId);
    const stageSequence = stage ? stage.sequence : 0;

    return {
      top: DISABLE_DISPLAY_HEIGHT,
      height: durationInHours * hourHeight,
      left: stageSequence * columnWidth,
    };
  }

  if (tableEndTime < blockStartTime) {
    return {
      top: -200,
      height: 0,
      left: 0,
    };
  }

  // 타임테이블 시작 시간부터 블록 시작/종료 시간까지의 차이를 시간 단위로 계산
  const blockEndTime = end.getTime();

  const timeDiffStartMs = blockStartTime - tableStartTime;
  const timeDiffEndMs = blockEndTime - tableStartTime;
  const timeDiffStartInHours = timeDiffStartMs / (1000 * 60 * 60);
  const timeDiffEndInHours = timeDiffEndMs / (1000 * 60 * 60);
  const startMinutes = start.getMinutes();
  const endMinutes = end.getMinutes();

  // 해당 stage의 sequence 찾기
  const stage = stages.find((a) => a.stageNotionId === block.blockStageNotionId);
  const stageSequence = stage ? stage.sequence : 0;

  // top 위치 = 시작 시간 차이(시간) * hourHeight + 시작 분 오프셋
  const top = timeDiffStartInHours * hourHeight + (startMinutes / 60) * hourHeight;
  // height = 종료 시간 위치 - 시작 시간 위치
  const endTop = timeDiffEndInHours * hourHeight + (endMinutes / 60) * hourHeight;
  const height = endTop - top;
  const left = stageSequence * columnWidth;

  return { top, height, left };
}

// 현재 시간 라인 위치 계산 함수
function calcCurrentTimeLine(timeSlots: TimeSlot[]): number | null {
  const now = new Date();

  // 현재 시간이 timeSlots 범위 내에 있는지 확인
  if (timeSlots.length === 0) return null;

  const firstSlot = timeSlots[0].datetime;
  const lastSlot = timeSlots[timeSlots.length - 1].datetime;

  if (now < firstSlot || now > lastSlot) return null;

  // 현재 시간에 해당하는 시간대 찾기
  for (let i = 0; i < timeSlots.length; i++) {
    const slot = timeSlots[i];
    const nextSlot = timeSlots[i + 1];

    if (nextSlot && now >= slot.datetime && now < nextSlot.datetime) {
      // 두 시간 슬롯 사이의 정확한 위치 계산
      const totalMinutes = (nextSlot.datetime.getTime() - slot.datetime.getTime()) / (1000 * 60);
      const passedMinutes = (now.getTime() - slot.datetime.getTime()) / (1000 * 60);
      const progress = passedMinutes / totalMinutes;

      return (i + progress) * hourHeight;
    }
  }

  return null;
}
