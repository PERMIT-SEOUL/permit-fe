const phase =
  process.env.NEXT_PUBLIC_ENV === "production"
    ? "www"
    : process.env.NEXT_PUBLIC_ENV === "development"
      ? "dev"
      : "staging";

export const EXTERNAL_PATH = {
  HOME: `https://${phase}.permitseoul.com`,
  LOGIN: `https://${phase}.permitseoul.com/login`,
  TIMETABLE: `https://${phase}.permitseoul.com/event/:eventId/time-table`,
} as const;
