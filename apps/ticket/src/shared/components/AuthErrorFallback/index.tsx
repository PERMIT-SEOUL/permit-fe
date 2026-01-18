"use client";

import { useEffect, useState } from "react";

import { LoadingWithLayout } from "../LoadingWithLayout";

export const AuthErrorFallback = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenReissue = async () => {
      try {
        const res = await fetch("/api/reissue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.ok) {
          // 토큰 재발급 성공 → 새로고침
          window.location.reload();
        } else {
          // 재발급 실패 → 로그인
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("토큰 재발급 실패:", error);
        alert("인증 오류가 발생했습니다. 다시 로그인해주세요.");
        window.location.href = "/login";
      }
    };

    tokenReissue();
  }, []);

  if (isLoading) {
    return <LoadingWithLayout />;
  }

  return <div></div>;
};
