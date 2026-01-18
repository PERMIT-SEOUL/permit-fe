"use client";

import { Suspense } from "react";

import { NetworkErrorFallback } from "@/shared/components/NetworkErrorFallback";
import { isNetworkError } from "@/shared/types/axioxError";

import { ErrorBoundary, ErrorHandler } from "..";
import { GlobalErrorPage } from "./components/GlobalErrorPage";

export const GlobalErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary handlers={[networkErrorHandler, globalErrorHandler]}>
    <Suspense>{children}</Suspense>
  </ErrorBoundary>
);

const networkErrorHandler: ErrorHandler = {
  isError: (error) => isNetworkError(error),
  fallback: () => <NetworkErrorFallback />,
};

// TODO: 에러바운더리 수정
const globalErrorHandler: ErrorHandler = {
  isError: () => true,
  fallback: () => <GlobalErrorPage />,
};
