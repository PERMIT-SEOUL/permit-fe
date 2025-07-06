"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type ButtonSize = "sm" | "md";
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
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "md",
      variant = "primary",
      children,
      disabled = false,
      fullWidth = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cx(
          "button",
          `button--${size.toLowerCase()}`,
          `button--${variant}`,
          {
            "button--full-width": fullWidth,
          },
          className,
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
