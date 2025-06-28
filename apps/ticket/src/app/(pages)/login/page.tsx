"use client";

import { useOAuth } from "@/shared/hooks/useOAuth";

export default function LoginPage() {
  const { handleLogin } = useOAuth();

  return (
    <div>
      <div>
        <button onClick={() => handleLogin("KAKAO")}>카카오 로그인</button>
        <br />
        <button onClick={() => handleLogin("GOOGLE")}>구글 로그인</button>
      </div>
    </div>
  );
}
