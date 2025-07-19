"use client";

import { useState } from "react";
import classNames from "classnames/bind";

import { CategoryList } from "../../_components/CategoryList";
import { CATEGORIES, CATEGORY_LABELS, CategoryType } from "../../constants/category";
import { mockEventData } from "../../constants/mock";
import { useEventHover } from "../../hooks/useEventHover";
import { EventCardClient } from "../EventCardClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const EventListClient = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(CATEGORIES.ALL);
  const { handleEventHover, isEventDimmed } = useEventHover();

  const handleCategoryClick = (category: CategoryType) => {
    setSelectedCategory(category);
  };

  const getEventsWithCategory = () => {
    if (selectedCategory === CATEGORIES.ALL) {
      return Object.entries(mockEventData).flatMap(([category, events]) =>
        events.map((event) => ({ ...event, category })),
      );
    }

    return mockEventData[selectedCategory].map((event) => ({
      ...event,
      category: selectedCategory,
    }));
  };

  const filteredEvents = getEventsWithCategory();

  return (
    <div className={cx("container")}>
      <CategoryList selectedCategory={selectedCategory} onClickCategory={handleCategoryClick} />
      <div className={cx("event_list")}>
        {filteredEvents.map((event, index) => {
          const { eventId, eventName, thumbnailImageUrl, category } = event;
          const displayNumber = String(index + 1).padStart(2, "0");

          return (
            <EventCardClient
              key={eventId}
              imageUrl={thumbnailImageUrl}
              title={eventName}
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
