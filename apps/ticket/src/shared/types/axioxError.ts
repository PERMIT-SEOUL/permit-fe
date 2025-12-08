import { ERROR_CODE } from "@/lib/axios/utils/errorCode";

export type AxiosErrorResponse = {
  code: number;
  message: string;
};

export function isAxiosErrorResponse(error: unknown): error is AxiosErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error &&
    typeof (error as AxiosErrorResponse).code === "number" &&
    typeof (error as AxiosErrorResponse).message === "string"
  );
}

export function isNotAuthErrorResponse(error: AxiosErrorResponse) {
  return !(
    error.code === ERROR_CODE.ACCESS_TOKEN_EXPIRED ||
    error.code === ERROR_CODE.REFRESH_TOKEN_EXPIRED
  );
}
