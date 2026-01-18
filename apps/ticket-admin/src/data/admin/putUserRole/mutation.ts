import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";

export type PutUserRoleRequest = {
  role: "ADMIN" | "STAFF" | "USER";
};

type PutUserRoleResponse = {
  data: null;
};

export type PutUserRoleMutationOptions<TData> = {
  userId: number;
  options?: Omit<UseMutationOptions<TData, Error, PutUserRoleRequest>, "mutationFn"> & {
    onSuccess?: (data: TData) => void;
  };
};

export const usePutUserRoleMutation = ({
  userId,
  options,
}: PutUserRoleMutationOptions<PutUserRoleResponse>) => {
  const url = getPathUrl(API_URL.ADMIN.USER_ROLE, { userId });

  return useMutation({
    mutationFn: async (params: PutUserRoleRequest) => {
      const { data } = await instance.put<PutUserRoleResponse>(url, params);

      return data;
    },
    ...options,
  });
};
