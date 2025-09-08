import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";

// TODO: 공통 패키지의 util 로 분리하기
const isServer = typeof window === "undefined";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry(count: number, error: Error & { digest?: string }): boolean {
          /** server 에서 prefetch 한 쿼리에서 에러가 발생한 경우 retry 를 수행
           * retry 는 client 에서 수행하는 것이 목적이므로 서버에선 제외
           *
           * (error.message === "redacted"): SSR 타임에 에러 응답까지 내려받은 쿼리
           *
           * (typeof error.digest === "string"): CSR 타임에 streaming 응답으로 내려온 쿼리 promise 의 에러
           */
          const isServerPrefetchError =
            error.message === "redacted" || typeof error.digest === "string";

          return !isServer && isServerPrefetchError ? count < 1 : false;
        },
        retryOnMount: true,
        refetchOnWindowFocus: false,
        throwOnError: true,
        staleTime: 1 * 2_000,
        gcTime: Infinity,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        shouldRedactErrors: (error) => {
          // We should not catch Next.js server errors
          // as that's how Next.js detects dynamic pages
          // so we cannot redact them.
          // Next.js also automatically redacts errors for us
          // with better digests.
          return false;
        },
      },
      mutations: {
        throwOnError: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();

    return browserQueryClient;
  }
}
