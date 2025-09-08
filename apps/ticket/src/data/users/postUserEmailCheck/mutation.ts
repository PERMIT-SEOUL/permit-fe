import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { AxiosErrorResponse } from "@/shared/types/axioxError";
import { UsePermitMutationOptions } from "@/shared/types/queryOptions";

import { EmailCheckRequest } from "./types";

/** 유저 이메일 중복 체크 API */
export const useUserEmailCheckMutation = (
  options?: UsePermitMutationOptions<null, AxiosErrorResponse, EmailCheckRequest>,
) => {
  return useMutation({
    mutationFn: (params) => instance.post(API_URL.USER.EMAIL_CHECK, params).then((res) => res.data),
    ...options,
  });
};
