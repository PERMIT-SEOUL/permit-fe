import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { PATH } from "@/shared/constants/path";
import { IS_LOGINED } from "@/shared/constants/storage";
import { AxiosErrorResponse, isAxiosErrorResponse } from "@/shared/types/axioxError";

import { safeLocalStorage } from "../storage";
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
    return response?.data;
  },
  async (error: TempAxiosErrorResponse) => {
    const original = error.config;

    // get 요청이 아닌 경우 즉시 refreshToken 재발급 및 요청
    if (original?.method !== "get" && !original?._retry) {
      if (isAxiosErrorResponse(error)) {
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

            if (!res.ok) {
              redirectToLoginOnce();
            }

            const originalRequest = error.config;

            return clientAxios(originalRequest);
          } catch (e) {
            redirectToLoginOnce();

            return Promise.reject(e);
          }
        }
      }
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
  safeLocalStorage.remove(IS_LOGINED);

  const redirectUrl = window.location.pathname + window.location.search;

  const loginUrl = `${PATH.LOGIN}?redirectUrl=${encodeURIComponent(redirectUrl)}`;

  window.location.href = loginUrl;
}
