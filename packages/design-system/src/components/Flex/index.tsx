import { HTMLAttributes } from "react";
import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * flex-direction 속성
   * @default 'row'
   */
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  /**
   * justify-content 속성
   * @default 'flex-start'
   */
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  /**
   * align-items 속성
   * @default 'stretch'
   */
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  /**
   * gap 속성 (px 단위)
   * @default 0
   */
  gap?: number;
  /**
   * flex-wrap 속성
   * @default 'nowrap'
   */
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
}

export const Flex = ({
  className,
  children,
  direction = "row",
  justify = "flex-start",
  align = "stretch",
  gap = 0,
  wrap = "nowrap",
  style,
  ...props
}: FlexProps) => {
  return (
    <div
      className={cx("root", className)}
      style={{
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        gap,
        flexWrap: wrap,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
