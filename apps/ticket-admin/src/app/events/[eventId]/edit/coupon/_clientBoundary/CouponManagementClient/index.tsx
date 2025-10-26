"use client";

import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const CouponManagementClient = () => {
  return (
    <div className={cx("container")}>
      <Typography type="title24">Add Coupon</Typography>
    </div>
  );
};
