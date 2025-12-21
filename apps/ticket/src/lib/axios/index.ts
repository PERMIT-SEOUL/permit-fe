import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { API_URL } from "@/data/constants";
import { IS_LOGINED } from "@/shared/constants/storage";
import { AxiosErrorResponse, isAxiosErrorResponse } from "@/shared/types/axioxError";

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
  (response: AxiosResponse) => response.data,
  async (error: AxiosError<AxiosErrorResponse>) => {
    if (typeof window === "undefined") {
      // Server에서는 기본 전파
      console.error(error);

      return Promise.reject(error);
    }

    console.error("##error", JSON.stringify(error));

    // 로그인이 필요한 요청이거나, 리프레시 토큰 모두 만료시 로그인 페이지로 이동
    if (isAxiosErrorResponse(error.response?.data)) {
      // 엑세스 토큰 없음
      if (error.response?.data.code === ERROR_CODE.NO_ACCESS_TOKEN) {
        if (error.config?.url === API_URL.USER.LOGOUT) {
          safeLocalStorage.remove(IS_LOGINED);
        }

        redirectToLoginOnce();
      }

      if (error.response?.data.code === ERROR_CODE.LOGIN_REQUIRED) {
        // 인증 페이지에서는 로그인 페이지로 이동하지 않음
        if (window.location.pathname !== "/auth") {
          redirectToLoginOnce();
        }
      }

      if (error.response?.data.code === ERROR_CODE.REFRESH_TOKEN_EXPIRED) {
        redirectToLoginOnce();
      }

      if (error.response?.data.code === ERROR_CODE.PAYMENT) {
        return Promise.reject(error?.response?.data);
      }

      // 액세스 토큰 만료
      if (error.response?.data.code === ERROR_CODE.ACCESS_TOKEN_EXPIRED) {
        try {
          // 이미 토큰 재발급이 진행 중이면 완료될 때까지 대기
          if (tokenRefreshPromise) {
            await tokenRefreshPromise;
          } else {
            // 토큰 재발급 시작
            refreshAccessToken()
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
  },
);

function redirectToLoginOnce() {
  if (isLoginAlertShown) return;

  isLoginAlertShown = true;

  alert("로그인이 필요한 페이지입니다.");
  safeLocalStorage.remove(IS_LOGINED);
  window.location.href = "/login";
}
