import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { AxiosErrorResponse } from "@/shared/types/axioxError";
import { UsePermitMutationOptions } from "@/shared/types/queryOptions";

import { PaymentConfirmRequest, PaymentConfirmResponse } from "./types";

/** 결제 승인 API */
export const usePaymentConfirmMutation = (
  options?: UsePermitMutationOptions<
    PaymentConfirmResponse,
    AxiosErrorResponse,
    PaymentConfirmRequest
  >,
) => {
  return useMutation({
    mutationFn: (params) =>
      instance
        .post<PaymentConfirmResponse>(API_URL.PAYMENT.CONFIRM, params)
        .then((res) => res.data),
    ...options,
  });
};
