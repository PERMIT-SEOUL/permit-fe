import { UseMutationOptions } from "@tanstack/react-query";

import { instance } from "@/lib/axios";

type SignupRequest = {
  userName: string;
  userAge: number;
  userSex: "MALE" | "FEMALE";
  socialType: "GOOGLE" | "KAKAO";
  authorizationCode: string;
  redirectUrl: string;
  userEmail: string;
};

type SignupResponse = {
  code: number;
  data: object | null;
};

export type SignupMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, SignupRequest>,
  "mutationFn"
> & {
  mutationFn: (params: SignupRequest) => Promise<TData>;
  onSuccess?: (data: TData) => void;
};

export const signupMutationOptions = (): SignupMutationOptions<SignupResponse> => {
  return {
    mutationFn: async (params: SignupRequest) => {
      const { data } = await instance.post<SignupResponse>("/users/signup", params);

      return data;
    },
  };
};
