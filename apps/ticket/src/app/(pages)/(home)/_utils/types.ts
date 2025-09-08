import { CategoryType } from "@/app/(pages)/(home)/constants/category";
import { Event } from "@/data/events/getEvents/types";

export type EventWithCategory = Event & {
  category: CategoryType;
};
