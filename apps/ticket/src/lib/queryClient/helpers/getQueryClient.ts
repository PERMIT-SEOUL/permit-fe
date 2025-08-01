import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";

// TODO: 공통 패키지의 util 로 분리하기
const isServer = typeof window === "undefined";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry(count: number, error: Error & { digest?: string }): boolean {
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
