export type EventsResponse = {
  permit: Event[];
  ceilingService: Event[];
  festival: Event[];
};

type Event = {
  eventName: string;
  thumbnailImageUrl: string;
};
