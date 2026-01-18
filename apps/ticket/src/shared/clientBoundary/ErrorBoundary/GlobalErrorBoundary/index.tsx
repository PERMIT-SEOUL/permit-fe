"use client";

import { Suspense } from "react";

import { AuthErrorFallback } from "@/shared/components/AuthErrorFallback";
import { NetworkErrorFallback } from "@/shared/components/NetworkErrorFallback";
import { RequiredLoginFallback } from "@/shared/components/RequiredLoginFallback";
import { isAuthError, isNetworkError, isNotAuthErrorResponse } from "@/shared/types/axioxError";

import { ErrorBoundary, ErrorHandler } from "..";
import { GlobalErrorPage } from "./components/GlobalErrorPage";

export const GlobalErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary
    handlers={[authErrorHandler, requiredLoginHandler, networkErrorHandler, globalErrorHandler]}
  >
    <Suspense>{children}</Suspense>
  </ErrorBoundary>
);

const authErrorHandler: ErrorHandler = {
  isError: (error) => isAuthError(error),
  fallback: () => <AuthErrorFallback />,
};

const requiredLoginHandler: ErrorHandler = {
  isError: (error) => isNotAuthErrorResponse(error),
  fallback: () => <RequiredLoginFallback />,
};

const networkErrorHandler: ErrorHandler = {
  isError: (error) => isNetworkError(error),
  fallback: () => <NetworkErrorFallback />,
};

// TODO: 에러바운더리 수정
const globalErrorHandler: ErrorHandler = {
  isError: () => true,
  fallback: () => <GlobalErrorPage />,
};
