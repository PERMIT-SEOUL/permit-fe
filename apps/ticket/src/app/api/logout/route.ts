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
  let apiRes: Response | null = null;

  try {
    const cookiesStore = await cookies();

    apiRes = await requestLogout(cookiesStore);

    const data = await apiRes.clone().json();

    if (data?.code === ERROR_CODE.ACCESS_TOKEN_EXPIRED) {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reissue`, {
        method: "POST",
        credentials: "include",
      });

      apiRes = await requestLogout(await cookies());
    }
  } catch (e) {
    // ❗ 실패해도 무시
  }

  const res = NextResponse.json({ success: true }, { status: 200 });

  // 성공/실패 무관하게 쿠키 제거
  clearAuthCookies(res);

  return res;
}

function clearAuthCookies(res: NextResponse) {
  for (const name of ["accessToken", "refreshToken"]) {
    res.headers.append(
      "Set-Cookie",
      `${name}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=None`,
    );

    // 도메인 쿠키까지 같이 제거
    res.headers.append(
      "Set-Cookie",
      `${name}=; Path=/; Domain=.permitseoul.com; Max-Age=0; HttpOnly; Secure; SameSite=None`,
    );
  }
}
