import {
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

import { AxiosErrorResponse } from "./axioxError";

type OmitQueryOptions<T> = Omit<T, "queryKey" | "queryFn">;

type OmitMutationOptions<T> = Omit<T, "mutationKey" | "mutationFn">;

export type OptionsObject<TOptions> = { options?: TOptions };

/**
 * queryOptions 의 타입
 */
export type PermitQueryOptions<TResponse, TQueryData = TResponse> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<TResponse>;
  select?: (data: TResponse) => TQueryData;
};

/**
 * useQuery() 의 options 타입
 */
export type UsePermitQueryOptions<
  TResponse,
  TError = AxiosErrorResponse,
  TData = TResponse,
> = OmitQueryOptions<UseQueryOptions<TResponse, TError, TData>>;

/**
 * useSuspenseQuery() 의 options 타입
 */
export type UsePermitSuspenseQueryOptions<
  TResponse,
  TError = AxiosErrorResponse,
  TData = TResponse,
> = OmitQueryOptions<UseSuspenseQueryOptions<TResponse, TError, TData>> & {
  throwOnError?: boolean;
};

/**
 * useMutation() 의 options 타입
 */
export type UsePermitMutationOptions<
  TData = unknown,
  TError = AxiosErrorResponse,
  TVariables = void,
  TContext = unknown,
> = OmitMutationOptions<UseMutationOptions<TData, TError, TVariables, TContext>>;
