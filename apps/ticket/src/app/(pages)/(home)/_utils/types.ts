import { CategoryType } from "@/app/(pages)/(home)/constants/category";

export type Event = {
  eventId: number;
  eventName: string;
  thumbnailImageUrl: string;
};

export type EventWithCategory = Event & {
  category: CategoryType;
};
