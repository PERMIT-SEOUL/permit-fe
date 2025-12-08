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

let isAlertShown = false;

// 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError<AxiosErrorResponse>) => {
    if (typeof window === "undefined") {
      // Server에서는 기본 전파
      return Promise.reject(error);
    }

    if (error.response?.status === ERROR_CODE.SERVER_ERROR) {
      alert("서버에러가 발생하였습니다. 관리자에게 문의해주세요.");

      return;
    }

    if (error.config?.url === API_URL.USER.REISSUE_ACCESS_TOKEN) {
      return Promise.reject(error);
    }

    // 로그인이 필요한 요청이거나, 리프레시 토큰 모두 만료시 로그인 페이지로 이동
    if (isAxiosErrorResponse(error.response?.data)) {
      if (error.response?.data.code === ERROR_CODE.LOGIN_REQUIRED) {
        // 인증 페이지에서는 로그인 페이지로 이동하지 않음
        if (window.location.pathname !== "/auth") {
          alert("로그인이 필요한 페이지입니다.");

          safeLocalStorage.remove(IS_LOGINED);
          window.location.href = "/login";
        }
      }

      if (error.response?.data.code === ERROR_CODE.REFRESH_TOKEN_EXPIRED) {
        alert("로그인이 필요한 페이지입니다.");

        safeLocalStorage.remove(IS_LOGINED);
        window.location.href = "/login";
      }
    }

    // 액세스 토큰 만료
    if (error.response?.data.code === ERROR_CODE.ACCESS_TOKEN_EXPIRED) {
      try {
        if (isAlertShown) return;

        // 엑세스 토큰 재발급
        isAlertShown = true;
        await refreshAccessToken();
        isAlertShown = false;

        // 원래 요청 재시도
        const originalRequest = error.config;

        if (!originalRequest) {
          return Promise.reject(error);
        }

        return instance(originalRequest);
      } catch (error) {
        if (typeof window !== "undefined") {
          alert("로그인이 필요한 페이지입니다.");

          // 엑세스 토큰 재발급 실패시 로그인 페이지로 이동
          safeLocalStorage.remove(IS_LOGINED);

          window.location.href = "/login";
          isAlertShown = false;
        }
      }
    }

    return Promise.reject(error.response?.data);
  },
);
