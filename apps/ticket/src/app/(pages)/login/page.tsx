"use client";

import { useOAuth } from "@/shared/hooks/useOAuth";
import { SOCIAL_LOGIN_TYPE } from "@/shared/hooks/useOAuth/types";

export default function LoginPage() {
  const { handleLogin } = useOAuth();

  return (
    <div>
      <div>
        <button onClick={() => handleLogin(SOCIAL_LOGIN_TYPE.KAKAO)}>카카오 로그인</button>
        <br />
        <button onClick={() => handleLogin(SOCIAL_LOGIN_TYPE.GOOGLE)}>구글 로그인</button>
      </div>
    </div>
  );
}
