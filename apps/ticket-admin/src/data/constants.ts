export const API_URL = {
  USER: {
    /** 액세스토큰 재발급 API */
    REISSUE_ACCESS_TOKEN: "/api/users/reissue",
  },

  ADMIN: {
    /** 접근 권한 검증 API */
    VALIDATE: "/api/admin/validate",
    /** 게스트 전체 조회/생성 API */
    GUESTS: "/api/admin/guests",
    /** 게스트 티켓 생성 API */
    GUEST_TICKETS: "/api/admin/guests/tickets",
    /** 이벤트 리스트 조회/생성/수정 API */
    EVENTS: "/api/admin/events",
    /** 이벤트 상세 조회 API */
    EVENT_DETAIL: "/api/admin/events/:eventId/details",
    /** 행사 티켓 라운드+타입 전체 조회/생성 API */
    TICKETS: "/api/admin/tickets/:eventId",
    /** 행사 티켓 라운드+타입 상세 조회 API */
    TICKETS_DETAIL: "/api/admin/tickets/details/:ticketRoundId",
    /** 행사 티켓 라운드+타입 수정 API */
    TICKETS_UPDATE: "/api/admin/tickets",
    /** 행사 티켓 라운드 삭제 API */
    DELETE_TICKET_ROUND: "/api/admin/tickets/rounds/:ticketRoundId",
    /** 행사 티켓 타입 삭제 API */
    DELETE_TICKET_TYPE: "/api/admin/tickets/types/:ticketTypeId",
    /** 미디어 업로드 presigned URL 발급 API */
    PRESIGNED_URLS: "/api/admin/images/url",
  },
} as const;
