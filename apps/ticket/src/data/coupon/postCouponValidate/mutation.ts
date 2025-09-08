import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";
import { AxiosErrorResponse } from "@/shared/types/axioxError";
import { UsePermitMutationOptions } from "@/shared/types/queryOptions";

import { CouponValidateParams, CouponValidateResponse } from "./types";

/** 할인 쿠폰 검증 API */
export const useCouponValidateMutation = (
  eventId: string,
  options?: UsePermitMutationOptions<
    CouponValidateResponse,
    AxiosErrorResponse,
    CouponValidateParams
  >,
) => {
  return useMutation({
    mutationFn: (params) =>
      instance
        .post<CouponValidateResponse>(getPathUrl(API_URL.COUPON.VALIDATE, { eventId }), params)
        .then((res) => res.data),
    ...options,
  });
};
