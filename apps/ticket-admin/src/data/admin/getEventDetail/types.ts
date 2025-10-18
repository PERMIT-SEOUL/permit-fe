export type EventDetailParams = {
  eventId: number;
};

export type EventDetailResponse = {
  eventId: number;
  eventExposureStartDate: string;
  eventExposureStartTime: string;
  eventExposureEndDate: string;
  eventExposureEndTime: string;
  eventType: string;
  verificationCode: string;
  name: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  venue: string;
  lineup: string;
  details: string;
  images: {
    imageUrl?: string;
  }[];
  minAge: number;
};
