import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { AxiosErrorResponse } from "@/shared/types/axioxError";
import { UsePermitMutationOptions } from "@/shared/types/queryOptions";

import { PatchUserInfoRequest } from "./types";

/** 회원 정보 수정 API */
export const usePatchUserInfoMutation = (
  options?: UsePermitMutationOptions<null, AxiosErrorResponse, PatchUserInfoRequest>,
) => {
  return useMutation({
    mutationFn: (params) => instance.patch(API_URL.USER.INFO, params).then((res) => res.data),
    ...options,
  });
};
