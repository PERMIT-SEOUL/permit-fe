"use client";

import { useEffect, useState } from "react";

import { LoadingWithLayout } from "../LoadingWithLayout";

export const AuthErrorFallback = () => {
  const [isLoading, setIsLoaidng] = useState(true);

  useEffect(() => {
    const tokenReissue = async () => {
      const res = await fetch("/api/reissue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      console.log("@@ reissue", res, JSON.stringify(res));

      // 토큰 재발급 후 reload()
      // window.location.reload();
    };

    tokenReissue();
  }, []);

  if (isLoading) {
    return <LoadingWithLayout />;
  }

  return <div></div>;
};
