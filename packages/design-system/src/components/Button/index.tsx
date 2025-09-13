"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import classNames from "classnames/bind";

import { useDebounce } from "../../hooks";
import { AsChildProps, Slot } from "../Slot";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const DEBOUNCE_WAIT = 200;

export type ButtonSize = "sm" | "md" | "header";
export type ButtonVariant = "primary" | "secondary" | "cta" | "error" | "unac";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  AsChildProps & {
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
    /**
     * 중복 클릭 방지 (디바운스)
     */
    useClickDebounce?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      className,
      size = "md",
      variant = "primary",
      children,
      disabled = false,
      fullWidth = false,
      isLoading,
      useClickDebounce = false,
      onClick,
      ...props
    },
    ref,
  ) => {
    const debouncedOnClick = useDebounce((e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
    }, DEBOUNCE_WAIT);

    const buttonClassName = cx(
      "button",
      `button--${variant}`,
      `button--${size.toLowerCase()}`,
      {
        "button--full-width": fullWidth,
        "button--loading": isLoading,
      },
      className,
    );

    const buttonProps = {
      ref,
      className: buttonClassName,
      disabled: disabled || isLoading,
      onClick: useClickDebounce ? debouncedOnClick : onClick,
      ...props,
    };

    const buttonContent = isLoading ? (
      <span className={cx("spinner", variant)}>
        <span className={cx("dot")} />
        <span className={cx("dot")} />
        <span className={cx("dot")} />
      </span>
    ) : (
      children
    );

    if (asChild) {
      return <Slot {...buttonProps}>{buttonContent}</Slot>;
    }

    return <button {...buttonProps}>{buttonContent}</button>;
  },
);

Button.displayName = "Button";
