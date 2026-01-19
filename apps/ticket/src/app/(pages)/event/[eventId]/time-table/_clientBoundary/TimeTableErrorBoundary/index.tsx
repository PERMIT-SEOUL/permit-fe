"use client";

import { ReactNode } from "react";

import { ErrorBoundary, ErrorHandler } from "@/shared/clientBoundary/ErrorBoundary";
import { isAxiosErrorResponse } from "@/shared/types/axioxError";

import { TimeTableErrorFallback } from "../TimeTableErrorFallback";

type Props = {
  children: ReactNode;
  eventId: string;
};

const NOT_FOUND_TIME_TABLE_ERROR_CODE = 40420;

export const TimeTableErrorBoundary = ({ children, eventId }: Props) => {
  return <ErrorBoundary handlers={timeTableErrorHandlers({ eventId })}>{children}</ErrorBoundary>;
};

const timeTableErrorHandlers = ({ eventId }: { eventId: string }): ErrorHandler[] => [
  {
    isError: (error) => isTimeTableNotRegisteredError(error),
    fallback: () => {
      return <TimeTableErrorFallback eventId={eventId} />;
    },
  },
];

const isTimeTableNotRegisteredError = (error: Error) => {
  return (
    isAxiosErrorResponse(error) && error.response?.data.code === NOT_FOUND_TIME_TABLE_ERROR_CODE
  );
};
