export type EventDetailParams = {
  eventId: string;
};

export type EventDetailResponse = {
  eventName: string;
  venue: string;
  date: string;
  time: string;
  minAge: number;
  details: string;
  lineup: Lineup[];
  images: {
    imageUrl: string;
  }[];
};

export type Lineup = {
  category: string;
  artists: { name: string }[];
};
