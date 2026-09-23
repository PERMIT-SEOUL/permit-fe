import { ObjectValues } from "@/shared/types/utils";

export const CATEGORIES = {
  ALL: "all",
  CEILING_SERVICE: "ceilingService",
  PERMIT: "permit",
  OLYMPAN: "festival",
} as const;

export type CategoryType = ObjectValues<typeof CATEGORIES>;

export const CATEGORY_LABELS = {
  [CATEGORIES.ALL]: "ALL",
  [CATEGORIES.CEILING_SERVICE]: "ceiling service",
  [CATEGORIES.PERMIT]: "PERMIT",
  [CATEGORIES.OLYMPAN]: "SUNN",
} as const;
