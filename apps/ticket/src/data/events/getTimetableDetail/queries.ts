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
import { TimetableDetail, TimetableDetailParams } from "./types";

/** 행사 타임테이블 상세 조회 API */
export const timetableDetailOptions = (
  params: TimetableDetailParams,
): PermitQueryOptions<TimetableDetail> => {
  const url = getPathUrl(API_URL.EVENT.TIMETABLE_DETAIL, { blockId: params.blockId });

  return {
    queryKey: [EVENT_QUERY_KEYS.TIMETABLE_DETAIL, params.blockId],
    queryFn: () => {
      return instance.get<TimetableDetail>(url).then((res) => res.data);
    },
  };
};

export const useTimetableDetailQuery = ({
  blockId,
  options,
}: TimetableDetailParams & OptionsObject<UsePermitQueryOptions<TimetableDetail>>) => {
  return useQuery({
    ...timetableDetailOptions({ blockId }),
    ...options,
  });
};

export const useTimetableDetailSuspenseQuery = ({
  blockId,
  options,
}: TimetableDetailParams & OptionsObject<UsePermitSuspenseQueryOptions<TimetableDetail>>) => {
  return useSuspenseQuery({
    ...timetableDetailOptions({ blockId }),
    ...options,
  });
};
