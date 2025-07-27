import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";
import {
  OptionsObject,
  PermitQueryOptions,
  UsePermitQueryOptions,
} from "@/shared/types/queryOptions";

import { EVENT_QUERY_KEYS } from "../queryKeys";
import { EventTicketsParams, EventTicketsResponse } from "./types";

/** 행사 티켓 정보 조회 API */
export const eventTicketsOptions = (
  params: EventTicketsParams,
): PermitQueryOptions<EventTicketsResponse> => {
  return {
    queryKey: [EVENT_QUERY_KEYS.TICKETS, params.eventId],
    queryFn: () => {
      const url = getPathUrl(API_URL.EVENT.TICKETS, { eventId: params.eventId });

      return instance.get<EventTicketsResponse>(url).then((res) => res.data);
    },
  };
};

export const useEventTicketsQuery = ({
  eventId,
  options,
}: EventTicketsParams & OptionsObject<UsePermitQueryOptions<EventTicketsResponse>>) => {
  return useQuery({
    ...eventTicketsOptions({ eventId }),
    ...options,
  });
};
