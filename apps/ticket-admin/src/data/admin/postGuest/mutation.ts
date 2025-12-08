import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";

export type PostGuestRequest = {
  guestName: string;
  guestType: string;
  affiliation: string;
  phoneNumber?: string;
  email: string;
};

type PostGuestResponse = {
  data: null;
};

export type PostGuestMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, PostGuestRequest>,
  "mutationFn"
> & {
  onSuccess?: (data: TData) => void;
};

export const usePostGuestMutation = (options?: PostGuestMutationOptions<PostGuestResponse>) => {
  return useMutation({
    mutationFn: async (params: PostGuestRequest) => {
      const { data } = await instance.post<PostGuestResponse>(API_URL.ADMIN.GUESTS, params);

      return data;
    },
    ...options,
  });
};
