import { API_URL } from "@/data/constants";

import { instance } from "..";

// 엑세스 토큰 재발급 함수
export async function refreshAccessToken() {
  const { data } = await instance.post(API_URL.REISSUE_ACCESS_TOKEN);

  return data;
}
