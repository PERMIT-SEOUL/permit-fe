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
        // MEMO: guest 티켓 생성 API는 처리 시간이 길어질 수 있어 타임아웃을 60초로 설정
        // 추후 성준이가 비동기로 메일 보내도록 변경하면 제거할 것
        { timeout: 60_000 },
      );

      return data;
    },
    ...options,
  });
};
