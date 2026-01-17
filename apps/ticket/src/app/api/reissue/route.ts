import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { API_URL } from "@/data/constants";

export async function POST(req: Request) {
  const cookiesStore = await cookies();

  const apiRes = await fetch(
    process.env.NEXT_PUBLIC_TICKET_API_BASE_URL + API_URL.USER.REISSUE_ACCESS_TOKEN,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${cookiesStore.get("accessToken")?.value}; refreshToken=${cookiesStore.get("refreshToken")?.value}`,
      },
      credentials: "include",
    },
  );

  const setCookies = apiRes.headers.getSetCookie();

  const res = NextResponse.json(await apiRes.json(), {
    status: apiRes.status,
  });

  // API 서버가 내려준 모든 Set-Cookie를 그대로 전달
  for (const cookie of setCookies) {
    // 기존 쿠키 그대로 전달
    // SSR 환경에서 브라우저 쿠키 사용할 수 있도록 하기 위함
    res.headers.append("Set-Cookie", cookie);

    // Domain 추가한 쿠키 한 번 더 전달
    // 브라우저 단에서 자동으로 쿠키가 포함한 요청이 갈 수 있도록 하기 위함
    res.headers.append("Set-Cookie", `${cookie}; Domain=.permitseoul.com`);
  }

  return res;
}
