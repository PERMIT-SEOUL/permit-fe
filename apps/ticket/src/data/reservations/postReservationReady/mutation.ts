import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { AxiosErrorResponse } from "@/shared/types/axioxError";
import { UsePermitMutationOptions } from "@/shared/types/queryOptions";

import { ReservationReadyParams, ReservationReadyResponse } from "./types";

/** 예약 생성 API */
export const useReservationReadyMutation = (
  options?: UsePermitMutationOptions<
    ReservationReadyResponse,
    AxiosErrorResponse,
    ReservationReadyParams
  >,
) => {
  return useMutation({
    mutationFn: (params) =>
      instance
        .post<ReservationReadyResponse>(API_URL.RESERVATION.READY, params)
        .then((res) => res.data),
    ...options,
  });
};
