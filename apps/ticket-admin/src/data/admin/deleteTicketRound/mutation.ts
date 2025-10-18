import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";

export type DeleteTicketRoundRequest = {
  ticketRoundId: number;
};

type DeleteTicketRoundResponse = {
  data: null;
};

export type DeleteTicketRoundMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, DeleteTicketRoundRequest>,
  "mutationFn"
> & {
  onSuccess?: (data: TData) => void;
};

export const useDeleteTicketRoundMutation = (
  options?: DeleteTicketRoundMutationOptions<DeleteTicketRoundResponse>,
) => {
  return useMutation({
    mutationFn: async (params: DeleteTicketRoundRequest) => {
      const { data } = await instance.delete<DeleteTicketRoundResponse>(
        getPathUrl(API_URL.ADMIN.DELETE_TICKET_ROUND, { ticketRoundId: params.ticketRoundId }),
      );

      return data;
    },
    ...options,
  });
};
