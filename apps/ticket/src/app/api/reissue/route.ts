import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { API_URL } from "@/data/constants";

/**
 * vercel Lambda 깨우기 용 ping API
 * 브라우저에서 주기적으로 호출하여 Lambda 깨우기 (Cold Start 방지)
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  if (searchParams.get("warm") === "y") {
    // 내부 POST 호출 → POST handler까지 깨우기
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reissue?warm=y`, {
      method: "POST",
    });

    return new Response("warm", { status: 200 });
  }

  return new Response("Method Not Allowed", { status: 405 });
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);

  // warm 호출이면 실제 로직 skip
  if (searchParams.get("warm") === "y") {
    return NextResponse.json({ warm: true });
  }

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

  if (!res.ok) {
    clearAuthCookies(res);
  }

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
