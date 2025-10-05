export const API_URL = {
  ADMIN: {
    /** 게스트 전체 조회 API */
    GUESTS: "/api/admin/guests",
    /** 이벤트 리스트 조회/생성 API */
    EVENTS: "/api/admin/events",
    /** 이벤트 상세 조회 API */
    EVENT_DETAIL: "/api/admin/events/:eventId/details",
  },
} as const;
