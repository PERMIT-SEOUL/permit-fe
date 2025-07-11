import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  className?: string;
  width?: string;
  height?: string;
  margin?: string;
  borderRadius?: string;
};

export const Skeleton = ({
  className,
  width = "100%",
  height = "1rem",
  margin = "0",
  borderRadius = "16px",
}: Props) => {
  return (
    <div className={cx("skeleton", className)} style={{ width, height, margin, borderRadius }} />
  );
};
