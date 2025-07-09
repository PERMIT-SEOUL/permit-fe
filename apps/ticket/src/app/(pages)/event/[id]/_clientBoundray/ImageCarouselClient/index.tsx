"use client";

import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  images: { imageUrl: string }[];
};

export const ImageCarouselClient = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={cx("carousel")}>
      <div>
        <Image
          className={cx("image")}
          src={images[currentIndex].imageUrl}
          alt=""
          width={400}
          height={504}
          objectFit="cover"
        />
        <button className={cx("icon_button", "prev")} aria-label="prev image" onClick={goToPrev}>
          ‹
        </button>
        <button className={cx("icon_button", "next")} aria-label="next image" onClick={goToNext}>
          ›
        </button>
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
