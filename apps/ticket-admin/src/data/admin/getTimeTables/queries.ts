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
import { TimeTableParams, TimeTableResponse } from "./types";

/** 행사 타임테이블 조회 API */
export const timeTableOptions = (
  params: TimeTableParams,
): PermitQueryOptions<TimeTableResponse | null> => {
  return {
    queryKey: [ADMIN_QUERY_KEYS.TICEKTS, params.eventId],
    queryFn: () => {
      const url = getPathUrl(API_URL.ADMIN.TIME_TABLE, { eventId: params.eventId });

      return instance
        .get<TimeTableResponse>(url)
        .then((res) => res.data)
        .catch(() => null);
    },
  };
};

/** 행사 타임테이블 조회 Query */
export const useTimeTableQuery = ({
  eventId,
  options,
}: TimeTableParams & OptionsObject<UsePermitQueryOptions<TimeTableResponse | null>>) => {
  return useQuery({
    ...timeTableOptions({ eventId }),
    ...options,
  });
};

/** 행사 타임테이블 조회 Suspense Query */
export const useTimeTableSuspenseQuery = ({
  eventId,
  options,
}: TimeTableParams & OptionsObject<UsePermitSuspenseQueryOptions<TimeTableResponse | null>>) => {
  return useSuspenseQuery({
    ...timeTableOptions({ eventId }),
    ...options,
  });
};
