"use client";

import React, { forwardRef } from "react";

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface AsChildProps {
  asChild?: boolean;
}

// Slot 컴포넌트 - asChild prop이 true일 때 사용되는 컴포넌트
export const Slot = forwardRef<HTMLElement, SlotProps>(({ children, ...props }, ref) => {
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find((child) => React.isValidElement(child));

  if (!React.isValidElement(slottable)) {
    return null;
  }

  const slottableProps = slottable.props as Record<string, unknown>;

  return React.cloneElement(slottable as React.ReactElement<Record<string, unknown>>, {
    ...mergeProps(props, slottableProps),
    ref: mergeRefs(ref, (slottable as React.ReactElement & { ref?: React.Ref<unknown> }).ref),
  });
});

Slot.displayName = "Slot";

// Props 병합 함수
function mergeProps(
  slotProps: Record<string, unknown>,
  childProps: Record<string, unknown>,
): Record<string, unknown> {
  // className 병합
  const className = [slotProps.className, childProps.className].filter(Boolean).join(" ");

  // onClick 함수들 병합
  const onClick = (event: React.MouseEvent) => {
    (slotProps.onClick as ((event: React.MouseEvent) => void) | undefined)?.(event);
    (childProps.onClick as ((event: React.MouseEvent) => void) | undefined)?.(event);
  };

  // onMouseDown 함수들 병합
  const onMouseDown = (event: React.MouseEvent) => {
    (slotProps.onMouseDown as ((event: React.MouseEvent) => void) | undefined)?.(event);
    (childProps.onMouseDown as ((event: React.MouseEvent) => void) | undefined)?.(event);
  };

  // onKeyDown 함수들 병합
  const onKeyDown = (event: React.KeyboardEvent) => {
    (slotProps.onKeyDown as ((event: React.KeyboardEvent) => void) | undefined)?.(event);
    (childProps.onKeyDown as ((event: React.KeyboardEvent) => void) | undefined)?.(event);
  };

  return {
    ...slotProps,
    ...childProps,
    className: className || undefined,
    onClick: slotProps.onClick || childProps.onClick ? onClick : undefined,
    onMouseDown: slotProps.onMouseDown || childProps.onMouseDown ? onMouseDown : undefined,
    onKeyDown: slotProps.onKeyDown || childProps.onKeyDown ? onKeyDown : undefined,
  };
}

// Ref 병합 함수
function mergeRefs<T = unknown>(
  ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null>
): React.RefCallback<T> | null {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
