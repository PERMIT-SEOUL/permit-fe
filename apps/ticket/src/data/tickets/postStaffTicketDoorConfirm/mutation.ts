import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { AxiosErrorResponse } from "@/shared/types/axioxError";
import { UsePermitMutationOptions } from "@/shared/types/queryOptions";

import { StaffTicketConfirmRequest } from "./types";

/** 도어용 유저 티켓 카메라 확인 API */
export const useUserTicketCameraConfirmMutation = (
  options?: UsePermitMutationOptions<null, AxiosErrorResponse, StaffTicketConfirmRequest>,
) => {
  return useMutation({
    mutationFn: (params) =>
      instance.post(API_URL.TICKET.CAMERA_USER_TICKET_CONFIRM, params).then((res) => res.data),
    ...options,
  });
};
