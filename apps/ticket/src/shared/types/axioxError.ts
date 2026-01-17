import { AxiosError } from "axios";

import { ERROR_CODE } from "@/lib/axios/utils/errorCode";

type ErrorResponse = {
  code: number;
  message: string;
};

export type AxiosErrorResponse = AxiosError<ErrorResponse>;

export function isAxiosErrorResponse(error: unknown): error is AxiosErrorResponse {
  if (error === null || typeof error !== "object") {
    return false;
  }

  const hasOwnproperty = Object.prototype.hasOwnProperty;

  return (
    hasOwnproperty.call(error, "isAxiosError") ||
    (hasOwnproperty.call(error, "config") &&
      hasOwnproperty.call(error, "request") &&
      hasOwnproperty.call(error, "response"))
  );
}

export function isNotAuthErrorResponse(error: unknown): error is AxiosErrorResponse {
  return (
    isAxiosErrorResponse(error) &&
    (error.response?.data.code === ERROR_CODE.NO_ACCESS_TOKEN ||
      error.response?.data.code === ERROR_CODE.REFRESH_TOKEN_EXPIRED)
  );
}

export function isAuthError(error: Error): error is AxiosErrorResponse {
  return (
    isAxiosErrorResponse(error) && error.response?.data.code === ERROR_CODE.ACCESS_TOKEN_EXPIRED
  );
}

export function isNetworkError(error: Error): error is AxiosErrorResponse {
  return isAxiosErrorResponse(error) && (error.response?.status ?? 0) >= 400;
}
