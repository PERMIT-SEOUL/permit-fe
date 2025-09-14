import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";
import { AxiosErrorResponse } from "@/shared/types/axioxError";
import { UsePermitMutationOptions } from "@/shared/types/queryOptions";

/** 행사 타임테이블 좋아요 삭제 API */
export const useTimetableUnlikeMutation = (
  blockId: string,
  options?: UsePermitMutationOptions<null, AxiosErrorResponse, void>,
) => {
  return useMutation({
    mutationFn: () =>
      instance
        .delete(getPathUrl(API_URL.EVENT.TIMETABLE_UNLIKE, { blockId }))
        .then((res) => res.data),
    ...options,
  });
};
