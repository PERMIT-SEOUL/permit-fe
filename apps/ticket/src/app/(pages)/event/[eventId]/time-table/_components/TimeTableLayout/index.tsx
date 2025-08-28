import React from "react";
import classNames from "classnames/bind";

import { Area, Block, TimeSlot } from "../../_clientBoundary/TimeTableClient";
import AreaHeaders from "../AreaHeaders";
import GridArea from "../GridArea";
import TimeColumn from "../TimeColumn";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface TimeTableLayoutProps {
  timeSlots: TimeSlot[];
  areas: Area[];
  blocks: Array<Block & { style: React.CSSProperties }>;
  columnWidth: number;
  hourHeight: number;
  currentTimePosition: number | null;
  timeColumnRef: React.RefObject<HTMLDivElement>;
  rightScrollAreaRef: React.RefObject<HTMLDivElement>;
}

export default function TimeTableLayout({
  timeSlots,
  areas,
  blocks,
  columnWidth,
  hourHeight,
  currentTimePosition,
  timeColumnRef,
  rightScrollAreaRef,
}: TimeTableLayoutProps) {
  return (
    <div className={cx("timetable_wrapper")}>
      {/* 왼쪽 고정 시간 영역 */}
      <div className={cx("left_fixed_area")}>
        {/* 시간 컬럼 헤더 */}
        <div className={cx("time_column_header")}>time / SA</div>

        {/* 시간 컬럼 */}
        <TimeColumn
          ref={timeColumnRef}
          timeSlots={timeSlots}
          currentTimePosition={currentTimePosition}
        />
      </div>

      {/* 오른쪽 스크롤 가능한 영역 */}
      <div ref={rightScrollAreaRef} className={cx("right_scroll_area")}>
        {/* 장소 헤더들 */}
        <AreaHeaders areas={areas} columnWidth={columnWidth} />

        {/* 그리드 영역 */}
        <GridArea
          areas={areas}
          blocks={blocks}
          columnWidth={columnWidth}
          hourHeight={hourHeight}
          timeSlots={timeSlots}
          currentTimePosition={currentTimePosition}
        />
      </div>
    </div>
  );
}
