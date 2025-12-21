import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";
import {
  OptionsObject,
  PermitQueryOptions,
  UsePermitQueryOptions,
} from "@/shared/types/queryOptions";

import { GuestTicketDoorValidationParams, GuestTicketDoorValidationResponse } from "./types";

/** 도어용 게스트 티켓 유효성 검증 API */
export const guestTicketDoorValidationOptions = (
  params: GuestTicketDoorValidationParams,
): PermitQueryOptions<GuestTicketDoorValidationResponse> => {
  const url = getPathUrl(API_URL.TICKET.GUEST_VALIDATION, { ticketCode: params.ticketCode });

  return {
    queryKey: [url],
    queryFn: () => {
      return instance.get<GuestTicketDoorValidationResponse>(url).then((res) => res.data);
    },
  };
};

export const useGuestTicketDoorValidationQuery = ({
  ticketCode,
  options,
}: GuestTicketDoorValidationParams &
  OptionsObject<UsePermitQueryOptions<GuestTicketDoorValidationResponse>>) => {
  return useQuery({
    ...guestTicketDoorValidationOptions({ ticketCode }),
    ...options,
  });
};
