"use client";

import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Step = "basic" | "ticket" | "guest" | "coupon" | "timeTable";

type Props = {
  currentStep: Step;
  onStepChange: (step: Step) => void;
};

export function EditSidebar({ currentStep, onStepChange }: Props) {
  return (
    <div className={cx("sidebar")}>
      <button className={cx("sidebar_item")} onClick={() => onStepChange("basic")}>
        <div className={cx("sidebar_indicator", currentStep === "basic" && "active")} />
        <span className={cx("sidebar_text", currentStep === "basic" && "active")}>Basic</span>
      </button>
      <button className={cx("sidebar_item")} onClick={() => onStepChange("ticket")}>
        <div className={cx("sidebar_indicator", currentStep === "ticket" && "active")} />
        <span className={cx("sidebar_text", currentStep === "ticket" && "active")}>Ticket</span>
      </button>
      <button className={cx("sidebar_item")} onClick={() => onStepChange("guest")}>
        <div className={cx("sidebar_indicator", currentStep === "guest" && "active")} />
        <span className={cx("sidebar_text", currentStep === "guest" && "active")}>Guest</span>
      </button>
      <button className={cx("sidebar_item")} onClick={() => onStepChange("coupon")}>
        <div className={cx("sidebar_indicator", currentStep === "coupon" && "active")} />
        <span className={cx("sidebar_text", currentStep === "coupon" && "active")}>Coupon</span>
      </button>
      <button className={cx("sidebar_item")} onClick={() => onStepChange("timeTable")}>
        <div className={cx("sidebar_indicator", currentStep === "timeTable" && "active")} />
        <span className={cx("sidebar_text", currentStep === "timeTable" && "active")}>
          Time Table
        </span>
      </button>
    </div>
  );
}
