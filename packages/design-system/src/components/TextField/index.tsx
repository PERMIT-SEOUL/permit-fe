import { forwardRef, InputHTMLAttributes } from "react";
import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type TextFieldVariant = "default";

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * 입력 필드 변형
   * @default "default"
   */
  variant?: TextFieldVariant;
  /**
   * 에러 메시지
   */
  error?: string;
  /**
   * 우측 아이콘
   */
  rightIcon?: React.ReactNode;
  /**
   * 전체 너비 적용 여부
   * @default false
   */
  fullWidth?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      variant = "default",
      error,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      readOnly,
      ...props
    },
    ref,
  ) => {
    const isError = Boolean(error);

    return (
      <div
        className={cx(
          "textfield-wrapper",
          {
            "textfield-wrapper--full-width": fullWidth,
          },
          className,
        )}
      >
        <div
          className={cx("textfield", `textfield--${variant}`, {
            "textfield--error": isError,
            "textfield--disabled": disabled,
            "textfield--readonly": readOnly,
          })}
        >
          <input
            ref={ref}
            className={cx("textfield__input", {
              "input--error": isError,
            })}
            disabled={disabled}
            readOnly={readOnly}
            {...props}
          />
          {rightIcon && <div className={cx("textfield__icon")}>{rightIcon}</div>}
        </div>
        {isError && <p className={cx("textfield__error")}>{error}</p>}
      </div>
    );
  },
);

TextField.displayName = "TextField";
