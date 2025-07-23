"use client";

import { Suspense } from "react";

import { ErrorBoundary, ErrorHandler } from "..";

export const GlobalErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary handlers={globalErrorHandler}>
    <Suspense>{children}</Suspense>
  </ErrorBoundary>
);

// TODO: 에러바운더리 수정
const globalErrorHandler: ErrorHandler[] = [
  {
    isError: () => true,
    fallback: () => <div>에러가 발생했어요</div>,
  },
];
