export const PATH = {
  HOME: "/",
  SIGNUP: "/signup",
  LOGIN: "/login",
  AUTH: "/auth",
  EVENT_DETAIL: "/event/:eventId",
  BOOKING_CONFIRMED: "/event/:eventId/booking/:bookingId/confirmed",
  ORDER: "/order/:orderId",
} as const;
