import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { SocialLoginType } from "@/shared/hooks/useOAuth/types";

type LoginRequest = {
  socialType: SocialLoginType;
  authorizationCode: string;
  redirectUrl: string;
};

type LoginResponse = {
  data: null;
};

export type LoginMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, LoginRequest>,
  "mutationFn"
> & {
  onSuccess?: (data: TData) => void;
};

export const useLoginMutation = (options?: LoginMutationOptions<LoginResponse>) => {
  return useMutation({
    mutationFn: async (params: LoginRequest) => {
      const { data } = await instance.post<LoginResponse>(API_URL.USER.LOGIN, params);

      return data;
    },
    ...options,
  });
};
