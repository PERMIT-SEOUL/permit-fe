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
import { EventDetailParams, EventDetailResponse } from "./types";

/** 행사 상세 정보 조회 API */
export const eventDetailOptions = (
  params: EventDetailParams,
): PermitQueryOptions<EventDetailResponse> => {
  return {
    queryKey: [EVENT_QUERY_KEYS.DETAIL, params.eventId],
    queryFn: () => {
      const url = getPathUrl(API_URL.EVENT.DETAIL, { eventId: params.eventId });

      return instance.get<EventDetailResponse>(url).then((res) => res.data);
    },
  };
};

export const useEventDetailQuery = ({
  eventId,
  options,
}: EventDetailParams & OptionsObject<UsePermitQueryOptions<EventDetailResponse>>) => {
  return useQuery({
    ...eventDetailOptions({ eventId }),
    ...options,
  });
};
