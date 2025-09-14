// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isProd = process.env.VERCEL_ENV === "production";
  const path = req.nextUrl.pathname;

  // 운영 환경에서만 특별한 제한을 적용
  if (isProd) {
    const isAllowedPage = /^\/event\/[^/]+\/time-table$/.test(path) || path === "/";
    const isStaticFile =
      path.startsWith("/_next/") || path.startsWith("/static/") || path.startsWith("/public/");

    // 허용 조건: 특정 페이지만 or 정적 파일만
    if (!(isAllowedPage || isStaticFile)) {
      // 차단
      return NextResponse.rewrite(new URL("/404", req.url));
      // 또는 return new NextResponse("Forbidden", { status: 403 });
      // 또는 return NextResponse.redirect(new URL("/event/DEFAULT_ID/time-table", req.url));
    }
  }

  return NextResponse.next();
}
