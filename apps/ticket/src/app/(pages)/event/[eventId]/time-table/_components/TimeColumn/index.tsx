import { forwardRef } from "react";
import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";

import { TimeSlot } from "../../_clientBoundary/TimeTableClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type TimeColumnProps = {
  timeSlots: TimeSlot[];
  currentTimePosition: number | null;
};

const TimeColumn = forwardRef<HTMLDivElement, TimeColumnProps>(
  ({ timeSlots, currentTimePosition }, ref) => {
    return (
      <div ref={ref} className={cx("time_column")}>
        {timeSlots.map((slot, i) => {
          const [date, time] = slot.label.split(" ");
          const [prevDate] = i > 0 ? timeSlots[i - 1].label.split(" ") : [null];
          const shouldShowDate = i === 0 || date !== prevDate;

          // 다음 슬롯 정보
          const nextSlot = timeSlots[i + 1];
          const isCurrentSlot = isCurrentTimeSlot(slot.label, nextSlot?.label);

          return (
            <div key={i} className={cx("time_slot", { current_time_slot: isCurrentSlot })}>
              {shouldShowDate && <Typography type="body14">{date}</Typography>}
              <Typography type="body14">{time}</Typography>
            </div>
          );
        })}

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

// 현재 시간이 해당 슬롯 범위에 있는지 확인하는 함수
function isCurrentTimeSlot(slotTime: string, nextSlotTime?: string) {
  const now = new Date();

  // 운영 환경에서만 한국 시간으로 변환 (KST: UTC+9)
  const koreaTime =
    process.env.VERCEL_ENV === "production" || process.env.VERCEL_ENV === "development"
      ? new Date(now.getTime() + 9 * 60 * 60 * 1000) // UTC + 9시간
      : now; // 로컬 환경에서는 시스템 시간 사용

  // MM/DD 형식으로 변환
  const currentDate = `${(koreaTime.getMonth() + 1).toString()}/${koreaTime.getDate().toString()}`;
  const currentTime = `${koreaTime.getHours().toString().padStart(2, "0")}:${koreaTime.getMinutes().toString().padStart(2, "0")}`;

  // 슬롯 시간에서 날짜와 시간 부분 추출 (예: "09/14 08:00" -> ["09/14", "08:00"])
  const [slotDate, slotTimeOnly] = slotTime.split(" ");

  // 날짜가 다르면 false 반환
  if (slotDate !== currentDate) {
    return false;
  }

  // 다음 슬롯이 있으면 그 시간을, 없으면 1시간 후로 설정
  let nextTimeOnly: string;

  if (nextSlotTime) {
    const [nextSlotDate, nextSlotTimeOnly] = nextSlotTime.split(" ");

    // 다음 슬롯이 다른 날짜면 23:59:59까지로 설정
    if (nextSlotDate !== currentDate) {
      nextTimeOnly = "23:59";
    } else {
      nextTimeOnly = nextSlotTimeOnly;
    }
  } else {
    // 마지막 슬롯인 경우 1시간 후로 설정
    const [hours, minutes] = slotTimeOnly.split(":").map(Number);
    const nextHour = (hours + 1) % 24;

    nextTimeOnly = `${nextHour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }

  const isInRange = currentTime >= slotTimeOnly && currentTime < nextTimeOnly;

  return isInRange;
}
