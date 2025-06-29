import { safeLocalStorage } from "@/lib/storage";

import { GOOGLE_CLIENT_ID, KAKAO_REST_API_KEY, REDIRECT_URI } from "./constants";
import { SOCIAL_LOGIN_TYPE, SocialLoginType } from "./types";

export const useOAuth = () => {
  const handleLogin = (socialType: SocialLoginType) => {
    if (socialType === SOCIAL_LOGIN_TYPE.KAKAO) {
      kakaoLogin();
    } else if (socialType === SOCIAL_LOGIN_TYPE.GOOGLE) {
      googleLogin();
    }

    safeLocalStorage.set("socialType", socialType);
  };

  const kakaoLogin = () => {
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = kakaoURL;
  };

  const googleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email+profile`;
  };

  return { handleLogin };
};
