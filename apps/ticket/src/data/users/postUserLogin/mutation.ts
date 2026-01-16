// import { useMutation, UseMutationOptions } from "@tanstack/react-query";

// import { API_URL } from "@/data/constants";
// import { instance } from "@/lib/axios";
// import { SocialLoginType } from "@/shared/hooks/useOAuth/types";

// type LoginRequest = {
//   socialType: SocialLoginType;
//   authorizationCode: string;
//   redirectUrl: string;
// };

// type LoginResponse = {
//   data: null;
// };

// export type LoginMutationOptions<TData> = Omit<
//   UseMutationOptions<TData, Error, LoginRequest>,
//   "mutationFn"
// > & {
//   onSuccess?: (data: TData) => void;
// };

// export const useLoginMutation = (options?: LoginMutationOptions<LoginResponse>) => {
//   return useMutation({
//     mutationFn: async (params: LoginRequest) => {
//       const { data } = await instance.post<LoginResponse>(API_URL.USER.LOGIN, params);

//       return data;
//     },
//     ...options,
//   });
// };

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
      // const response = await instance.post<LoginResponse>(API_URL.USER.LOGIN, params);

      // document.cookie = "co:11";

      // return response.data;

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        throw new Error("로그인 요청 실패");
      }

      return res.json();
    },
    ...options,
  });
};
