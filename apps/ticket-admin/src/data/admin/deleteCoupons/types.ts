import { UseMutationOptions } from "@tanstack/react-query";

export type DeleteCouponsRequest = {
  couponIds: number[];
};

type DeleteCouponsResponse = {
  data: null;
};

export type DeleteCouponsMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, DeleteCouponsRequest>,
  "mutationFn"
> & {
  onSuccess?: (data: TData) => void;
};
