"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useLoginMutation } from "@/data/users/postUserLogin/mutation";
import { safeLocalStorage, safeSessionStorage } from "@/lib/storage";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";
import { PATH } from "@/shared/constants/path";
import {
  IS_LOGINED,
  REDIRECT_URL_KEY,
  SOCIAL_LOGIN_TYPE_KEY,
  TOKEN_KEY,
} from "@/shared/constants/storage";
import { REDIRECT_URI } from "@/shared/hooks/useOAuth/constants";
import { SocialLoginType } from "@/shared/hooks/useOAuth/types";
import { isAxiosErrorResponse } from "@/shared/types/axioxError";

/**
 * 인증 페이지
 *
 * NOTE:
 * 카카오, 구글 로그인 이후 redirect 되는 페이지
 * 인증 코드를 통해 로그인 요청을 보내며
 * 로그인 성공 시, 홈 페이지로 리다이렉트
 * 로그인 실패 (최초 로그인)시, 회원가입 페이지로 리다이렉트
 */
const AuthPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const authorizationCode = searchParams.get("code");

  const socialType = safeLocalStorage.get(SOCIAL_LOGIN_TYPE_KEY) as SocialLoginType;
  const redirectUrl = safeSessionStorage.get(REDIRECT_URL_KEY);

  const { mutateAsync } = useLoginMutation();

  const isLoginProcessingRef = useRef(false);

  const handleLogin = useCallback(async () => {
    if (isLoginProcessingRef.current) return;

    isLoginProcessingRef.current = true;

    if (authorizationCode) {
      try {
        await mutateAsync({
          socialType,
          authorizationCode,
          redirectUrl: REDIRECT_URI || "",
        });

        safeLocalStorage.set(IS_LOGINED, "true");

        router.replace(redirectUrl || PATH.HOME);
        safeSessionStorage.remove(REDIRECT_URL_KEY);
      } catch (error) {
        if (isAxiosErrorResponse(error)) {
          safeLocalStorage.set(TOKEN_KEY, error.response?.data.message || "");
          router.replace(PATH.SIGNUP);

          return;
        }

        console.log(error);
        router.replace(PATH.HOME);
      }
    } else {
      // 인증 코드가 없는 경우 로그인 페이지로 리다이렉트
      router.replace(PATH.LOGIN);
    }
  }, [authorizationCode, mutateAsync, router, socialType, redirectUrl]);

  useEffect(() => {
    handleLogin();
  }, [handleLogin]);

  return <LoadingWithLayout />;
};

export default AuthPage;
