import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";
import {
  OptionsObject,
  PermitQueryOptions,
  UsePermitQueryOptions,
  UsePermitSuspenseQueryOptions,
} from "@/shared/types/queryOptions";

import { ADMIN_QUERY_KEYS } from "../queryKeys";
import { TicketsParams, TicketsResponse } from "./types";

/** 행사 티켓 라운드+타입 전체 조회 API */
export const ticketsOptions = (params: TicketsParams): PermitQueryOptions<TicketsResponse> => {
  return {
    queryKey: [ADMIN_QUERY_KEYS.TICEKTS, params.eventId],
    queryFn: () => {
      const url = getPathUrl(API_URL.ADMIN.TICKETS, { eventId: params.eventId });

      return instance.get<TicketsResponse>(url).then((res) => res.data);
    },
  };
};

/** 행사 티켓 라운드+타입 전체 조회 Query */
export const useTicketsQuery = ({
  eventId,
  options,
}: TicketsParams & OptionsObject<UsePermitQueryOptions<TicketsResponse>>) => {
  return useQuery({
    ...ticketsOptions({ eventId }),
    ...options,
  });
};

/** 행사 티켓 라운드+타입 전체 조회 Suspense Query */
export const useTicketsSuspenseQuery = ({
  eventId,
  options,
}: TicketsParams & OptionsObject<UsePermitSuspenseQueryOptions<TicketsResponse>>) => {
  return useSuspenseQuery({
    ...ticketsOptions({ eventId }),
    ...options,
  });
};
