"use client";

import { ReactNode } from "react";

import { ErrorBoundary, ErrorHandler } from "@/shared/clientBoundary/ErrorBoundary";
import { AxiosErrorResponse, isAxiosErrorResponse } from "@/shared/types/axioxError";

import { SiteMapErrorFallback } from "../SiteMapErrorFallback";

type Props = {
  children: ReactNode;
  eventId: string;
};

const NOT_FOUND_SITE_MAP_ERROR_CODE = 40429;

export const SiteMapErrorBoundary = ({ children, eventId }: Props) => {
  return <ErrorBoundary handlers={siteMapErrorHandlers({ eventId })}>{children}</ErrorBoundary>;
};

const siteMapErrorHandlers = ({ eventId }: { eventId: string }): ErrorHandler[] => [
  {
    isError: (error) => isSiteMapNotRegisteredError(error as AxiosErrorResponse),
    fallback: () => <SiteMapErrorFallback eventId={eventId} />,
  },
];

const isSiteMapNotRegisteredError = (error: AxiosErrorResponse) => {
  return isAxiosErrorResponse(error) && error.response?.data.code === NOT_FOUND_SITE_MAP_ERROR_CODE;
};
