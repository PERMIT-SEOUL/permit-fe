import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";

export type DeleteTicketTypeRequest = {
  ticketTypeId: number;
};

type DeleteTicketTypeResponse = {
  data: null;
};

export type DeleteTicketTypeMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, DeleteTicketTypeRequest>,
  "mutationFn"
> & {
  onSuccess?: (data: TData) => void;
};

export const useDeleteTicketTypeMutation = (
  options?: DeleteTicketTypeMutationOptions<DeleteTicketTypeResponse>,
) => {
  return useMutation({
    mutationFn: async (params: DeleteTicketTypeRequest) => {
      const { data } = await instance.delete<DeleteTicketTypeResponse>(
        getPathUrl(API_URL.ADMIN.DELETE_TICKET_TYPE, { ticketTypeId: params.ticketTypeId }),
      );

      return data;
    },
    ...options,
  });
};
