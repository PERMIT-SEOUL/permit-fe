import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { API_URL } from "@/data/constants";
import { EXTERNAL_PATH } from "@/shared/constants/path";
import { IS_LOGINED } from "@/shared/constants/storage";
import { isAxiosErrorResponse } from "@/shared/types/axioxError";

import { safeLocalStorage } from "../storage";
import { refreshAccessToken } from "./helpers";
import { ERROR_CODE } from "./utils/errorCode";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TICKET_API_BASE_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

let tokenRefreshPromise: Promise<void> | null = null;
let isLoginAlertShown = false;

// 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse) => response?.data,
  async (error: AxiosError) => {
    if (typeof window === "undefined") {
      // Server에서는 기본 전파
      console.error(error);

      return Promise.reject(error);
    }

    console.error("##error", JSON.stringify(error));

    if (isAxiosErrorResponse(error.response?.data)) {
      // 엑세스 토큰 없음
      if (
        error.response?.data.code === ERROR_CODE.NO_ACCESS_TOKEN ||
        error.response?.data.code === ERROR_CODE.ACCESS_TOKEN_EXPIRED ||
        error.response?.data.code === ERROR_CODE.REFRESH_TOKEN_EXPIRED
      ) {
        redirectToLoginOnce();
      }

      if (error?.response?.data.code === ERROR_CODE.NO_ACCESS) {
        alert("접근 권한이 필요한 페이지입니다.");

        window.location.href = EXTERNAL_PATH.HOME;
      }

      // 액세스 토큰 만료
      if (error.response?.data.code === ERROR_CODE.ACCESS_TOKEN_EXPIRED) {
        try {
          // 이미 토큰 재발급이 진행 중이면 완료될 때까지 대기
          if (tokenRefreshPromise) {
            await tokenRefreshPromise;
          } else {
            // 토큰 재발급 시작
            tokenRefreshPromise = refreshAccessToken()
              .then(() => {
                tokenRefreshPromise = null;
              })
              .catch((error) => {
                tokenRefreshPromise = null;

                throw error;
              });
          }

          // 원래 요청 재시도
          const originalRequest = error.config;

          if (!originalRequest) {
            return Promise.reject(error);
          }

          return instance(originalRequest);
        } catch {
          if (typeof window !== "undefined") {
            redirectToLoginOnce();

            return Promise.reject(error?.response?.data);
          }
        }
      }
    }

    if (error.response?.status === 500) {
      return Promise.reject(error?.response?.data);
    }

    return Promise.reject(error?.response?.data);
  },
);

function redirectToLoginOnce() {
  if (isLoginAlertShown) return;

  isLoginAlertShown = true;

  alert("로그인이 필요한 페이지입니다.");
  safeLocalStorage.remove(IS_LOGINED);

  const redirectUrl = `${EXTERNAL_PATH.LOGIN}?redirectUrl=${encodeURIComponent(window.location.pathname)}`;

  window.location.href = redirectUrl;
}
