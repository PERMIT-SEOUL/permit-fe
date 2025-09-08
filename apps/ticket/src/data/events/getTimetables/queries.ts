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

import { EVENT_QUERY_KEYS } from "../queryKeys";
import { TimetablesParams, TimetablesResponse } from "./types";

/** 행사 타임테이블 리스트 조회 API */
export const timetablesOptions = (
  params: TimetablesParams,
): PermitQueryOptions<TimetablesResponse> => {
  const url = getPathUrl(API_URL.EVENT.TIMETABLES, { eventId: params.eventId });

  return {
    queryKey: [EVENT_QUERY_KEYS.TIMETABLES, params.eventId],
    queryFn: () => {
      return instance.get<TimetablesResponse>(url).then((res) => res.data);
    },
  };
};

export const useTimetablesQuery = ({
  eventId,
  options,
}: TimetablesParams & OptionsObject<UsePermitQueryOptions<TimetablesResponse>>) => {
  return useQuery({
    ...timetablesOptions({ eventId }),
    ...options,
  });
};

export const useTimetablesSuspenseQuery = ({
  eventId,
  options,
}: TimetablesParams & OptionsObject<UsePermitSuspenseQueryOptions<TimetablesResponse>>) => {
  return useSuspenseQuery({
    ...timetablesOptions({ eventId }),
    ...options,
  });
};
