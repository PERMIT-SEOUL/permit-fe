import { useQuery } from "@tanstack/react-query";

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
import { EventsResponse } from "./types";

/** 이벤트 리스트 조회 API */
export const eventsListOptions = (): PermitQueryOptions<EventsResponse> => {
  return {
    queryKey: [ADMIN_QUERY_KEYS.EVENTS],
    queryFn: () => {
      const url = API_URL.ADMIN.EVENTS;

      return instance.get<EventsResponse>(url).then((res) => res.data);
    },
  };
};

/** 이벤트 리스트 조회 Query */
export const useEventsListQuery = ({
  options,
}: OptionsObject<UsePermitQueryOptions<EventsResponse>>) => {
  return useQuery({
    ...eventsListOptions(),
    ...options,
  });
};

/** 이벤트 리스트 조회 Suspense Query */
export const useEventsListSuspenseQuery = ({
  options,
}: OptionsObject<UsePermitSuspenseQueryOptions<EventsResponse>>) => {
  return useSuspenseQuery({
    ...eventsListOptions(),
    ...options,
  });
};
