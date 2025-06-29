"use client";

const REDIRECT_URI = "http://localhost:3000/auth";

export default function LoginPage() {
  // TODO: socialType 로컬 스토리지에 저장
  // TODO: 리팩토링 필요

  const handleKakaoLogin = () => {
    const REST_API = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = kakaoURL;
  };

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email+profile`;
  };

  return (
    <div>
      <div>
        <button onClick={handleKakaoLogin}>카카오 로그인</button>
        <br />
        <button onClick={handleGoogleLogin}>구글 로그인</button>
      </div>
    </div>
  );
}
