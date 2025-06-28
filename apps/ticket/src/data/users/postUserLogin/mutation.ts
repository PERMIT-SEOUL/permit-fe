import { UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";

type LoginRequest = {
  socialType: "GOOGLE" | "KAKAO";
  authorizationCode: string;
  redirectUrl: string;
};

// TODO: 타입 수정
type LoginResponse = {
  code: number;
  data: object | null;
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
