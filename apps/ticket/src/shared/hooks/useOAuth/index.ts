import { safeLocalStorage } from "@/lib/storage";
import { SOCIAL_LOGIN_TYPE_KEY } from "@/shared/constants/storage";

import { GOOGLE_LOGIN_URL, KAKAO_LOGIN_URL } from "./constants";
import { SOCIAL_LOGIN_TYPE, SocialLoginType } from "./types";

export const useOAuth = () => {
  const handleLogin = (socialType: SocialLoginType) => {
    if (socialType === SOCIAL_LOGIN_TYPE.KAKAO) {
      kakaoLogin();
    } else if (socialType === SOCIAL_LOGIN_TYPE.GOOGLE) {
      googleLogin();
    }

    safeLocalStorage.set(SOCIAL_LOGIN_TYPE_KEY, socialType);
  };

  const kakaoLogin = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

  const googleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };

  return { handleLogin };
};
