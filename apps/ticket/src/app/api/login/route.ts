import { NextResponse } from "next/server";

/**
 * 로그인 요청 API
 * NOTE: API 서버에서 Set-Cookie 설정해주는 것을 브라우저에서 동일하게 쿠키 설정하기 위함
 */
export async function POST(req: Request) {
  const body = await req.json();

  const apiRes = await fetch(process.env.NEXT_PUBLIC_TICKET_API_BASE_URL + "/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

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
