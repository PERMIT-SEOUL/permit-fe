import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { eventDetailOptions } from "@/data/events/getEventDetail/queries";
import { eventTicketsOptions } from "@/data/events/getEventTickets/queries";
import { getQueryClient } from "@/lib/queryClient/helpers/getQueryClient";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";

import { EventDetailClient } from "./_clientBoundray/EventDetailClient";

type Props = {
  params: Promise<{ eventId: string }>;
};

/**
 * 이벤트 상세 페이지
 */
const EventDetailPage = async ({ params }: Props) => {
  const { eventId } = await params;

  const qc = getQueryClient();

  await qc.prefetchQuery(eventDetailOptions({ eventId }));
  await qc.prefetchQuery(eventTicketsOptions({ eventId }));

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <Suspense fallback={<LoadingWithLayout />}>
        <EventDetailClient eventId={eventId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default EventDetailPage;
