import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";

import { DeleteCouponsMutationOptions, DeleteCouponsRequest } from "./types";

type DeleteCouponsResponse = {
  data: null;
};

export const useDeleteCouponsMutation = (
  options?: DeleteCouponsMutationOptions<DeleteCouponsResponse>,
) => {
  return useMutation({
    mutationFn: async (params: DeleteCouponsRequest) => {
      // TODO: API 엔드포인트 확인 필요
      const { data } = await instance.delete<DeleteCouponsResponse>(API_URL.ADMIN.COUPONS, {
        data: params,
      });

      return data;
    },
    ...options,
  });
};
