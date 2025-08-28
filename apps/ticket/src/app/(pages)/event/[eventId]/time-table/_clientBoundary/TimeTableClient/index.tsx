"use client";

import React, { useEffect, useRef, useState } from "react";

import { useIsMobile } from "@permit/design-system/hooks";

import TimeTableLayout from "../../_components/TimeTableLayout";

// 실제 응답 예시 데이터
const mockData = {
  startDate: "2025.08.26 00:00",
  endDate: "2025.08.27 18:00",
  areas: [
    {
      areaId: 1,
      areaName: "장소1",
      sequence: 0,
    },
    {
      areaId: 2,
      areaName: "장소2",
      sequence: 1,
    },
    {
      areaId: 3,
      areaName: "장소3",
      sequence: 2,
    },
    {
      areaId: 4,
      areaName: "장소4",
      sequence: 3,
    },
    {
      areaId: 5,
      areaName: "장소5",
      sequence: 4,
    },
    {
      areaId: 6,
      areaName: "장소6",
      sequence: 5,
    },
    {
      areaId: 7,
      areaName: "장소7",
      sequence: 6,
    },
  ],
  blocks: [
    {
      blockId: "O0KWMgAk",
      blockName: "아티스트1",
      blockColor: "#600123",
      blockStartDate: "2025.08.26 15:00",
      blockEndDate: "2025.08.26 16:00",
      blockAreaId: 1,
      isUserLiked: true,
    },
    {
      blockId: "z3g3PbR0",
      blockName: "아티스트3",
      blockColor: "#123123",
      blockStartDate: "2025.08.26 15:00",
      blockEndDate: "2025.08.26 16:30",
      blockAreaId: 3,
      isUserLiked: false,
    },
    {
      blockId: "7zbQ5b80",
      blockName: "아티스트2",
      blockColor: "#600123",
      blockStartDate: "2025.08.26 15:30",
      blockEndDate: "2025.08.26 16:30",
      blockAreaId: 2,
      isUserLiked: false,
    },
    {
      blockId: "n5KdyNza",
      blockName: "아티스트5",
      blockColor: "#111111",
      blockStartDate: "2025.08.26 17:30",
      blockEndDate: "2025.08.26 18:20",
      blockAreaId: 1,
      isUserLiked: false,
    },
    {
      blockId: "7MNP6be8",
      blockName: "요가",
      blockColor: "#123123",
      blockStartDate: "2025.08.26 19:00",
      blockEndDate: "2025.08.26 21:30",
      blockAreaId: 3,
      isUserLiked: false,
    },
  ],
};

const hourHeight = 50; // px per hour

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

  while (current <= end) {
    for (let h = 0; h < 24; h++) {
      const slot = new Date(current);

      slot.setHours(h, 0, 0, 0);

      // 범위 내의 시간만 추가
      if (slot >= start && slot <= end) {
        timeSlots.push({
          datetime: new Date(slot),
          label: `${slot.getMonth() + 1}.${slot.getDate()} ${h.toString().padStart(2, "0")}:00`,
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

export interface Area {
  areaId: number;
  areaName: string;
  sequence: number;
}

export interface Block {
  blockId: string;
  blockName: string;
  blockColor: string;
  blockStartDate: string;
  blockEndDate: string;
  blockAreaId: number;
  isUserLiked: boolean;
}

// 블록 위치 계산 함수
function calcBlockPosition(
  block: Block,
  timeSlots: TimeSlot[],
  areas: Area[],
  columnWidth: number,
) {
  const start = parseCustomDate(block.blockStartDate);
  const end = parseCustomDate(block.blockEndDate);
  const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

  // 해당 시간 슬롯의 인덱스 찾기
  const slotIndex = timeSlots.findIndex(
    (ts) =>
      ts.datetime.getFullYear() === start.getFullYear() &&
      ts.datetime.getMonth() === start.getMonth() &&
      ts.datetime.getDate() === start.getDate() &&
      ts.datetime.getHours() === start.getHours(),
  );

  // 해당 area의 sequence 찾기
  const area = areas.find((a) => a.areaId === block.blockAreaId);
  const areaSequence = area ? area.sequence : 0;

  const top = slotIndex * hourHeight;
  const height = durationInHours * hourHeight;
  const left = areaSequence * columnWidth;

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

export default function TimeTableClient() {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();
  // SSR 시에는 기본값(85px)을 사용하고, 클라이언트에서 마운트된 후에만 실제 값 적용
  const columnWidth = isMounted ? (isMobile ? 85 : 160) : 85;

  const timeSlots = generateTimeSlots(mockData.startDate, mockData.endDate);
  const areas = mockData.areas.sort((a, b) => a.sequence - b.sequence);

  const [currentTimePosition, setCurrentTimePosition] = useState<number | null>(null);

  const timeColumnRef = useRef<HTMLDivElement>(null);
  const rightScrollAreaRef = useRef<HTMLDivElement>(null);

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
  const blocksWithPosition = mockData.blocks.map((block) => {
    const { top, height, left } = calcBlockPosition(block, timeSlots, areas, columnWidth);
    const blockWidth = columnWidth - 20; // 좌우 마진 10px씩 제외

    return {
      ...block,
      style: {
        top,
        height,
        left,
        width: blockWidth,
        backgroundColor: block.blockColor,
      },
    };
  });

  return (
    <TimeTableLayout
      timeSlots={timeSlots}
      areas={areas}
      blocks={blocksWithPosition}
      columnWidth={columnWidth}
      hourHeight={hourHeight}
      currentTimePosition={currentTimePosition}
      timeColumnRef={timeColumnRef as React.RefObject<HTMLDivElement>}
      rightScrollAreaRef={rightScrollAreaRef as React.RefObject<HTMLDivElement>}
    />
  );
}
