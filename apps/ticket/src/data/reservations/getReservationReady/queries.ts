import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import {
  OptionsObject,
  PermitQueryOptions,
  UsePermitQueryOptions,
} from "@/shared/types/queryOptions";

import { RESERVATION_QUERY_KEYS } from "../queryKeys";
import { ReservationReadyResponse } from "./types";

/** 예약 조회 API */
export const reservationReadyOptions = (): PermitQueryOptions<ReservationReadyResponse> => {
  return {
    queryKey: [RESERVATION_QUERY_KEYS.READY],
    queryFn: () => {
      return instance
        .get<ReservationReadyResponse>(API_URL.RESERVATION.READY)
        .then((res) => res.data);
    },
    // TODO: 매 조회마다 최신 정보를 조회하도록 staleTime: 0 으로 설정하기 (SESSION ID 때문)
  };
};

export const useReservationReadyQuery = ({
  options,
}: OptionsObject<UsePermitQueryOptions<ReservationReadyResponse>>) => {
  return useQuery({
    ...reservationReadyOptions(),
    ...options,
  });
};
