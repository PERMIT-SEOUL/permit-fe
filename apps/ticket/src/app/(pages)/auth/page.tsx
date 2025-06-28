"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  /**
   * TODO: 로그인 API 요청
   * 1. success 일 때
   * - redirect to next page or '/'
   * 2. error 일 때
   * - redirect signup page
   */

  useEffect(() => {
    // 임시로 signup 페이지로 이동
    if (code) {
      router.push(`/signup?code=${code}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>loading... {code}</div>;
}
