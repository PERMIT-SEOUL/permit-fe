import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { AxiosErrorResponse } from "@/shared/types/axioxError";
import { UsePermitMutationOptions } from "@/shared/types/queryOptions";

import { GuestTicketConfirmRequest } from "./types";

/** 도어용 게스트 티켓 스텝 확인 API */
export const useGuestTicketStaffConfirmMutation = (
  options?: UsePermitMutationOptions<null, AxiosErrorResponse, GuestTicketConfirmRequest>,
) => {
  return useMutation({
    mutationFn: (params) =>
      instance.post(API_URL.TICKET.GUEST_CONFIRM, params).then((res) => res.data),
    ...options,
  });
};
