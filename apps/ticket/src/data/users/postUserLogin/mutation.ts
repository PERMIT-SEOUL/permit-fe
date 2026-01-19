import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { SocialLoginType } from "@/shared/hooks/useOAuth/types";

type LoginRequest = {
  socialType: SocialLoginType;
  authorizationCode: string;
  redirectUrl: string;
};

type LoginResponse = { code: number; message: string };

export type LoginMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, LoginRequest>,
  "mutationFn"
> & {
  onSuccess?: (data: TData) => void;
};

export const useLoginMutation = (options?: LoginMutationOptions<LoginResponse>) => {
  return useMutation({
    mutationFn: async (params: LoginRequest) => {
      const res = await fetch("/api/login", {
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
