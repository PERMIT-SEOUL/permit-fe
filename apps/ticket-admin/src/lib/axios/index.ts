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
    return Promise.reject(error);
    //   // 서버에서 내려온 에러 객체를 그대로 throw 하면 Next/React 에러 오버레이에서
    //   // "Error: [object Object]"로 표시됩니다. 사용자/디버깅 가독성을 위해
    //   // 표준 Error 인스턴스로 변환해 메시지를 보존합니다.
    //   const serverData = error.response?.data as any;
    //   const message =
    //     (serverData && (serverData.message || serverData.error || serverData.msg)) ||
    //     error.message ||
    //     "Request failed";

    //   const wrappedError = new Error(message);

    //   // 추가 디버깅 정보를 보존
    //   (wrappedError as any).status = error.response?.status;
    //   (wrappedError as any).data = serverData;
    //   (wrappedError as any).config = error.config;

    //   return Promise.reject(wrappedError);
  },
);
