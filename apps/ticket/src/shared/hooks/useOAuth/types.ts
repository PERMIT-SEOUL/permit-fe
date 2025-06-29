import { ObjectValues } from "@/shared/types/utils";

export const SOCIAL_LOGIN_TYPE = {
  KAKAO: "KAKAO",
  GOOGLE: "GOOGLE",
} as const;

export type SocialLoginType = ObjectValues<typeof SOCIAL_LOGIN_TYPE>;
