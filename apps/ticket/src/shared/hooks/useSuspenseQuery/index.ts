import {
  QueryClient,
  QueryKey,
  useQueryClient,
  useSuspenseQuery as _useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

/**
 * error 가 발생하면 에러를 던지는 useSuspenseQuery 훅
 *
 * 기본 useSuspenseQuery 훅과 다르게 throwOnError 옵션을 추가하여 error 가 발생하면 에러를 던질 수 있도록 함
 */
export const useSuspenseQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  {
    throwOnError = true,
    ...options
  }: UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & { throwOnError?: boolean },
  queryClient?: QueryClient,
) => {
  const appQueryClient = useQueryClient();
  const _queryClient = queryClient ?? appQueryClient;

  const query = _useSuspenseQuery<TQueryFnData, TError, TData, TQueryKey>(options, _queryClient);

  if (
    (throwOnError ?? !!_queryClient?.getDefaultOptions()?.queries?.throwOnError) &&
    query.error &&
    !query.isFetching
  ) {
    throw query.error;
  }

  return query;
};
