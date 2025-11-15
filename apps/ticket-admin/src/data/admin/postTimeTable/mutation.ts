import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";

export type PostTimeTableRequest = {
  /** 시작시간(2025-11-03 16:30) */
  timetableStartAt: string;
  /** 종료시간(2025-11-03 16:30) */
  timetableEndAt: string;
  /** 노션 database 데이터소스 아이디 */
  notionTimetableDataSourceId: string;
  /** 노션 category 데이터소스 아이디 */
  notionCategoryDataSourceId: string;
  /** 노션 stage 데이터소스 아이디 */
  notionStageDataSourceId: string;
};

type TimeTableResponse = {
  data: null;
};

export type PostTimeTableMutationOptions<TData> = {
  eventId: number;
  options?: Omit<UseMutationOptions<TData, Error, PostTimeTableRequest>, "mutationFn"> & {
    onSuccess?: (data: TData) => void;
  };
};

export const usePostTimeTableInitial = ({
  eventId,
  options,
}: PostTimeTableMutationOptions<TimeTableResponse>) => {
  const url = getPathUrl(API_URL.ADMIN.TIME_TABLE_INITIAL, { eventId });

  return useMutation({
    mutationFn: async () => {
      const { data } = await instance.post<TimeTableResponse>(url);

      return data;
    },
    ...options,
  });
};
