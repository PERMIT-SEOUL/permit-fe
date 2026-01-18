import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { useSuspenseQuery } from "@/shared/hooks/useSuspenseQuery";
import {
  OptionsObject,
  PermitQueryOptions,
  UsePermitQueryOptions,
  UsePermitSuspenseQueryOptions,
} from "@/shared/types/queryOptions";

import { ADMIN_QUERY_KEYS } from "../queryKeys";
import { UserParams, UserResponse } from "./types";

/** 유저 권한 정보 조회 API */
export const userOptions = (params: UserParams): PermitQueryOptions<UserResponse> => {
  return {
    queryKey: [ADMIN_QUERY_KEYS.USER, params.email],
    queryFn: () => {
      const url = queryString.stringifyUrl({
        url: API_URL.ADMIN.USER,
        query: {
          email: params.email,
        },
      });

      return instance.get<UserResponse>(url).then((res) => res.data);
    },
  };
};

/** 유저 권한 정보 조회 Query */
export const useUserQuery = ({
  email,
  options,
}: UserParams & OptionsObject<UsePermitQueryOptions<UserResponse>>) => {
  return useQuery({
    ...userOptions({ email }),
    ...options,
  });
};

/** 행사 티켓 라운드+타입 전체 조회 Suspense Query */
export const useUserSuspenseQuery = ({
  email,
  options,
}: UserParams & OptionsObject<UsePermitSuspenseQueryOptions<UserResponse>>) => {
  return useSuspenseQuery({
    ...userOptions({ email }),
    ...options,
  });
};
