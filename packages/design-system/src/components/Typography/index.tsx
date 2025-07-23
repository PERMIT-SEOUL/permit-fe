import { HTMLAttributes } from "react";
import classNames from "classnames/bind";

import styles from "./index.module.scss";
import { TypographyColor, TypographyType, TypographyWeight } from "./types";

const cx = classNames.bind(styles);

export type TypographyProps = HTMLAttributes<HTMLParagraphElement> & {
  /**
   * 타이포그래피 변형
   */
  type: TypographyType;
  /**
   * 타이포그래피 색상
   * @default "white"
   */
  color?: TypographyColor;
  /**
   * 타이포그래피 두께
   * @default "bold" for title variants
   * @default "regular" for body variants
   */
  weight?: TypographyWeight;
};

export const Typography = ({
  className,
  children,
  type,
  color,
  weight,
  ...props
}: TypographyProps) => {
  return (
    <p className={cx("typography", type, color, weight, className)} {...props}>
      {children}
    </p>
  );
};
