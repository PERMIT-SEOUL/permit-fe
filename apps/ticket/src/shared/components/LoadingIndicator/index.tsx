import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface LoadingIndicatorProps {
  className?: string;
  size?: "small" | "medium" | "large";
  color?: "primary" | "white" | "gray";
}

export const LoadingIndicator = ({
  className,
  size = "medium",
  color = "primary",
}: LoadingIndicatorProps) => {
  return (
    <div className={cx("spinner", size, color, className)}>
      <div className={cx("bounce1")}></div>
      <div className={cx("bounce2")}></div>
      <div className={cx("bounce3")}></div>
    </div>
  );
};
