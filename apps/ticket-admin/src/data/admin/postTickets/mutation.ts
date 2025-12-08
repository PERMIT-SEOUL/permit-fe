import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";

export type TicketsRequest = {
  ticketRoundName: string;
  ticketRoundSalesStartDate: string; // yyyy.mm.dd hh:mm
  ticketRoundSalesEndDate: string;
  ticketTypes: {
    name: string;
    price: number;
    totalCount: number;
    startDate: string; // yyyy.mm.dd hh:mm
    endDate: string;
  }[];
};

type TicketsResponse = {
  data: null;
};

export type TicketsMutationOptions<TData> = {
  eventId: number;
  options?: Omit<UseMutationOptions<TData, Error, TicketsRequest>, "mutationFn"> & {
    onSuccess?: (data: TData) => void;
  };
};

export const useTicketsMutation = ({
  eventId,
  options,
}: TicketsMutationOptions<TicketsResponse>) => {
  const url = getPathUrl(API_URL.ADMIN.TICKETS, { eventId });

  return useMutation({
    mutationFn: async (params: TicketsRequest) => {
      const { data } = await instance.post<TicketsResponse>(url, params);

      return data;
    },
    ...options,
  });
};
