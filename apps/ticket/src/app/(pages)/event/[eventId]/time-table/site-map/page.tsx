import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { siteMapOptions } from "@/data/events/getSiteMap/queries";
import { getQueryClient } from "@/lib/queryClient/helpers/getQueryClient";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";

import { SiteMapClient } from "./_clientBoundary/SiteMapClient";
import { SiteMapErrorBoundary } from "./_clientBoundary/SiteMapErrorBoundary";

type Props = {
  params: Promise<{ eventId: string }>;
};

export default async function SiteMapPage({ params }: Props) {
  const { eventId } = await params;

  const qc = getQueryClient();

  qc.prefetchQuery(siteMapOptions({ eventId }));

  return (
    <SiteMapErrorBoundary eventId={eventId}>
      <HydrationBoundary state={dehydrate(qc)}>
        <Suspense fallback={<LoadingWithLayout />}>
          <SiteMapClient eventId={eventId} />
        </Suspense>
      </HydrationBoundary>
    </SiteMapErrorBoundary>
  );
}
