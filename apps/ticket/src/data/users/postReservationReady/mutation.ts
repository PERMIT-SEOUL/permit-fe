import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";

type ReservationReadyRequest = {
  eventId: number;
  orderId: string;
  couponCode?: string;
  totalAmount: number;
  ticketTypeInfos: {
    id: number;
    count: number;
  };
};

type ReservationReadyResponse = {
  code: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export type ReservatinoMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, ReservationReadyRequest>,
  "mutationFn"
> & {
  onSuccess?: (data: TData) => void;
};

export const useLoginMutation = (
  options?: ReservatinoMutationOptions<ReservationReadyResponse>,
) => {
  return useMutation({
    mutationFn: async (params: ReservationReadyRequest) => {
      const { data } = await instance.post<ReservationReadyResponse>(
        API_URL.RESERVATION.READY,
        params,
      );

      return data;
    },
    ...options,
  });
};
