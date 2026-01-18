import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { useSuspenseQuery } from "@/shared/hooks/useSuspenseQuery";
import {
  OptionsObject,
  PermitQueryOptions,
  UsePermitQueryOptions,
  UsePermitSuspenseQueryOptions,
} from "@/shared/types/queryOptions";

import { ADMIN_QUERY_KEYS } from "../queryKeys";
import { GuestResponse } from "./types";

/** 게스트 리스트 조회 API */
export const guestListOptions = (): PermitQueryOptions<GuestResponse> => {
  return {
    queryKey: [ADMIN_QUERY_KEYS.GUESTS],
    queryFn: () => {
      const url = API_URL.ADMIN.GUESTS;

      return instance.get<GuestResponse>(url).then((res) => res.data);
    },
  };
};

/** 게스트 리스트 조회 Query */
export const useGuestListQuery = ({
  options,
}: OptionsObject<UsePermitQueryOptions<GuestResponse>>) => {
  return useQuery({
    ...guestListOptions(),
    ...options,
  });
};

/** 게스트 리스트 조회 Suspense Query */
export const useGuestListSuspenseQuery = ({
  options,
}: OptionsObject<UsePermitSuspenseQueryOptions<GuestResponse>>) => {
  return useSuspenseQuery({
    ...guestListOptions(),
    ...options,
  });
};
