import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";

export type PostGuestTicketsRequest = {
  eventId: number;
  guestTicketList: Array<{
    guestId: number;
    ticketCount: number;
  }>;
};

type PostGuestTicketsResponse = {
  data: null;
};

export type PostGuestTicketsMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, PostGuestTicketsRequest>,
  "mutationFn"
> & {
  onSuccess?: (data: TData) => void;
};

export const usePostGuestTicketsMutation = (
  options?: PostGuestTicketsMutationOptions<PostGuestTicketsResponse>,
) => {
  return useMutation({
    mutationFn: async (params: PostGuestTicketsRequest) => {
      const { data } = await instance.post<PostGuestTicketsResponse>(
        API_URL.ADMIN.GUEST_TICKETS,
        params,
      );

      return data;
    },
    ...options,
  });
};
