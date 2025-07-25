"use client";

import classNames from "classnames/bind";

import { BookingHistoryClient } from "../BookingHistoryClient";
import { UserProfileClient } from "../UserProfileClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const MyPageClient = () => {
  return (
    <div className={cx("container")}>
      {/* 사용자 프로필 섹션 */}
      <UserProfileClient />

      {/* 예약 히스토리 섹션 */}
      <BookingHistoryClient />
    </div>
  );
};
