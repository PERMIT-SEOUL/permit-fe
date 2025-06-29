import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

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
    // TODO: 토큰 로직 등 추가
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // TODO: 에러 로깅 등 추가

    if (error.status === 500) {
      alert("서버에러 발생. 관리자에게 문의해주세요.");
    }

    return Promise.reject(error.response?.data);
  },
);
