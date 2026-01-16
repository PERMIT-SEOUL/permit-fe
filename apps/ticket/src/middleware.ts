import { cookies } from "next/headers";
// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  // const accessToken = request.cookies.get("accessToken")?.value;

  // console.log("@@@@@", accessToken);

  // if (accessToken) {
  //   response.cookies.set({ name: "accessToken", value: accessToken, httpOnly: true, secure: true });
  // }

  return NextResponse.next();
}
