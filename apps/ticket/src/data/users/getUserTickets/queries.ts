import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { useSuspenseQuery } from "@/shared/hooks/useSuspenseQuery";
import { PermitQueryOptions, UsePermitSuspenseQueryOptions } from "@/shared/types/queryOptions";

import { USER_QUERY_KEYS } from "../queryKeys";
import { UserTicketsResponse } from "./types";

/** 회원 티켓 조회 API */
export const userTicketsOptions = (): PermitQueryOptions<UserTicketsResponse> => {
  return {
    queryKey: [USER_QUERY_KEYS.TICKETS],
    queryFn: () => {
      return instance.get<UserTicketsResponse>(API_URL.USER.TICKETS).then((res) => res.data);
    },
  };
};

/** 회원 티켓 조회 Suspense Query */
export const useUserTicketsSuspenseQuery = (
  options?: UsePermitSuspenseQueryOptions<UserTicketsResponse>,
) => {
  return useSuspenseQuery({
    ...userTicketsOptions(),
    ...options,
  });
};
