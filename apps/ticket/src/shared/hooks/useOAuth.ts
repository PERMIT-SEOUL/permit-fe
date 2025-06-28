import { safeLocalStorage } from "@/lib/storage";

const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

export const useOAuth = () => {
  const handleLogin = (socialType: "KAKAO" | "GOOGLE") => {
    if (socialType === "KAKAO") {
      handleKakaoLogin();
    } else if (socialType === "GOOGLE") {
      handleGoogleLogin();
    }

    safeLocalStorage.set("socialType", socialType);
  };

  const handleKakaoLogin = () => {
    const REST_API = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = kakaoURL;
  };

  const handleGoogleLogin = () => {
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email+profile`;
  };

  return { handleLogin };
};
