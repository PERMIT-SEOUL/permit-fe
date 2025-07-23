export type EventDetailParams = {
  eventId: number;
};

// TODO: 응답 타입 code, data align 필요
export type EventDetailResponse = {
  eventName: string;
  venue: string;
  date: string;
  time: string;
  minAge: number;
  details: string;
  lineup: {
    category: string;
    artist: string;
    name: string;
  }[];
  images: {
    imageUrl: string;
  }[];
};
