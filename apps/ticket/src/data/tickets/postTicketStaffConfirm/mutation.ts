import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { AxiosErrorResponse } from "@/shared/types/axioxError";
import { UsePermitMutationOptions } from "@/shared/types/queryOptions";

import { TicketConfirmRequest } from "./types";

/** 도어용 유저 티켓 스텝 확인 API */
export const useTicketStaffConfirmMutation = (
  options?: UsePermitMutationOptions<null, AxiosErrorResponse, TicketConfirmRequest>,
) => {
  return useMutation({
    mutationFn: (params) => instance.post(API_URL.TICKET.CONFIRM, params).then((res) => res.data),
    ...options,
  });
};
