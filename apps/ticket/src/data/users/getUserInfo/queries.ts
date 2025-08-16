import { useSuspenseQuery } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { PermitQueryOptions, UsePermitSuspenseQueryOptions } from "@/shared/types/queryOptions";

import { USER_QUERY_KEYS } from "../queryKeys";
import { UserInfo } from "./types";

/** 회원 정보 조회 API */
export const userInfoOptions = (): PermitQueryOptions<UserInfo> => {
  return {
    queryKey: [USER_QUERY_KEYS.INFO],
    queryFn: () => {
      return instance.get<UserInfo>(API_URL.USER.INFO).then((res) => res.data);
    },
  };
};

export const useUserInfoSuspenseQuery = (options?: UsePermitSuspenseQueryOptions<UserInfo>) => {
  return useSuspenseQuery({
    ...userInfoOptions(),
    ...options,
  });
};
