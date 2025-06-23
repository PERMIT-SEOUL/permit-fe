"use client";

import React, { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

export { type FallbackProps };

export type ErrorHandler = {
  isError: (error: Error) => boolean;
  fallback: (props: FallbackProps) => ReactNode;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
  handlers?: ErrorHandler[];
};

export const ErrorBoundary = ({ children, handlers }: ErrorBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();

  const fallbackRender = (props: FallbackProps) => {
    const matchedHandler = handlers?.find((h) => h.isError(props.error));

    if (!matchedHandler) {
      throw props.error;
    }

    const Fallback = matchedHandler.fallback;

    return (
      <Fallback
        error={props.error}
        resetErrorBoundary={() => {
          props.resetErrorBoundary();
        }}
      />
    );
  };

  return (
    <ReactErrorBoundary onReset={reset} fallbackRender={fallbackRender}>
      {children}
    </ReactErrorBoundary>
  );
};
