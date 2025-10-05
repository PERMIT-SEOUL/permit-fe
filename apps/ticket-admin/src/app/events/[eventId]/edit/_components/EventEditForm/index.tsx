import { EventEditFormClient } from "../../_clientBoundary/EventEditFormClient";

interface EventEditFormProps {
  eventId: string;
}

export function EventEditForm({ eventId }: EventEditFormProps) {
  return <EventEditFormClient eventId={eventId} />;
}
