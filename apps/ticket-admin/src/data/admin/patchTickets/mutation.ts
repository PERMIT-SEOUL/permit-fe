import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";

export type PatchTicketsRequest = {
  ticketRoundId: number;
  ticketRoundName: string;
  ticketRoundSalesStartDate: string; // yyyy.mm.dd hh:mm
  ticketRoundSalesEndDate: string;
  ticketTypes: {
    id: number | null; // 기존 티켓이면 ID 있음
    name: string;
    price: number;
    totalCount: number;
    startDate: string; // yyyy.mm.dd hh:mm
    endDate: string;
  }[];
};

type PatchTicketsResponse = {
  data: null;
};

export type PatchTicketsMutationOptions<TData> = {
  options?: Omit<UseMutationOptions<TData, Error, PatchTicketsRequest>, "mutationFn"> & {
    onSuccess?: (data: TData) => void;
  };
};

export const usePatchTicketsMutation = ({
  options,
}: PatchTicketsMutationOptions<PatchTicketsResponse>) => {
  const url = API_URL.ADMIN.TICKETS_UPDATE;

  return useMutation({
    mutationFn: async (params: PatchTicketsRequest) => {
      const { data } = await instance.patch<PatchTicketsResponse>(url, params);

      return data;
    },
    ...options,
  });
};
