import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";

type LogoutResponse = {
  code: number;
  data: null;
};

export type LogoutMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, void>,
  "mutationFn"
> & {
  onSuccess?: (data: TData) => void;
};

export const useLogoutMutation = (options?: LogoutMutationOptions<LogoutResponse>) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await instance.post<LogoutResponse>(API_URL.LOGOUT);

      return data;
    },
    ...options,
  });
};
