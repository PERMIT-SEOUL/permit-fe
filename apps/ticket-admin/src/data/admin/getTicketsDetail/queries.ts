import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";
import { useSuspenseQuery } from "@/shared/hooks/useSuspenseQuery";
import {
  OptionsObject,
  PermitQueryOptions,
  UsePermitQueryOptions,
  UsePermitSuspenseQueryOptions,
} from "@/shared/types/queryOptions";

import { ADMIN_QUERY_KEYS } from "../queryKeys";
import { TicketsDetailParams, TicketsDetailResponse } from "./types";

/** 행사 티켓 라운드+타입 상세 조회 API */
export const ticketsDetailOptions = (
  params: TicketsDetailParams,
): PermitQueryOptions<TicketsDetailResponse> => {
  return {
    queryKey: [ADMIN_QUERY_KEYS.TICEKTS_DETAIL, params.ticketRoundId],
    queryFn: () => {
      const url = getPathUrl(API_URL.ADMIN.TICKETS_DETAIL, { ticketRoundId: params.ticketRoundId });

      return instance.get<TicketsDetailResponse>(url).then((res) => res.data);
    },
  };
};

/** 행사 티켓 라운드+타입 상세 조회 Query */
export const useTicketsDetailQuery = ({
  ticketRoundId,
  options,
}: TicketsDetailParams & OptionsObject<UsePermitQueryOptions<TicketsDetailResponse>>) => {
  return useQuery({
    ...ticketsDetailOptions({ ticketRoundId }),
    ...options,
  });
};

/** 행사 티켓 라운드+타입 상세 조회 Suspense Query */
export const useTicketsDetailSuspenseQuery = ({
  ticketRoundId,
  options,
}: TicketsDetailParams & OptionsObject<UsePermitSuspenseQueryOptions<TicketsDetailResponse>>) => {
  return useSuspenseQuery({
    ...ticketsDetailOptions({ ticketRoundId }),
    ...options,
  });
};
