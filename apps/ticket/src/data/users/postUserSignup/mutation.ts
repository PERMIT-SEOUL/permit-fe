import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { SocialLoginType } from "@/shared/hooks/useOAuth/types";

type SignupRequest = {
  userName: string;
  userAge: number;
  userSex: "MALE" | "FEMALE";
  socialType: SocialLoginType;
  socialAccessToken: string;
  userEmail: string;
};

type SignupResponse = {
  code: number;
  data: null;
};

export type SignupMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, SignupRequest>,
  "mutationFn"
> & {
  onSuccess?: (data: TData) => void;
};

export const useSignupMutation = (options?: SignupMutationOptions<SignupResponse>) => {
  return useMutation({
    mutationFn: async (params: SignupRequest) => {
      const { data } = await instance.post<SignupResponse>(API_URL.SIGNUP, params);

      return data;
    },
    ...options,
  });
};
