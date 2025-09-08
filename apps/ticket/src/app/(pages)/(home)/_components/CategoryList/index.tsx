import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";
import type { CategoryType } from "@/app/(pages)/(home)/constants/category";
import { CATEGORIES, CATEGORY_LABELS } from "@/app/(pages)/(home)/constants/category";
import { EventsResponse } from "@/data/events/getEvents/types";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type CategoryItemProps = {
  label: string;
  count: number;
  isActive?: boolean;
  onClick?: () => void;
};

const CategoryItem = ({ label, count, isActive = false, onClick }: CategoryItemProps) => {
  return (
    <div className={cx("category_item", { active: isActive })} onClick={onClick}>
      <Typography className={cx("label")} type="body16" weight="medium" color="gray500">
        {label}
      </Typography>
      <Typography className={cx("label")} type="body16" weight="medium" color="gray500">
        {count}
      </Typography>
    </div>
  );
};

type CategoryListProps = {
  eventsData: EventsResponse;
  selectedCategory: CategoryType;
  onClickCategory: (category: CategoryType) => void;
};

export const CategoryList = ({
  eventsData,
  selectedCategory,
  onClickCategory,
}: CategoryListProps) => {
  const allEventsCount = Object.values(eventsData).flat().length;

  const getCategoryCount = (category: CategoryType): number => {
    if (category === CATEGORIES.ALL) {
      return allEventsCount;
    }

    return eventsData[category].length;
  };

  return (
    <div className={cx("container")}>
      {Object.entries(CATEGORIES).map(([_, category]) => (
        <CategoryItem
          key={category}
          label={CATEGORY_LABELS[category]}
          count={getCategoryCount(category)}
          isActive={selectedCategory === category}
          onClick={() => onClickCategory(category)}
        />
      ))}
    </div>
  );
};
