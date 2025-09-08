"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import { Flex } from "../Flex";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type BaseSelectProps = {
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
  value?: string;
};

type DefaultSelectProps = BaseSelectProps & {
  type?: "default";
  options: SelectOption[];
  onClick?: () => void;
};

type CalendarSelectProps = BaseSelectProps & {
  type: "calendar";
  options?: never;
  onClick?: () => void;
};

type SelectProps = DefaultSelectProps | CalendarSelectProps;

export const Select = ({
  type = "default",
  placeholder = "선택해주세요",
  disabled = false,
  error,
  onChange,
  value = "",
  options,
  onClick,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      onClick?.();
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    onChange(`${year}-${month}-${day}`);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (type === "calendar") {
      return selectedDate ? selectedDate.toLocaleDateString("ko-KR") : placeholder;
    }

    if (value && options) {
      const selectedOption = options.find((option) => option.value === value);

      return selectedOption ? selectedOption.label : placeholder;
    }

    return placeholder;
  };

  const hasValue = () => {
    if (type === "calendar") {
      return !!selectedDate;
    }

    return !!value;
  };

  return (
    <div className={cx("container")} ref={containerRef}>
      <div
        className={cx("trigger", {
          open: isOpen,
          disabled,
          error: !!error,
        })}
        onClick={handleToggle}
      >
        <Typography
          type="body14"
          weight="regular"
          color={hasValue() ? "white" : "gray400"}
          className={cx("value")}
        >
          {getDisplayValue()}
        </Typography>
        {type === "calendar" ? (
          <Icon.Calendar size={16} fill="gray400" />
        ) : (
          <Icon.Down size={20} fill="gray800" className={cx("icon", { rotated: isOpen })} />
        )}
      </div>

      {error && (
        <Typography type="body12" weight="regular" className={cx("error_text")}>
          {error}
        </Typography>
      )}

      {isOpen && (
        <div className={cx("dropdown")}>
          {type === "default" && options && (
            <div className={cx("options_list")}>
              {options.map((option) => (
                <div
                  key={option.value}
                  className={cx("option", {
                    selected: value === option.value,
                    disabled: option.disabled,
                  })}
                  onClick={() => {
                    if (option.disabled) return;

                    handleOptionSelect(option.value);
                  }}
                >
                  <Typography type="body14" weight="regular">
                    {option.label}
                  </Typography>
                </div>
              ))}
            </div>
          )}

          {type === "calendar" && (
            <Calendar
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
              hasSelectedValue={!!value}
            />
          )}
        </div>
      )}
    </div>
  );
};

// Calendar 컴포넌트
type CalendarProps = {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
  hasSelectedValue: boolean;
};

const Calendar = ({ onDateSelect, selectedDate, hasSelectedValue }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // 이전 달의 빈 칸들
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();

    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(currentDate);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // 0부터 시작하므로 +1

  const monthYear = `${year}.${month}`;

  return (
    <div className={cx("calendar")}>
      <Flex justify="space-between" align="center" className={cx("calendar_header")}>
        <button className={cx("nav_button")} onClick={goToPreviousMonth}>
          <Icon.Up size={16} fill="gray800" className={cx("rotate_left")} />
        </button>
        <Typography type="body14" weight="bold">
          {monthYear}
        </Typography>
        <button className={cx("nav_button")} onClick={goToNextMonth}>
          <Icon.Down size={16} fill="gray800" className={cx("rotate_right")} />
        </button>
      </Flex>

      <div className={cx("weekdays")}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className={cx("weekday")}>
            <Typography type="body12" weight="regular">
              {day}
            </Typography>
          </div>
        ))}
      </div>

      <div className={cx("days_grid")}>
        {days.map((date, index) => (
          <div
            key={index}
            className={cx("day_cell", {
              empty: !date,
              today: date && isToday(date) && !hasSelectedValue,
              selected: date && isSelected(date),
            })}
            onClick={date ? () => onDateSelect(date) : undefined}
          >
            {date && (
              <Typography type="body14" weight="regular">
                {date.getDate()}
              </Typography>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
