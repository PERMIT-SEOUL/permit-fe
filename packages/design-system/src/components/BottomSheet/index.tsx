"use client";

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import { Flex } from "../Flex";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

// BottomSheet 내부에서 사용할 Context
const BottomSheetContext = createContext<{
  close: (result?: unknown) => void;
} | null>(null);

// BottomSheet 내부에서 닫기 함수에 접근하기 위한 hook
export const useBottomSheetClose = () => {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error("useBottomSheetClose는 BottomSheet 내부에서만 사용할 수 있습니다.");
  }

  return context;
};

type BottomSheetProps = {
  /**
   * BottomSheet가 열려있는지 여부
   */
  open: boolean;
  /**
   * BottomSheet 닫기 함수 (슬라이드 다운 애니메이션과 함께)
   */
  onClose: (result?: unknown) => void;
  /**
   * BottomSheet 제목
   */
  title: string;
  /**
   * BottomSheet 부제목 (선택사항)
   */
  subTitle?: string;
  /**
   * BottomSheet 내용
   */
  children?: ReactNode;
  /**
   * 드래그로 닫기 활성화 여부 (기본값: true)
   */
  enableDragToClose?: boolean;
  /**
   * X 닫기 버튼 표시 여부 (기본값: true)
   */
  showCloseButton?: boolean;
};

type BottomSheetContentProps = {
  className?: string;
  children?: ReactNode;
};

type BottomSheetBottomProps = {
  className?: string;
  children?: ReactNode;
};

/**
 * BottomSheet Content 컴포넌트
 */
const BottomSheetContent = ({ children, className }: BottomSheetContentProps) => {
  return <div className={cx("content", className)}>{children}</div>;
};

/**
 * BottomSheet Bottom 컴포넌트
 */
const BottomSheetBottom = ({ children, className }: BottomSheetBottomProps) => {
  return <div className={cx("bottom", className)}>{children}</div>;
};

/**
 * BottomSheet Root 컴포넌트
 */
const BottomSheetRoot = ({
  open,
  title,
  subTitle,
  onClose,
  children,
  enableDragToClose = true,
  showCloseButton = true,
}: BottomSheetProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInteractionEnabled, setIsInteractionEnabled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDragClosing, setIsDragClosing] = useState(false);

  // 리렌더링을 방지하기 위해 ref 사용
  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  // DOM을 직접 조작하여 리렌더링 방지
  const updateTransform = (translateY: number) => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.style.transform = `translateY(${translateY}px)`;
    }

    currentYRef.current = translateY;
  };

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsInteractionEnabled(false);
      // transform을 초기화
      updateTransform(0);
      setTimeout(() => {
        setIsAnimating(true);
        // 애니메이션 완료 후 충분한 시간을 두고 상호작용 활성화
        setTimeout(() => {
          setIsInteractionEnabled(true);
        }, 500);
      }, 10);
    } else if (!open && isVisible) {
      // 이미 visible 상태일 때만 닫기 로직 실행
      setIsAnimating(false);
      setIsInteractionEnabled(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [open, isVisible]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // 공통 슬라이드 다운 닫기 함수
  const handleSlideDownClose = (result?: unknown) => {
    setIsAnimating(false);
    setIsInteractionEnabled(false);
    setIsDragClosing(true);

    // 처음부터 완전히 아래로 이동하는 애니메이션
    const bottomSheetHeight = window.innerHeight;

    updateTransform(bottomSheetHeight);

    setTimeout(() => {
      onClose(result);
      setIsVisible(false);
      updateTransform(0); // 다음번에 열릴 때를 위해 리셋
      setIsDragClosing(false);
    }, 300);
  };

  const handleDragClose = () => {
    // 드래그 닫기 시에는 현재 위치에서 자연스럽게 아래로 애니메이션
    setIsAnimating(false);
    setIsInteractionEnabled(false);
    setIsDragClosing(true);

    // 현재 위치에서 완전히 아래로 이동하는 애니메이션
    const bottomSheetHeight = window.innerHeight;

    updateTransform(bottomSheetHeight);

    setTimeout(() => {
      onClose(undefined);
      setIsVisible(false);
      updateTransform(0); // 다음번에 열릴 때를 위해 리셋
      setIsDragClosing(false);
    }, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // 상호작용이 비활성화되어 있거나 드래그 중일 때는 클릭 무시
    if (!isInteractionEnabled || isDragging) return;

    if (e.target === e.currentTarget) {
      handleSlideDownClose(undefined);
    }
  };

  // 드래그 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableDragToClose || !isInteractionEnabled) return;

    startYRef.current = e.touches[0]?.clientY || 0;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enableDragToClose || !isDragging) return;

    const y = e.touches[0]?.clientY || 0;
    const deltaY = y - startYRef.current;

    if (deltaY > 0) {
      updateTransform(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!enableDragToClose || !isDragging) return;

    setIsDragging(false);

    if (currentYRef.current > 80) {
      // 드래그 거리가 충분하면 자연스럽게 아래로 닫기
      handleDragClose();
    } else {
      // 드래그 거리가 부족하면 원래 위치로 되돌리기
      updateTransform(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!enableDragToClose || !isInteractionEnabled) return;

    startYRef.current = e.clientY;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableDragToClose || !isDragging) return;

    const deltaY = e.clientY - startYRef.current;

    if (deltaY > 0) {
      updateTransform(deltaY);
    }
  };

  const handleMouseUp = () => {
    if (!enableDragToClose || !isDragging) return;

    setIsDragging(false);

    if (currentYRef.current > 80) {
      // 드래그 거리가 충분하면 자연스럽게 아래로 닫기
      handleDragClose();
    } else {
      // 드래그 거리가 부족하면 원래 위치로 되돌리기
      updateTransform(0);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={cx("overlay", {
        show: isAnimating,
        interactive: isInteractionEnabled,
      })}
      {...(isInteractionEnabled && {
        onClick: handleOverlayClick,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
      })}
    >
      <div
        ref={bottomSheetRef}
        className={cx("bottomsheet", {
          show: isAnimating,
          dragging: isDragging,
          drag_closing: isDragClosing,
        })}
        {...(isInteractionEnabled &&
          enableDragToClose && {
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
            onMouseDown: handleMouseDown,
          })}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 드래그 핸들 */}
        <div className={cx("drag_handle")} />

        <div className={cx("header")}>
          <Flex direction="column" gap={8}>
            <Flex justify="space-between" align="center">
              <Typography type="title18" color="white">
                {title}
              </Typography>
              {showCloseButton && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSlideDownClose(undefined);
                  }}
                  className={cx("close_button")}
                >
                  <Icon.Close fill="gray500" size={24} />
                </button>
              )}
            </Flex>
            {subTitle && (
              <Typography type="body14" color="gray400">
                {subTitle}
              </Typography>
            )}
          </Flex>
        </div>

        <BottomSheetContext.Provider value={{ close: handleSlideDownClose }}>
          {children}
        </BottomSheetContext.Provider>
      </div>
    </div>
  );
};

/**
 * BottomSheet 컴포넌트
 */
export const BottomSheet = Object.assign(BottomSheetRoot, {
  Content: BottomSheetContent,
  Bottom: BottomSheetBottom,
});
