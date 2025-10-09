export const API_URL = {
  ADMIN: {
    /** 게스트 전체 조회 API */
    GUESTS: "/api/admin/guests",
    /** 이벤트 리스트 조회/생성/수정 API */
    EVENTS: "/api/admin/events",
    /** 이벤트 상세 조회 API */
    EVENT_DETAIL: "/api/admin/events/:eventId/details",
    /** 행사 티켓 라운드+타입 전체 조회/생성 API */
    TICKETS: "/api/admin/tickets/:eventId",
    /** 미디어 업로드 presigned URL 발급 API */
    PRESIGNED_URLS: "/api/admin/images/url",
  },
} as const;
