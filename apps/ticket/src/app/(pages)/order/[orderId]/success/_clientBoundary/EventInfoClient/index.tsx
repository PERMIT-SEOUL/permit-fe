"use client";

import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventName: string;
  eventDate: string;
};

export const EventInfoClient = ({ eventName, eventDate }: Props) => {
  return (
    <div className={cx("event_info")}>
      <Typography className={cx("event_text")} type="body14" weight="bold">
        {eventName}
      </Typography>
      <Typography className={cx("event_text", "date")} type="body14">
        {eventDate}
      </Typography>
    </div>
  );
};
