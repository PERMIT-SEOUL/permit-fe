import classNames from "classnames/bind";

import { Block, Stages } from "@/data/events/getTimetables/types";

import { TimeSlot } from "../../_clientBoundary/TimeTableClient";
import AreaHeaders from "../AreaHeaders";
import GridArea from "../GridArea";
import TimeColumn from "../TimeColumn";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type TimeTableLayoutProps = {
  timeSlots: TimeSlot[];
  stages: Stages[];
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
  stages,
  blocks,
  columnWidth,
  hourHeight,
  currentTimePosition,
  timeColumnRef,
  rightScrollAreaRef,
  onBlockClick,
}: TimeTableLayoutProps) => {
  return (
    <div className={cx("timetable_wrapper")}>
      {/* 통합된 타임테이블 컨테이너 */}
      <div className={cx("unified_container")}>
        {/* 고정된 시간 헤더 */}
        <div className={cx("fixed_time_header")}>
          <div className={cx("time_column_header")}>TIME / SA</div>
        </div>

        {/* 스크롤 가능한 메인 영역 */}
        <div ref={rightScrollAreaRef} className={cx("scrollable_area")}>
          {/* 헤더 행 (스크롤과 함께 이동) */}
          <div className={cx("header_row")}>
            <AreaHeaders stages={stages} columnWidth={columnWidth} />
          </div>

          {/* 컨텐츠 행 */}
          <div className={cx("content_row")}>
            {/* 시간 컬럼 */}
            <div className={cx("time_column_wrapper")}>
              <TimeColumn
                ref={timeColumnRef}
                timeSlots={timeSlots}
                currentTimePosition={currentTimePosition}
              />
            </div>

            {/* 그리드 영역 */}
            <div className={cx("grid_wrapper")}>
              <GridArea
                stages={stages}
                blocks={blocks}
                columnWidth={columnWidth}
                hourHeight={hourHeight}
                timeSlots={timeSlots}
                currentTimePosition={currentTimePosition}
                onBlockClick={onBlockClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
