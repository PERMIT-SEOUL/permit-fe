import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";

import { Flex, Typography } from "@permit/design-system";
import { Event } from "@/data/events/getEvents/types";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type EventCardProps = Event & {
  displayNumber: string;
  category: string;
  onHover: (isHovered: boolean) => void;
  isDimmed: boolean;
};

export const EventCardClient = ({
  eventId,
  thumbnailImageUrl,
  eventName,
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
    <Link href={`/event/${eventId}`}>
      <div
        className={cx("container", { hovered: isHovered, dimmed: isDimmed })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Typography type="body16" weight="bold" className={cx("display_number")}>
          {displayNumber}
        </Typography>
        <div className={cx("image_wrapper")}>
          <Image src={thumbnailImageUrl} alt={eventName} fill />
        </div>
        <Typography type="body14" weight="bold" className={cx("mobile_title")}>
          {eventName}
        </Typography>
        <div className={cx("hovered_content")}>
          <Flex gap={16}>
            <Flex direction="column" gap={4}>
              <Typography className={cx("category_name")} type="body14" weight="bold">
                {category}
              </Typography>
              <Typography type="body14" weight="bold">
                {eventName}
              </Typography>
            </Flex>
            <div className={cx("image_wrapper")}>
              <Image
                className={cx("image")}
                src={thumbnailImageUrl}
                alt={eventName}
                fill
                sizes="(min-width: 1336px) 447px, (min-width: 768px) 33.33vw, 100vw"
              />
            </div>
          </Flex>
        </div>
      </div>
    </Link>
  );
};
