import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import {
  PermitQueryOptions,
  UsePermitQueryOptions,
  UsePermitSuspenseQueryOptions,
} from "@/shared/types/queryOptions";

import { EVENT_QUERY_KEYS } from "../queryKeys";
import { EventsResponse } from "./types";

/** 행사 전체 조회 API */
export const eventsOptions = (): PermitQueryOptions<EventsResponse> => {
  return {
    queryKey: [EVENT_QUERY_KEYS.LIST],
    queryFn: () => {
      return instance.get<EventsResponse>(API_URL.EVENT.LIST).then((res) => res.data);
    },
  };
};

export const useEventsQuery = (options?: UsePermitQueryOptions<EventsResponse>) => {
  return useQuery({
    ...eventsOptions(),
    ...options,
  });
};

export const useEventsSuspenseQuery = (options?: UsePermitSuspenseQueryOptions<EventsResponse>) => {
  return useSuspenseQuery({
    ...eventsOptions(),
    ...options,
  });
};
