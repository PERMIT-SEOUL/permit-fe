import { ReactNode } from "react";
import classNames from "classnames/bind";

import { Flex } from "../Flex";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type DialogProps = {
  /**
   * Dialog가 열려있는지 여부
   */
  open: boolean;
  /**
   * Dialog 닫기 함수
   */
  onClose: () => void;
  /**
   * Dialog 제목
   */
  title: string;
  /**
   * Dialog 부제목 (선택사항)
   */
  subTitle?: string;
  /**
   * Dialog 내용
   */
  children?: ReactNode;
};

type DialogContentProps = {
  children?: ReactNode;
};

type DialogBottomProps = {
  children?: ReactNode;
};

/**
 * Dialog Content 컴포넌트
 */
const DialogContent = ({ children }: DialogContentProps) => {
  return <div className={cx("content")}>{children}</div>;
};

/**
 * Dialog Bottom 컴포넌트
 */
const DialogBottom = ({ children }: DialogBottomProps) => {
  return <div className={cx("bottom")}>{children}</div>;
};

/**
 * Dialog Root 컴포넌트
 */
const DialogRoot = ({ open, title, subTitle, onClose, children }: DialogProps) => {
  if (!open) return null;

  return (
    <div className={cx("overlay")}>
      <div className={cx("dialog")}>
        <div className={cx("header")}>
          <Flex direction="column" gap={12}>
            <Flex justify="space-between" align="center">
              <Typography type="title20" color="white">
                {title}
              </Typography>
              <button onClick={onClose} className={cx("icon_button")}>
                <Icon.Close fill="gray500" size={24} />
              </button>
            </Flex>
            {subTitle && (
              <Typography type="body14" color="white">
                {subTitle}
              </Typography>
            )}
          </Flex>
        </div>

        {children}
      </div>
    </div>
  );
};

/**
 * Dialog 컴포넌트
 */
export const Dialog = Object.assign(DialogRoot, {
  Content: DialogContent,
  Bottom: DialogBottom,
});
