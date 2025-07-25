export type EventsResponse = {
  permit: Event[];
  ceilingService: Event[];
  festival: Event[];
};

export type Event = {
  eventId: string;
  eventName: string;
  thumbnailImageUrl: string;
};
