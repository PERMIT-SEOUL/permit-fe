import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { eventsOptions } from "@/data/events/getEvents/queries";
import { getQueryClient } from "@/lib/queryClient/helpers/getQueryClient";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";

import { EventListClient } from "./_clientBoundary/EventListClient";

const HomePage = () => {
  const qc = getQueryClient();

  qc.prefetchQuery(eventsOptions());

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <Suspense fallback={<LoadingWithLayout />}>
        <EventListClient />
      </Suspense>
    </HydrationBoundary>
  );
};

export default HomePage;
