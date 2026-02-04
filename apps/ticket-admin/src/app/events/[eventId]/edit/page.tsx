import { eventDetailOptions } from "@/data/admin/getEventDetail/queries";
import { getQueryClient } from "@/lib/queryClient/helpers/getQueryClient";

import { EventEditForm } from "./_components/EventEditForm";

type Props = {
  params: Promise<{ eventId: number }>;
};

export default async function EditEventPage({ params }: Props) {
  const { eventId } = await params;

  // const qc = getQueryClient();

  // qc.prefetchQuery(eventDetailOptions({ eventId }));

  return <EventEditForm eventId={eventId} />;
}
