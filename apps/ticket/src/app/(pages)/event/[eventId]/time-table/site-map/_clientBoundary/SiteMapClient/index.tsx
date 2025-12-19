"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button, Flex, Typography } from "@permit/design-system";
import { useSiteMapSuspenseQuery } from "@/data/events/getSiteMap/queries";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: string;
};

export const SiteMapClient = ({ eventId }: Props) => {
  const router = useRouter();

  const { data: timetablesData } = useSiteMapSuspenseQuery({
    eventId,
    options: {
      refetchOnWindowFocus: true,
    },
  });

  return (
    <div className={cx("container")}>
      <header className={cx("header")}>
        <Flex gap={8} justify="space-between">
          <Flex direction="column" gap={16}>
            <Typography type="title20">{timetablesData.eventName}</Typography>

            <Flex gap={8}>
              <Button
                variant="secondary"
                onClick={() => router.push(`/event/${eventId}/time-table`)}
              >
                {"Timetable"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push(`/event/${eventId}/time-table/site-map`)}
              >
                {"Sitemap"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </header>

      {/* Site Map Swiper */}
      <div className={cx("swiper_container")}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className={cx("swiper")}
        >
          {timetablesData.siteMapImages.map(({ imageUrl }, index) => (
            <SwiperSlide key={index} className={cx("swiper_slide")}>
              <div className={cx("image_container")}>
                <Image
                  src={imageUrl}
                  alt={`Site Map ${index + 1}`}
                  fill
                  className={cx("site_map_image")}
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
