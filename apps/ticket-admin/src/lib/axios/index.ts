import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

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

// 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    if (typeof window === "undefined") {
      // Server에서는 기본 전파
      return Promise.reject(error);
    }

    if (error.response?.status === ERROR_CODE.SERVER_ERROR) {
      alert("서버에러가 발생하였습니다. 관리자에게 문의해주세요.");

      window.location.href = "/login";
    }

    if (isAxiosErrorResponse(error.response?.data)) {
      // 액세스 토큰 만료
      if (error.response?.data.code === ERROR_CODE.ACCESS_TOKEN_EXPIRED) {
        try {
          // 엑세스 토큰 재발급
          await refreshAccessToken();

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

            window.location.href = EXTERNAL_PATH.LOGIN;
          }
        }
      }

      if (error.response?.data.code === ERROR_CODE.REFRESH_TOKEN_EXPIRED) {
        alert("로그인이 필요한 페이지입니다.");

        safeLocalStorage.remove(IS_LOGINED);
        window.location.href = "/login";
      }

      if (error.response?.data.code === 40106) {
        alert("접근 권한이 없는 페이지입니다.");
        window.location.href = EXTERNAL_PATH.HOME;
      }
    }
  },
);
