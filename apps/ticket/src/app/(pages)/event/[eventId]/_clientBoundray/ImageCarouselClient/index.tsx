"use client";

import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";

import { Icon } from "@permit/design-system";
import { useIsMobile } from "@permit/design-system/hooks";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  images: { imageUrl: string }[];
};

// TODO: 모바일 좌우 스와이프, 애니메이션 추가?
export const ImageCarouselClient = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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

        {isMobile ? (
          <Image
            className={cx("image")}
            src={images[currentIndex].imageUrl}
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <Image
            className={cx("desktop_image")}
            src={images[currentIndex].imageUrl}
            alt=""
            width={438}
            height={552}
          />
        )}

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

      <div className={cx("dots")}>
        {images.map((_, idx) => (
          <button
            key={idx}
            className={cx("dot", { active: idx === currentIndex })}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};
