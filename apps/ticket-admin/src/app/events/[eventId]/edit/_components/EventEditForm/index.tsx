import { EventEditFormClient } from "../../_clientBoundary/EventEditFormClient";

interface EventEditFormProps {
  eventId: number;
}

export function EventEditForm({ eventId }: EventEditFormProps) {
  return <EventEditFormClient eventId={eventId} />;
}
