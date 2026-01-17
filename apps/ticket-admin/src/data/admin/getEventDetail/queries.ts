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
import { EventDetailParams, EventDetailResponse } from "./types";

/** 이벤트 상세 조회 API */
export const eventDetailOptions = (
  params: EventDetailParams,
): PermitQueryOptions<EventDetailResponse> => {
  return {
    queryKey: [ADMIN_QUERY_KEYS.EVENT_DETAIL, params.eventId],
    queryFn: () => {
      const url = getPathUrl(API_URL.ADMIN.EVENT_DETAIL, { eventId: params.eventId });

      return instance.get<EventDetailResponse>(url).then((res) => res.data);
    },
  };
};

/** 이벤트 상세 조회 Query */
export const useEventDetailQuery = ({
  eventId,
  options,
}: EventDetailParams & OptionsObject<UsePermitQueryOptions<EventDetailResponse>>) => {
  return useQuery({
    ...eventDetailOptions({ eventId }),
    ...options,
  });
};

/** 이벤트 상세 조회 Suspense Query */
export const useEventDetailSuspenseQuery = ({
  eventId,
  options,
}: EventDetailParams & OptionsObject<UsePermitSuspenseQueryOptions<EventDetailResponse>>) => {
  return useSuspenseQuery({
    ...eventDetailOptions({ eventId }),
    ...options,
  });
};
