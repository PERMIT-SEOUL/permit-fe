const queryKeyPrefix = "admin_";

export const ADMIN_QUERY_KEYS = {
  GUESTS: `${queryKeyPrefix}guests`,
  EVENTS: `${queryKeyPrefix}events`,
  EVENT_DETAIL: `${queryKeyPrefix}event_detail`,
} as const;
