const queryKeyPrefix = "admin_";

export const ADMIN_QUERY_KEYS = {
  GUESTS: `${queryKeyPrefix}guests`,
  EVENTS: `${queryKeyPrefix}events`,
  EVENT_DETAIL: `${queryKeyPrefix}event_detail`,
  TICEKTS: `${queryKeyPrefix}tickets`,
  TICEKTS_DETAIL: `${queryKeyPrefix}tickets_detail`,
  COUPONS: `${queryKeyPrefix}coupons`,
  USER: `${queryKeyPrefix}user`,
} as const;
