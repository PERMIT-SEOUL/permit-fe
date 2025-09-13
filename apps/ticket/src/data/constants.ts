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
    /** 회원 티켓 조회 API */
    TICKETS: "/api/tickets/user",
    /** 회원 정보 조회, 수정 API */
    INFO: "/api/users",
    /** 이메일 중복 체크 API */
    EMAIL_CHECK: "/api/users/email-check",
  },

  // 행사 관련 API
  EVENT: {
    /** 행사 전체 조회 API */
    LIST: "/api/events",
    /** 행사 상세 정보 조회 API */
    DETAIL: "/api/events/detail/:eventId",
    /** 행사 티켓 정보 조회 API */
    TICKETS: "/api/tickets/:eventId",
    /** 행사 타임테이블 정보 조회 API */
    TIMETABLES: "/api/events/:eventId/timetables",
    /** 행사 타임테이블 상세 정보 조회 API */
    TIMETABLE_DETAIL: "/api/events/timetables/:blockId",
    /** 행사 타임테이블 좋아요 생성 API */
    TIMETABLE_LIKE: "/api/events/timetables/likes/:blockId",
    /** 행사 타임테이블 좋아요 삭제 API */
    TIMETABLE_UNLIKE: "/api/events/timetables/likes/:blockId",
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
    /** 결제 취소 API */
    CANCEL: "/api/payments/cancel",
  },

  // 쿠폰 관련 API
  COUPON: {
    /** 할인 쿠폰 검증 API */
    VALIDATE: "/api/coupons/validate/:eventId",
  },
} as const;
