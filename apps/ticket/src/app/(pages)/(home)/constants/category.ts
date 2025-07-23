import { ObjectValues } from "@/shared/types/utils";

export const CATEGORIES = {
  ALL: "all",
  PERMIT: "permit",
  CEILING_SERVICE: "ceilingservice",
  FESTIVAL: "festival",
} as const;

export type CategoryType = ObjectValues<typeof CATEGORIES>;

export const CATEGORY_LABELS = {
  [CATEGORIES.ALL]: "ALL",
  [CATEGORIES.PERMIT]: "Permit",
  [CATEGORIES.CEILING_SERVICE]: "ceilingservice",
  [CATEGORIES.FESTIVAL]: "Festival",
} as const;
