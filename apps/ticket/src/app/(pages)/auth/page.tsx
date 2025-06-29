"use client";

import { useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { loginMutationOptions } from "@/data/users/postUserLogin/mutation";
import { safeLocalStorage } from "@/lib/storage";
import { LoadingIndicator } from "@/shared/components/LoadingIndicator";
import { PAGE_URL } from "@/shared/constants/pageUrl";
import { SOCIAL_LOGIN_TYPE_KEY, TOKEN_KEY } from "@/shared/constants/storage";
import { REDIRECT_URI } from "@/shared/hooks/useOAuth/constants";
import { SocialLoginType } from "@/shared/hooks/useOAuth/types";

export default function AuthPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const authorizationCode = searchParams.get("code");

  const socialType = safeLocalStorage.get(SOCIAL_LOGIN_TYPE_KEY) as SocialLoginType;

  const { mutateAsync } = useMutation({
    ...loginMutationOptions(),
  });

  const handleLogin = useCallback(async () => {
    if (authorizationCode) {
      try {
        await mutateAsync({
          socialType,
          authorizationCode,
          redirectUrl: REDIRECT_URI || "",
        });

        // TODO: redirect 로직 구체적으로 추가
        router.replace(PAGE_URL.HOME);
      } catch (error) {
        safeLocalStorage.set(TOKEN_KEY, (error as Error).message);
        router.replace(PAGE_URL.SIGNUP);
      }
    } else {
      // 인증 코드가 없는 경우 로그인 페이지로 리다이렉트
      router.replace(PAGE_URL.LOGIN);
    }
  }, [authorizationCode, mutateAsync, router, socialType]);

  useEffect(() => {
    handleLogin();
  }, [handleLogin]);

  return (
    <div
      style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <LoadingIndicator size="large" />
    </div>
  );
}
