import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";

export type MemoRequest = {
  coupons: {
    couponId: number;
    memo: string;
  }[];
};

type MemoResponse = {
  data: null;
};

export type MemoMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, MemoRequest>,
  "mutationFn"
> & {
  onSuccess?: (data: TData) => void;
};

export const useMemoMutation = (options?: MemoMutationOptions<MemoResponse>) => {
  return useMutation({
    mutationFn: async (params: MemoRequest) => {
      const { data } = await instance.patch<MemoResponse>(API_URL.ADMIN.COUPONS_MEMO, params);

      return data;
    },
    ...options,
  });
};
