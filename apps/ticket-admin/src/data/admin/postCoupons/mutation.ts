import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";

import { PostCouponsRequest } from "./types";

export type PostCouponsMutationOptions<TData> = {
  options?: Omit<UseMutationOptions<TData, Error, PostCouponsRequest>, "mutationFn"> & {
    onSuccess?: (data: TData) => void;
  };
};

export const usePostCouponsMutation = ({ options }: PostCouponsMutationOptions<null>) => {
  return useMutation({
    mutationFn: async (params: PostCouponsRequest) => {
      const { data } = await instance.post<null>(API_URL.ADMIN.COUPONS, params);

      return data;
    },
    ...options,
  });
};
