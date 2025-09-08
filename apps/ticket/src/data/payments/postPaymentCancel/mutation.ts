import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { AxiosErrorResponse } from "@/shared/types/axioxError";
import { UsePermitMutationOptions } from "@/shared/types/queryOptions";

import { PaymentCancelRequest } from "./types";

/** 결제 취소 API */
export const usePaymentCancelMutation = (
  options?: UsePermitMutationOptions<null, AxiosErrorResponse, PaymentCancelRequest>,
) => {
  return useMutation({
    mutationFn: (params) => instance.post(API_URL.PAYMENT.CANCEL, params).then((res) => res.data),
    ...options,
  });
};
