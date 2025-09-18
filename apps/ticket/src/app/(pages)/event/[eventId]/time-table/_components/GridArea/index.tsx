import classNames from "classnames/bind";

import { Area, Block, TimeSlot } from "../../_clientBoundary/TimeTableClient";
import TimeTableBlock from "../TimeTableBlock";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type GridAreaProps = {
  areas: Area[];
  blocks: Array<Block & { style: React.CSSProperties }>;
  columnWidth: number;
  hourHeight: number;
  timeSlots: TimeSlot[];
  currentTimePosition: number | null;
  onBlockClick?: (block: Block) => void;
};

const GridArea = ({
  areas,
  blocks,
  columnWidth,
  hourHeight,
  timeSlots,
  currentTimePosition,
  onBlockClick,
}: GridAreaProps) => {
  const totalWidth = areas.length * columnWidth;

  return (
    <div className={cx("grid_area")} style={{ width: totalWidth }}>
      {/* 그리드 배경 라인들 */}
      {areas.map((area, index) => (
        <div
          key={area.areaId}
          className={cx("grid_column")}
          style={{
            left: index * columnWidth,
            width: columnWidth,
            height: timeSlots.length * hourHeight,
          }}
        />
      ))}

      {/* 블록들 */}
      {blocks.map((block) => (
        <TimeTableBlock key={block.blockId} block={block} onClick={onBlockClick} />
      ))}

      {/* 현재 시간 라인 */}
      {currentTimePosition !== null && (
        <div
          className={cx("current_time_line")}
          style={{
            top: currentTimePosition,
            width: `${areas.length * columnWidth}px`,
          }}
        />
      )}
    </div>
  );
};

export default GridArea;
