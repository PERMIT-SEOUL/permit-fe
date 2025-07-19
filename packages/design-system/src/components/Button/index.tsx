"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type ButtonSize = "sm" | "md" | "header";
export type ButtonVariant = "primary" | "secondary" | "cta" | "error" | "unac";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 크기
   * @default "md"
   */
  size?: ButtonSize;
  /**
   * 버튼 변형
   * @default "primary"
   */
  variant?: ButtonVariant;
  /**
   * 버튼 내부 컨텐츠
   */
  children: React.ReactNode;
  /**
   * 버튼 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 버튼 전체 너비 적용 여부
   * @default false
   */
  fullWidth?: boolean;
  /**
   * 로딩 여부
   */
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      size = "md",
      variant = "primary",
      children,
      disabled = false,
      fullWidth = false,
      isLoading,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cx(
          "button",
          `button--${variant}`,
          `button--${size.toLowerCase()}`,
          {
            "button--full-width": fullWidth,
            "button--loading": isLoading,
          },
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className={cx("spinner", variant)}>
            <span className={cx("dot")} />
            <span className={cx("dot")} />
            <span className={cx("dot")} />
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
