import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
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
  /**
   * 멀티라인 모드 (textarea)
   * @default false
   */
  multiline?: boolean;
  /**
   * 멀티라인 모드일 때 행 수
   * @default 3
   */
  rows?: number;
}

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  (
    {
      variant = "default",
      error,
      rightIcon,
      fullWidth = false,
      multiline = false,
      rows = 3,
      className,
      disabled,
      readOnly,
      ...props
    },
    ref,
  ) => {
    const isError = Boolean(error);
    const isTimeInput = props?.type === "time";
    const hasValue = typeof props?.value !== "undefined" && String(props?.value).length > 0;

    return (
      <div
        className={cx(
          "textfield-wrapper",
          {
            "textfield-wrapper--full-width": fullWidth,
            "textfield-wrapper--multiline": multiline,
          },
          className,
        )}
      >
        <div
          className={cx("textfield", `textfield--${variant}`, {
            "textfield--error": isError,
            "textfield--disabled": disabled,
            "textfield--readonly": readOnly,
            "textfield--multiline": multiline,
          })}
          data-time-empty={isTimeInput ? (!hasValue).toString() : undefined}
          data-placeholder={isTimeInput ? props?.placeholder : undefined}
        >
          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={cx("textfield__input", "textfield__textarea", {
                "input--error": isError,
              })}
              disabled={disabled}
              readOnly={readOnly}
              rows={rows}
              {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              className={cx("textfield__input", {
                "input--error": isError,
              })}
              disabled={disabled}
              readOnly={readOnly}
              data-empty={isTimeInput ? (!hasValue).toString() : undefined}
              {...props}
            />
          )}
          {rightIcon && <div className={cx("textfield__icon")}>{rightIcon}</div>}
        </div>
        {isError && <p className={cx("textfield__error")}>{error}</p>}
      </div>
    );
  },
);

TextField.displayName = "TextField";
