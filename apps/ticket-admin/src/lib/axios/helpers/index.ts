import axios from "axios";

import { API_URL } from "@/data/constants";

// 엑세스 토큰 재발급 함수
const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TICKET_API_BASE_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export async function refreshAccessToken() {
  const { data } = await refreshClient.post(API_URL.USER.REISSUE_ACCESS_TOKEN);

  return data;
}
