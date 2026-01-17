import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";
import { getPathUrl } from "@/shared/helpers/getPathUrl";
import { useSuspenseQuery } from "@/shared/hooks/useSuspenseQuery";
import {
  OptionsObject,
  PermitQueryOptions,
  UsePermitQueryOptions,
  UsePermitSuspenseQueryOptions,
} from "@/shared/types/queryOptions";

import { EVENT_QUERY_KEYS } from "../queryKeys";
import { SiteMapParams, SiteMapResponse } from "./types";

/** 행사 사이트맵 조회 API */
export const siteMapOptions = (params: SiteMapParams): PermitQueryOptions<SiteMapResponse> => {
  const url = getPathUrl(API_URL.EVENT.SITE_MAP, { eventId: params.eventId });

  return {
    queryKey: [EVENT_QUERY_KEYS.SITE_MAP, params.eventId],
    queryFn: () => {
      return instance.get<SiteMapResponse>(url).then((res) => res.data);
    },
  };
};

export const useSiteMapQuery = ({
  eventId,
  options,
}: SiteMapParams & OptionsObject<UsePermitQueryOptions<SiteMapResponse>>) => {
  return useQuery({
    ...siteMapOptions({ eventId }),
    ...options,
  });
};

export const useSiteMapSuspenseQuery = ({
  eventId,
  options,
}: SiteMapParams & OptionsObject<UsePermitSuspenseQueryOptions<SiteMapResponse>>) => {
  return useSuspenseQuery({
    ...siteMapOptions({ eventId }),
    ...options,
  });
};
