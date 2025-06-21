import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { sampleOptions } from "@/data/sample/getTodoItem/queries";
import { WithSuspense } from "@/shared/hoc/WithSuspense";

import { ClientTest } from "../../_clientBoundary/ClientTest";

export const SuspenseTest = WithSuspense(
  ({ qc }: { qc: QueryClient }) => {
    qc.prefetchQuery(sampleOptions());

    return (
      <>
        <HydrationBoundary state={dehydrate(qc)}>
          <ClientTest />
        </HydrationBoundary>
      </>
    );
  },
  {
    fallback: <div>SuspenseTest Loading...</div>,
  },
);
