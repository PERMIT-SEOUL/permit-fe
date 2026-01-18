"use client";

import { useEffect, useState } from "react";

import { EXTERNAL_PATH } from "@/shared/constants/path";

import { LoadingWithLayout } from "../LoadingWithLayout";

export const AuthErrorFallback = () => {
  const [isLoading, setIsLoaidng] = useState(true);

  useEffect(() => {
    const tokenReissue = async () => {
      const res = await fetch(`${EXTERNAL_PATH.HOME}/api/reissue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      // 토큰 재발급 후 reload()
      window.location.reload();
    };

    tokenReissue();
  }, []);

  if (isLoading) {
    return <LoadingWithLayout />;
  }

  return <div></div>;
};
