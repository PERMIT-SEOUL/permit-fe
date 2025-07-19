import classNames from "classnames/bind";

import type { CategoryType } from "@/app/(pages)/(home)/constants/category";
import { CATEGORIES, CATEGORY_LABELS } from "@/app/(pages)/(home)/constants/category";

import { mockEventData } from "../../constants/mock";
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
      <span className={cx("label")}>{label}</span>
      <span className={cx("count")}>{count}</span>
    </div>
  );
};

type CategoryListProps = {
  selectedCategory: CategoryType;
  onClickCategory: (category: CategoryType) => void;
};

export const CategoryList = ({ selectedCategory, onClickCategory }: CategoryListProps) => {
  const allEventsCount = Object.values(mockEventData).flat().length;

  const getCategoryCount = (category: CategoryType): number => {
    if (category === CATEGORIES.ALL) {
      return allEventsCount;
    }

    return mockEventData[category].length;
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
