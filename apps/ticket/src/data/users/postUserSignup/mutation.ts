import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { SocialLoginType } from "@/shared/hooks/useOAuth/types";

type SignupRequest = {
  userName: string;
  userAge: number;
  userGender: "MALE" | "FEMALE";
  socialType: SocialLoginType;
  socialAccessToken: string;
  userEmail: string;
};

type SignupResponse = {
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
      const res = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(params),
      });

      return res.json();
    },
    ...options,
  });
};
