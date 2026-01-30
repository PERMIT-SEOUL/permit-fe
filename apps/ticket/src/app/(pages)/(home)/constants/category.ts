import { ObjectValues } from "@/shared/types/utils";

export const CATEGORIES = {
  ALL: "all",
  PERMIT: "permit",
  CEILING_SERVICE: "ceilingService",
  OLYMPAN: "festival",
} as const;

export type CategoryType = ObjectValues<typeof CATEGORIES>;

export const CATEGORY_LABELS = {
  [CATEGORIES.ALL]: "ALL",
  [CATEGORIES.PERMIT]: "PERMIT",
  [CATEGORIES.CEILING_SERVICE]: "ceiling service",
  [CATEGORIES.OLYMPAN]: "Olympan",
} as const;
