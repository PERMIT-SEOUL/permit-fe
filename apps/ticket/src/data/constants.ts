export const API_URL = {
  USER: {
    /** 회원가입 API */
    SIGNUP: "/api/users/signup",
    /** 로그인 API */
    LOGIN: "/api/users/login",
    /** 로그아웃 API */
    LOGOUT: "/api/users/logout",
    /** 액세스토큰 재발급 API */
    REISSUE_ACCESS_TOKEN: "/api/users/reissue",
  },

  // 행사 관련 API
  EVENT: {
    /** 행사 전체 조회 API */
    LIST: "/api/events",
    /** 행사 상세 정보 조회 API */
    DETAIL: "/api/events/detail/:eventId",
    /** 행사 티켓 정보 조회 API */
    TICKETS: "/api/tickets/:eventId",
  },

  // 예매 관련 API
  RESERVATION: {
    /** 예약 생성 API */
    READY: "/api/reservations/ready",
  },

  // 결제 관련 API
  PAYMENT: {
    /** 결제 승인 API */
    CONFIRM: "/api/payments/confirm",
  },
} as const;
