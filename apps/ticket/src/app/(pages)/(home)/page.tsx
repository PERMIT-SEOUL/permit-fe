import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { eventsOptions } from "@/data/events/getEvents/queries";
import { getQueryClient } from "@/lib/queryClient/helpers/getQueryClient";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";

import { EventListClient } from "./_clientBoundary/EventListClient";

const HomePage = async () => {
  const qc = getQueryClient();

  // TODO: 스트리밍 되어서 내려오는 게 에러... 바운더리?
  await qc.fetchQuery(eventsOptions());

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <Suspense fallback={<LoadingWithLayout />}>
        <EventListClient />
      </Suspense>
    </HydrationBoundary>
  );
};

export default HomePage;
