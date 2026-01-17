import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";
import { useSuspenseQuery } from "@/shared/hooks/useSuspenseQuery";
import {
  OptionsObject,
  PermitQueryOptions,
  UsePermitQueryOptions,
  UsePermitSuspenseQueryOptions,
} from "@/shared/types/queryOptions";

import { ADMIN_QUERY_KEYS } from "../queryKeys";
import { GetCouponsParams, GetCouponsResponse } from "./types";

/** 쿠폰 리스트 조회 API */
export const couponsOptions = (
  params: GetCouponsParams,
): PermitQueryOptions<GetCouponsResponse> => {
  return {
    queryKey: [ADMIN_QUERY_KEYS.COUPONS, params.eventId],
    queryFn: () => {
      const url = getPathUrl(API_URL.ADMIN.COUPONS_LIST, { eventId: params.eventId });

      return instance.get<GetCouponsResponse>(url).then((res) => res.data);
    },
  };
};

/** 쿠폰 리스트 조회 Query */
export const useCouponsQuery = ({
  eventId,
  options,
}: GetCouponsParams & OptionsObject<UsePermitQueryOptions<GetCouponsResponse>>) => {
  return useQuery({
    ...couponsOptions({ eventId }),
    ...options,
  });
};

/** 쿠폰 리스트 조회 Suspense Query */
export const useCouponsSuspenseQuery = ({
  eventId,
  options,
}: GetCouponsParams & OptionsObject<UsePermitSuspenseQueryOptions<GetCouponsResponse>>) => {
  return useSuspenseQuery({
    ...couponsOptions({ eventId }),
    ...options,
  });
};
