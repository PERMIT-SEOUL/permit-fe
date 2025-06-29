import { UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { SocialLoginType } from "@/shared/hooks/useOAuth/types";

type LoginRequest = {
  socialType: SocialLoginType;
  authorizationCode: string;
  redirectUrl: string;
};

type LoginResponse = {
  code: number;
  data: null;
};

export type LoginMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, LoginRequest>,
  "mutationFn"
> & {
  mutationFn: (params: LoginRequest) => Promise<TData>;
  onSuccess?: (data: TData) => void;
};

export const loginMutationOptions = (): LoginMutationOptions<LoginResponse> => {
  return {
    mutationFn: async (params: LoginRequest) => {
      const { data } = await instance.post<LoginResponse>(API_URL.LOGIN, params);

      return data;
    },
  };
};
