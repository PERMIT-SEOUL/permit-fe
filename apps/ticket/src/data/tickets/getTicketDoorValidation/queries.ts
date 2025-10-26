import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";
import {
  OptionsObject,
  PermitQueryOptions,
  UsePermitQueryOptions,
} from "@/shared/types/queryOptions";

import { TicketDoorValidationParams, TicketDoorValidationResponse } from "./types";

/** 도어용 유저 티켓 유효성 검증 API */
export const ticketDoorValidationOptions = (
  params: TicketDoorValidationParams,
): PermitQueryOptions<TicketDoorValidationResponse> => {
  const url = getPathUrl(API_URL.TICKET.VALIDATION, { ticketCode: params.ticketCode });

  return {
    queryKey: [url],
    queryFn: () => {
      return instance.get<TicketDoorValidationResponse>(url).then((res) => res.data);
    },
  };
};

export const useTicketDoorValidationQuery = ({
  ticketCode,
  options,
}: TicketDoorValidationParams &
  OptionsObject<UsePermitQueryOptions<TicketDoorValidationResponse>>) => {
  return useQuery({
    ...ticketDoorValidationOptions({ ticketCode }),
    ...options,
  });
};
