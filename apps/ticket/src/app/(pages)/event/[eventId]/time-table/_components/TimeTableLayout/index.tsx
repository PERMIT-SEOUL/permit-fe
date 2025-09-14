import { useEffect } from "react";
import classNames from "classnames/bind";

import { Area, Block, TimeSlot } from "../../_clientBoundary/TimeTableClient";
import AreaHeaders from "../AreaHeaders";
import GridArea from "../GridArea";
import TimeColumn from "../TimeColumn";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type TimeTableLayoutProps = {
  timeSlots: TimeSlot[];
  areas: Area[];
  blocks: Array<Block & { style: React.CSSProperties }>;
  columnWidth: number;
  hourHeight: number;
  currentTimePosition: number | null;
  timeColumnRef: React.RefObject<HTMLDivElement>;
  rightScrollAreaRef: React.RefObject<HTMLDivElement>;
  onBlockClick?: (block: Block) => void;
};

export const TimeTableLayout = ({
  timeSlots,
  areas,
  blocks,
  columnWidth,
  hourHeight,
  currentTimePosition,
  timeColumnRef,
  rightScrollAreaRef,
  onBlockClick,
}: TimeTableLayoutProps) => {
  // iOS Safari 스크롤 버그 해결을 위한 추가 처리
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS && rightScrollAreaRef.current) {
      const scrollArea = rightScrollAreaRef.current;

      // iOS에서 스크롤 끊김 방지를 위한 강제 리렌더링
      const handleTouchStart = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (scrollArea.style as any).webkitOverflowScrolling = "auto";
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (scrollArea.style as any).webkitOverflowScrolling = "touch";
        }, 1);
      };

      // 스크롤 모멘텀 유지를 위한 처리
      const handleScroll = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (scrollArea.style as any).webkitTransform = "translate3d(0,0,0)";
      };

      scrollArea.addEventListener("touchstart", handleTouchStart, { passive: true });
      scrollArea.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        scrollArea.removeEventListener("touchstart", handleTouchStart);
        scrollArea.removeEventListener("scroll", handleScroll);
      };
    }
  }, [rightScrollAreaRef]);

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
          onBlockClick={onBlockClick}
        />
      </div>
    </div>
  );
};
