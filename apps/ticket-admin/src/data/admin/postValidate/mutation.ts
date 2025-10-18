import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";

type ValidateResponse = {
  data: null;
};

export type ValidateMutationOptions<TData> = {
  eventId: number;
  options?: Omit<UseMutationOptions<TData, Error, void>, "mutationFn"> & {
    onSuccess?: (data: TData) => void;
  };
};

export const useValidateMutation = ({
  eventId,
  options,
}: ValidateMutationOptions<ValidateResponse>) => {
  const url = getPathUrl(API_URL.ADMIN.VALIDATE, { eventId });

  return useMutation({
    mutationFn: async () => {
      const { data } = await instance.post<ValidateResponse>(url);

      return data;
    },
    ...options,
  });
};
