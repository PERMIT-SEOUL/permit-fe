import React from "react";
import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";

import { TimeSlot } from "../../_clientBoundary/TimeTableClient";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface TimeColumnProps {
  timeSlots: TimeSlot[];
  currentTimePosition: number | null;
}

const TimeColumn = React.forwardRef<HTMLDivElement, TimeColumnProps>(
  ({ timeSlots, currentTimePosition }, ref) => {
    return (
      <div ref={ref} className={cx("time_column")}>
        {timeSlots.map((slot, i) => (
          <Typography key={i} className={cx("time_slot")} type="body14">
            {slot.label}
          </Typography>
        ))}

        {/* 시간 컬럼의 현재 시간 라인 */}
        {currentTimePosition !== null && (
          <div
            className={cx("current_time_line_left")}
            style={{
              top: currentTimePosition,
            }}
          />
        )}
      </div>
    );
  },
);

TimeColumn.displayName = "TimeColumn";

export default TimeColumn;
