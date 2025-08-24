"use client";

import { ErrorBoundary, ErrorHandler } from "@/shared/clientBoundary/ErrorBoundary";

import { OrderErrorPage } from "./components/OrderErrorPage";

export const OrderPageError = ({ children }: { children: React.ReactNode }) => {
  return <ErrorBoundary handlers={globalErrorHandler}>{children}</ErrorBoundary>;
};

const globalErrorHandler: ErrorHandler[] = [
  {
    isError: () => true,
    fallback: () => <OrderErrorPage />,
  },
];
