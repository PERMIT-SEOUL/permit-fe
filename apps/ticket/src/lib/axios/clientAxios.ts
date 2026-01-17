import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { PATH } from "@/shared/constants/path";
import { IS_LOGINED } from "@/shared/constants/storage";
import { AxiosErrorResponse, isAxiosErrorResponse } from "@/shared/types/axioxError";

import { safeSessionStorage } from "../storage";
import { ERROR_CODE } from "./utils/errorCode";

export const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TICKET_API_BASE_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터
clientAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

let isLoginAlertShown = false;

interface TempAxiosErrorResponse extends AxiosErrorResponse {
  config: InternalAxiosRequestConfig & { _retry?: boolean };
}

// 응답 인터셉터
clientAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error: TempAxiosErrorResponse) => {
    const original = error.config;

    // get 요청이 아닌 경우 즉시 refreshToken 재발급 및 요청
    if (original?.method !== "get" && !original?._retry) {
      if (isAxiosErrorResponse(error.response?.data)) {
        if (error.response?.data.code === ERROR_CODE.ACCESS_TOKEN_EXPIRED) {
          original._retry = true;

          try {
            const res = await fetch("/api/reissue", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            });

            return res.json();
          } catch (e) {
            redirectToLoginOnce();

            return;
          }
        }
      }
    }

    // 로그인이 필요한 요청이거나, 리프레시 토큰 모두 만료시 로그인 페이지로 이동
    if (isAxiosErrorResponse(error.response?.data)) {
      const { code } = error.response?.data ?? {};

      // 엑세스 토큰 없음
      if (code === ERROR_CODE.NO_ACCESS_TOKEN || code === ERROR_CODE.REFRESH_TOKEN_EXPIRED) {
        redirectToLoginOnce();
      }

      if (code === ERROR_CODE.LOGIN_REQUIRED) {
        // 인증 페이지에서는 로그인 페이지로 이동하지 않음
        if (window.location.pathname !== "/auth") {
          redirectToLoginOnce();
        }
      }

      if (code === ERROR_CODE.PAYMENT) {
        return Promise.reject(error?.response?.data);
      }

      // // 액세스 토큰 만료
      // if (code === ERROR_CODE.ACCESS_TOKEN_EXPIRED) {
      //   try {
      //     // 이미 토큰 재발급이 진행 중이면 완료될 때까지 대기
      //     if (tokenRefreshPromise) {
      //       console.log("@@@@@");
      //       await tokenRefreshPromise;
      //     } else {
      //       // 토큰 재발급 시작
      //       tokenRefreshPromise = refreshAccessToken()
      //         .then(() => {
      //           tokenRefreshPromise = null;
      //         })
      //         .catch((error) => {
      //           tokenRefreshPromise = null;

      //           throw error;
      //         });
      //     }

      // 원래 요청 재시도
      //     const originalRequest = error.config;

      //     if (!originalRequest) {
      //       return Promise.reject(error);
      //     }

      //     return clientAxios(originalRequest);
      //   } catch {
      //     if (typeof window !== "undefined") {
      //       redirectToLoginOnce();

      //       return Promise.reject(error?.response?.data);
      //     }
      //   }
      // }
    }

    if (error?.response?.data) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: error.response?.data,
        },
      });
    }

    return Promise.reject(error);
  },
);

function redirectToLoginOnce() {
  if (isLoginAlertShown) return;

  isLoginAlertShown = true;

  alert("로그인 후 이용해 주세요.");
  safeSessionStorage.remove(IS_LOGINED);

  const redirectUrl = window.location.pathname + window.location.search;

  const loginUrl = `${PATH.LOGIN}?redirectUrl=${encodeURIComponent(redirectUrl)}`;

  window.location.href = loginUrl;
}
