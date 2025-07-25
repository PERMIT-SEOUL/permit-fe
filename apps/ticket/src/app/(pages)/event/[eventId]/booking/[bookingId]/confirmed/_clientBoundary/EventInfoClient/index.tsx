"use client";

import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

// TODO: params props 추가
export const EventInfoClient = () => {
  // TODO: API call
  const eventName = "Ceiling service vol.2 -Ksawery Komputery [PL]";
  const date = "Sun, 28 Sep 2025";

  return (
    <div className={cx("event_info")}>
      <Typography className={cx("event_text")} type="body14" weight="bold">
        {eventName}
      </Typography>
      <Typography className={cx("event_text", "date")} type="body14">
        {date}
      </Typography>
    </div>
  );
};
