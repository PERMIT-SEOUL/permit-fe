import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const apiRes = await fetch(process.env.NEXT_PUBLIC_TICKET_API_BASE_URL + "/api/users/reissue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const res = NextResponse.json(await apiRes.json(), {
    status: apiRes.status,
  });

  // API 서버가 내려준 모든 Set-Cookie를 그대로 전달
  const setCookies = apiRes.headers.getSetCookie(); // 배열 반환

  for (const cookie of setCookies) {
    res.headers.append("Set-Cookie", cookie);
  }

  return res;
}
