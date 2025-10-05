export type EventDetailParams = {
  eventId: string;
};

export type EventDetailResponse = {
  eventId: string;
  eventExposureStartDate: string;
  eventExposureStartTime: string;
  eventExposureEndDate: string;
  eventExposureEndTime: string;
  verificationCode: string;
  name: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  venue: string;
  lineup?: string;
  details?: string;
  images: {
    imageUrl: string;
  }[];
  minAge: number;
};
