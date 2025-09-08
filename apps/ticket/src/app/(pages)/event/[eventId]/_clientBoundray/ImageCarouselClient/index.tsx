"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Icon } from "@permit/design-system";

// Swiper CSS import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  images: { imageUrl: string }[];
};

export const ImageCarouselClient = ({ images }: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrev = () => {
    swiperRef.current?.slidePrev();
  };

  const goToNext = () => {
    swiperRef.current?.slideNext();
  };

  const isSingleImage = images.length < 2;

  return (
    <div className={cx("carousel")}>
      <div className={cx("image_container")}>
        {!isSingleImage && (
          <button
            className={cx("icon_button")}
            type="button"
            aria-label="prev image"
            onClick={goToPrev}
          >
            <Icon.Up size={20} fill="gray800" />
          </button>
        )}

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
          className={cx("swiper")}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className={cx("swiper_slide")}>
              <Image
                className={cx("image")}
                src={image.imageUrl}
                alt=""
                fill
                priority={index === 0}
                style={{ objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {!isSingleImage && (
          <button
            className={cx("icon_button")}
            type="button"
            aria-label="next image"
            onClick={goToNext}
          >
            <Icon.Down size={20} fill="gray800" />
          </button>
        )}
      </div>

      {!isSingleImage && (
        <div className={cx("dots")}>
          {images.map((_, idx) => (
            <button
              key={idx}
              className={cx("dot", { active: idx === activeIndex })}
              onClick={() => swiperRef.current?.slideTo(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
