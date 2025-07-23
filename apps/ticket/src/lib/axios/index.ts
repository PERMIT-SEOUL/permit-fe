import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { AxiosErrorResponse } from "@/shared/types/axioxError";

import { refreshAccessToken } from "./helpers";

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
  async (error: AxiosError<AxiosErrorResponse>) => {
    // TODO: 에러 로직 변경
    // if (error.status === 500) {
    //   alert("서버에러 발생. 관리자에게 문의해주세요.");
    // }

    // 리프레시 토큰 모두 만료시 로그인 페이지로 이동
    if (error.response?.data.code === 40404) {
      alert("로그인이 필요한 페이지입니다.");
    }

    // 액세스 토큰 만료
    if (error.response?.data.code === 40403) {
      try {
        // 엑세스 토큰 재발급
        await refreshAccessToken();

        // 원래 요청 재시도
        const originalRequest = error.config;

        if (!originalRequest) {
          return Promise.reject(error);
        }

        return instance(originalRequest);
      } catch {
        // 재발급 실패시 로그인 페이지로 이동
        window.location.href = "/login";
      }
    }

    return Promise.reject(error.response?.data);
  },
);
