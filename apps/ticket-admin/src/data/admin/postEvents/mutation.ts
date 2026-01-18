import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";

export type EventRequest = {
  eventExposureStartDate: string;
  eventExposureStartTime: string;
  eventExposureEndDate: string;
  eventExposureEndTime: string;
  verificationCode: string;
  name: string;
  eventType: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  venue?: string;
  lineup?: string;
  details?: string;
  // TODO: 이미지 등록 스펙에서 제거 (생성에서만 등록 가능)
  images: {
    imageUrl: string;
  }[];
  siteMapImages?: {
    imageUrl: string;
  }[];
  minAge: number;
  ticketRoundName: string;
  roundSalesStartDate: string;
  roundSalesStartTime: string;
  roundSalesEndDate: string;
  roundSalesEndTime: string;
  ticketTypes: {
    ticketName: string;
    price: number;
    ticketCount: number;
    ticketStartDate: string;
    ticketStartTime: string;
    ticketEndDate: string;
    ticketEndTime: string;
  }[];
};

type EventResponse = {
  data: null;
};

export type EventMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, EventRequest>,
  "mutationFn"
> & {
  onSuccess?: (data: TData) => void;
};

export const useEventMutation = (options?: EventMutationOptions<EventResponse>) => {
  return useMutation({
    mutationFn: async (params: EventRequest) => {
      const { data } = await instance.post<EventResponse>(API_URL.ADMIN.EVENTS, params);

      return data;
    },
    ...options,
  });
};
