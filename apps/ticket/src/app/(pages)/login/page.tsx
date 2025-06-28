"use client";

export default function LoginPage() {
  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 로직 구현
    const REST_API = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const REDIRECT_URI = "http://localhost:3000/auth";

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = kakaoURL;
  };

  const handleGoogleLogin = () => {
    // TODO: 구글 로그인 로직 구현
    console.log("구글 로그인 클릭");
  };

  return (
    <div>
      <h1>로그인</h1>

      <div>
        <button onClick={handleKakaoLogin}>카카오 로그인</button>

        <button onClick={handleGoogleLogin}>구글 로그인</button>
      </div>
    </div>
  );
}
