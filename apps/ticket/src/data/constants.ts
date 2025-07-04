export const API_URL = {
  /** 회원가입 API  */
  SIGNUP: "/api/users/signup",
  /** 로그인 API */
  LOGIN: "/api/users/login",
  /** 로그아웃 API */
  LOGOUT: "/api/users/logout",
  /** 액세스토큰 재발급 API */
  REISSUE_ACCESS_TOKEN: "/api/users/reissue",
} as const;
