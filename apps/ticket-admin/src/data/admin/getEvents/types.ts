export type EventsResponse = {
  eventYearMonth?: string;
  events: Event[];
}[];

export type Event = {
  eventId: number;
  eventName: string;
  eventVenue?: string;
  eventDate: string;
  soldTicketCount: number;
};
