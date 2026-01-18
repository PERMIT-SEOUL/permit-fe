"use client";

import { useState } from "react";
import classNames from "classnames/bind";

import { useEventsSuspenseQuery } from "@/data/events/getEvents/queries";

import { CategoryList } from "../../_components/CategoryList";
import { EventWithCategory } from "../../_utils/types";
import { CATEGORIES, CATEGORY_LABELS, CategoryType } from "../../constants/category";
import { useEventHover } from "../../hooks/useEventHover";
import { EventCardClient } from "../EventCardClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const EventListClient = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(CATEGORIES.ALL);
  const { handleEventHover, isEventDimmed } = useEventHover();

  const { data: eventsData } = useEventsSuspenseQuery({ refetchOnWindowFocus: true });

  const handleCategoryClick = (category: CategoryType) => {
    setSelectedCategory(category);
  };

  const getEventsWithCategory = (): EventWithCategory[] => {
    if (selectedCategory === CATEGORIES.ALL) {
      return Object.entries(eventsData).flatMap(([category, events]) =>
        events.map((event) => ({
          ...event,
          category: category as CategoryType,
        })),
      );
    }

    return (
      eventsData[selectedCategory]?.map((event) => ({
        ...event,
        category: selectedCategory,
      })) ?? []
    );
  };

  const filteredEvents = getEventsWithCategory();

  return (
    <div className={cx("container")}>
      <CategoryList
        eventsData={eventsData}
        selectedCategory={selectedCategory}
        onClickCategory={handleCategoryClick}
      />
      <div className={cx("event_list")}>
        {filteredEvents.map((event: EventWithCategory, index: number) => {
          const { eventId, eventName, thumbnailImageUrl, category } = event;
          const displayNumber = String(index + 1).padStart(2, "0");

          return (
            <EventCardClient
              key={eventId}
              eventId={eventId}
              thumbnailImageUrl={thumbnailImageUrl}
              eventName={eventName}
              displayNumber={displayNumber}
              category={CATEGORY_LABELS[category]}
              onHover={(isHovered) => handleEventHover(eventId, isHovered)}
              isDimmed={isEventDimmed(eventId)}
            />
          );
        })}
      </div>
    </div>
  );
};
