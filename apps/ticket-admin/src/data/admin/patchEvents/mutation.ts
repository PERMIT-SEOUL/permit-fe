import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";

export type EventRequest = {
  eventId: number;
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
  venue: string;
  lineup?: string;
  details?: string;
  images: {
    imageUrl: string;
  }[];
  minAge: number;
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
      const { data } = await instance.patch<EventResponse>(API_URL.ADMIN.EVENTS, params);

      return data;
    },
    ...options,
  });
};
