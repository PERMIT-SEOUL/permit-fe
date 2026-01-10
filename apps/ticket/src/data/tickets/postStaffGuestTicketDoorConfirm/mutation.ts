import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { AxiosErrorResponse } from "@/shared/types/axioxError";
import { UsePermitMutationOptions } from "@/shared/types/queryOptions";

import { StaffGuestTicketConfirmRequest } from "./types";

/** 도어용 게스트 티켓 카메라 확인 API */
export const useGuestTicketCameraConfirmMutation = (
  options?: UsePermitMutationOptions<null, AxiosErrorResponse, StaffGuestTicketConfirmRequest>,
) => {
  return useMutation({
    mutationFn: (params) =>
      instance.post(API_URL.TICKET.CAMERA_GUEST_TICKET_CONFIRM, params).then((res) => res.data),
    ...options,
  });
};
