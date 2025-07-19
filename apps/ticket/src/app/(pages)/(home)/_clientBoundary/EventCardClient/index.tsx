import { useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";

import { Flex, Typography } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type EventCardProps = {
  imageUrl: string;
  title: string;
  displayNumber: string;
  category: string;
  onHover: (isHovered: boolean) => void;
  isDimmed: boolean;
};

export const EventCardClient = ({
  imageUrl,
  title,
  displayNumber,
  category,
  onHover,
  isDimmed,
}: EventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(false);
  };

  return (
    <div
      className={cx("container", { hovered: isHovered, dimmed: isDimmed })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Typography type="body16" weight="bold" className={cx("display_number")}>
        {displayNumber}
      </Typography>
      <div className={cx("image_wrapper")}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={cx("image")}
          sizes="(max-width: 768px) 100vw, 93px"
        />
      </div>
      <Typography type="body14" weight="bold" className={cx("mobile_title")}>
        {title}
      </Typography>
      <div className={cx("hovered_content")}>
        <Flex gap={16}>
          <Flex direction="column" gap={4}>
            <Typography className={cx("category_name")} type="body14" weight="bold">
              {category}
            </Typography>
            <Typography type="body14" weight="bold">
              {title}
            </Typography>
          </Flex>
          <div className={cx("image_wrapper")}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={cx("image")}
              sizes="(min-width: 1336px) 447px, (min-width: 768px) 33.33vw, 100vw"
            />
          </div>
        </Flex>
      </div>
    </div>
  );
};
