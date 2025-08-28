// FIXME: 테스트용 타임 테이블 페이지
"use client";

import React from "react";
import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const data = {
  startDate: "2025-08-11",
  endDate: "2025-08-13",
  areas: [
    { areaId: 1, areaName: "장소1", sequence: 0 },
    { areaId: 2, areaName: "장소2", sequence: 1 },
    { areaId: 3, areaName: "장소3", sequence: 2 },
    { areaId: 4, areaName: "장소4", sequence: 3 },
    { areaId: 5, areaName: "장소5", sequence: 4 },
  ],
  blocks: [
    {
      blockId: "block-1",
      blockAreaId: 1,
      blockName: "도영",
      blockColor: "#3498db",
      blockStartDate: "2025-08-11T01:00:00",
      blockEndDate: "2025-08-11T03:00:00",
      areaSequence: 0,
    },
    {
      blockId: "block-5",
      blockAreaId: 2,
      blockName: "민석",
      blockColor: "#b5bcfd",
      blockStartDate: "2025-08-11T02:00:00",
      blockEndDate: "2025-08-11T04:00:00",
      areaSequence: 0,
    },
    {
      blockId: "block-2",
      blockAreaId: 3,
      blockName: "지원",
      blockColor: "#e67e22",
      blockStartDate: "2025-08-11T04:00:00",
      blockEndDate: "2025-08-11T05:30:00",
      areaSequence: 1,
    },
    {
      blockId: "block-3",
      blockAreaId: 4,
      blockName: "하민",
      blockColor: "#2ecc71",
      blockStartDate: "2025-08-12T11:00:00",
      blockEndDate: "2025-08-12T13:00:00",
      areaSequence: 2,
    },
    {
      blockId: "block-4",
      blockAreaId: 5,
      blockName: "도윤",
      blockColor: "#9b59b6",
      blockStartDate: "2025-08-13T14:00:00",
      blockEndDate: "2025-08-13T16:00:00",
      areaSequence: 0,
    },
  ],
};

const hourHeight = 50; // px per hour
const columnWidth = 160; // px per area column

function generateTimeSlots(startDateStr: string, endDateStr: string) {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const timeSlots = [];
  const current = new Date(start);

  while (current <= end) {
    for (let h = 0; h < 24; h++) {
      const slot = new Date(current);

      slot.setHours(h, 0, 0, 0);
      timeSlots.push({
        datetime: new Date(slot),
        label: `${slot.getMonth() + 1}.${slot.getDate()} ${h.toString().padStart(2, "0")}:00`,
      });
    }

    current.setDate(current.getDate() + 1);
  }

  return timeSlots;
}

function calcBlockPosition(block, timeSlots) {
  const start = new Date(block.blockStartDate);
  const end = new Date(block.blockEndDate);
  const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

  const slotIndex = timeSlots.findIndex(
    (ts) =>
      ts.datetime.getFullYear() === start.getFullYear() &&
      ts.datetime.getMonth() === start.getMonth() &&
      ts.datetime.getDate() === start.getDate() &&
      ts.datetime.getHours() === start.getHours(),
  );

  const top = slotIndex * hourHeight;
  const height = durationInHours * hourHeight;
  const left = (block.areaSequence ?? 0) * columnWidth;

  return { top, height, left };
}

export default function TimeTable() {
  const timeSlots = generateTimeSlots(data.startDate, data.endDate);
  const areas = data.areas.sort((a, b) => a.sequence - b.sequence);

  return (
    <div className={cx("timetableWrapper")}>
      <div className={cx("timeColumn")}>
        {timeSlots.map((slot, i) => (
          <div key={i} className={cx("timeSlot")}>
            {slot.label}
          </div>
        ))}
      </div>

      <div className={cx("gridArea")} style={{ width: `${areas.length * columnWidth}px` }}>
        {data.blocks.map((block, idx) => {
          const { top, height, left } = calcBlockPosition(block, timeSlots);

          return (
            <div
              key={idx}
              className={cx("block")}
              style={{ top, height, left, backgroundColor: block.blockColor }}
            >
              {block.blockName}
            </div>
          );
        })}
      </div>
    </div>
  );
}
