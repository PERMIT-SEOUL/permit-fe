import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { API_URL } from "@/data/constants";
import { ERROR_CODE } from "@/lib/axios/utils/errorCode";

async function requestLogout(cookiesStore: ReadonlyRequestCookies) {
  return fetch(process.env.NEXT_PUBLIC_TICKET_API_BASE_URL + API_URL.USER.LOGOUT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${cookiesStore.get("accessToken")?.value}; refreshToken=${cookiesStore.get("refreshToken")?.value}`,
    },
    credentials: "include",
  });
}

export async function POST() {
  const cookiesStore = await cookies();
  let apiRes: Response;

  try {
    // 첫 로그아웃 요청
    apiRes = await requestLogout(cookiesStore);

    const data = await apiRes.clone().json();

    // accessToken 만료라면
    if (data?.code === ERROR_CODE.ACCESS_TOKEN_EXPIRED) {
      // 재발급 요청
      const reissueRes = await fetch(`/api/reissue`, {
        method: "POST",
        credentials: "include",
      });

      if (!reissueRes.ok) {
        throw new Error("Token reissue failed");
      }

      // 재발급 성공 → 로그아웃 재시도
      apiRes = await requestLogout(cookiesStore);
    }
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const setCookies = apiRes.headers.getSetCookie();

  const res = NextResponse.json(await apiRes.json(), {
    status: apiRes.status,
  });

  // Set-Cookie 그대로 전달
  for (const cookie of setCookies) {
    res.headers.append("Set-Cookie", cookie);
    res.headers.append("Set-Cookie", `${cookie}; Domain=.permitseoul.com`);
  }

  return res;
}
