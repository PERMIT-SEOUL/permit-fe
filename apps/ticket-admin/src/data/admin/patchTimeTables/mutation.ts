import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";

export type TimeTableRequest = {
  timetableId: number;
  timetableStartAt: string;
  timetableEndAt: string;
  notionTimetableDataSourceId: string;
  notionCategoryDataSourceId: string;
  notionStageDataSourceId: string;
};

type TimeTableResponse = {
  data: null;
};

export type TimeTableOptions<TData> = Omit<
  UseMutationOptions<TData, Error, TimeTableRequest>,
  "mutationFn"
> & {
  onSuccess?: (data: TData) => void;
};

export const useTimeTableMutation = (options?: TimeTableOptions<TimeTableResponse>) => {
  return useMutation({
    mutationFn: async (params: TimeTableRequest) => {
      const url = getPathUrl(API_URL.ADMIN.TIME_TABLE_UPDATE, { timetableId: params.timetableId });

      const { data } = await instance.patch<TimeTableResponse>(url, {
        timetableStartAt: params.timetableStartAt,
        timetableEndAt: params.timetableEndAt,
        notionTimetableDataSourceId: params.notionTimetableDataSourceId,
        notionCategoryDataSourceId: params.notionCategoryDataSourceId,
        notionStageDataSourceId: params.notionStageDataSourceId,
      });

      return data;
    },
    ...options,
  });
};
