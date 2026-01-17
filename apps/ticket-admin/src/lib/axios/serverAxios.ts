import axios, { AxiosResponse } from "axios";

export const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TICKET_API_BASE_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

serverAxios.interceptors.request.use(async (config) => {
  const at = await getDynamicServerCookies("accessToken");
  const rt = await getDynamicServerCookies("refreshToken");

  if (at || rt) {
    const cookieHeader = [at && `accessToken=${at}`, rt && `refreshToken=${rt}`]
      .filter(Boolean)
      .join("; ");

    config.headers.set("Cookie", cookieHeader);
  }

  return config;
});

serverAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
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

type RequestCookieValue = string | undefined;

export async function getDynamicServerCookies(
  cookieKey: string,
): Promise<RequestCookieValue | Record<string, RequestCookieValue>> {
  const { cookies } = await import("next/headers");

  if (typeof cookieKey === "string") {
    return (await cookies()).get(cookieKey)?.value;
  }
}
