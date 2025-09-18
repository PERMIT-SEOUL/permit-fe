import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Icon } from "@permit/design-system";
import { useTimetableUnlikeMutation } from "@/data/events/deleteTimetableLike/mutation";
import { useTimetableDetailQuery } from "@/data/events/getTimetableDetail/queries";
import { useTimetableLikeMutation } from "@/data/events/postTimetableLike/mutation";
import { EVENT_QUERY_KEYS } from "@/data/events/queryKeys";

// Swiper CSS import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Block } from "../../_clientBoundary/TimeTableClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type TimeTableDetailModalProps = {
  block: Block | null;
  isOpen: boolean;
  onClose: () => void;
};

export const TimeTableDetailModal = ({ block, isOpen, onClose }: TimeTableDetailModalProps) => {
  const queryClient = useQueryClient();
  const { data: timetableDetail, isLoading } = useTimetableDetailQuery({
    blockId: block?.blockId as string,
  });

  const { mutateAsync: likeTimetable } = useTimetableLikeMutation(block?.blockId as string);
  const { mutateAsync: unlikeTimetable } = useTimetableUnlikeMutation(block?.blockId as string);

  // Swiper 관련 상태
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 캐러셀 컨트롤 함수
  const goToPrev = () => {
    swiperRef.current?.slidePrev();
  };

  const goToNext = () => {
    swiperRef.current?.slideNext();
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // 모달 열릴 때 스크롤 방지
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // TODO: is loading vs isPending?
  if (!isOpen || !timetableDetail || isLoading) return null;

  const isSingleMedia = timetableDetail.media.length < 2;

  // 배경 클릭 시 모달 닫기
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleStarButtonClick = async () => {
    try {
      if (timetableDetail.isLiked) {
        await unlikeTimetable();
      } else {
        await likeTimetable();
      }

      queryClient.invalidateQueries({
        queryKey: [EVENT_QUERY_KEYS.TIMETABLE_DETAIL, block?.blockId],
      });
      queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.TIMETABLES] });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cx("modal_overlay")} onClick={handleBackgroundClick}>
      <div className={cx("modal_container")}>
        {/* 닫기 버튼 */}
        <button className={cx("close_button")} onClick={onClose} aria-label="모달 닫기">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <div className={cx("modal_content")}>
          {/* 모달 내용 */}
          <div className={cx("modal_body")}>
            <div className={cx("event_info")}>
              <div className={cx("event_header")}>
                <div className={cx("event_title_section")}>
                  <h2 className={cx("event_title")}>{timetableDetail.blockName}</h2>
                  <div
                    className={cx("category_tag")}
                    style={{
                      backgroundColor: `${timetableDetail.categoryBackgroundColor}`,
                      color: timetableDetail.categoryLineColor,
                      borderColor: timetableDetail.categoryLineColor,
                    }}
                  >
                    <span>{timetableDetail.blockCategory}</span>
                  </div>
                </div>
                <button
                  className={cx("star_button", { liked: timetableDetail.isLiked })}
                  aria-label="즐겨찾기"
                  onClick={handleStarButtonClick}
                >
                  <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
                    <path
                      d="M12.1191 6.92285L12.2959 7.33887L12.7471 7.37695L18.165 7.83691L14.0488 11.4033L13.707 11.6992L13.8096 12.1406L15.0449 17.4385L10.3877 14.6279L10 14.3936L9.6123 14.6279L4.9541 17.4385L6.19043 12.1406L6.29297 11.6992L5.95117 11.4033L1.83398 7.83691L7.25293 7.37695L7.7041 7.33887L7.88086 6.92285L10 1.92188L12.1191 6.92285Z"
                      fill={timetableDetail.isLiked ? "currentColor" : "transparent"}
                      fillOpacity={timetableDetail.isLiked ? "1" : "0.1"}
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
              </div>

              <div className={cx("event_details")}>
                <div className={cx("time_and_place")}>
                  <div className={cx("time_info")}>
                    <span>
                      {timetableDetail.startDate} ~ {timetableDetail.endDate}
                    </span>
                    <span>{timetableDetail.area}</span>
                  </div>
                  {/* <p className={cx("description")}>{timetableDetail.information}</p> */}
                </div>

                {timetableDetail.blockInfoUrl && (
                  <div className={cx("artist_info")}>
                    <span className={cx("artist_label")}>예매링크</span>
                    <a
                      href={timetableDetail.blockInfoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={cx("artist_link")}
                    >
                      {timetableDetail.blockInfoUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* 이미지/비디오 플레이스홀더 */}
            <div className={cx("event_image")}>
              {timetableDetail.media.length > 0 ? (
                <div className={cx("carousel")}>
                  <div className={cx("image_container")}>
                    {!isSingleMedia && (
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
                      loop={!isSingleMedia}
                      onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                      }}
                      onSlideChange={(swiper) => {
                        setActiveIndex(swiper.realIndex);
                      }}
                      className={cx("swiper")}
                    >
                      {timetableDetail.media.map((mediaItem, index) => {
                        const isVideo = mediaItem.mediaUrl.includes(".mp4");

                        return (
                          <SwiperSlide key={index} className={cx("swiper_slide")}>
                            {isVideo ? (
                              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                <ReactPlayer
                                  src={mediaItem.mediaUrl + "#t=0.001"}
                                  controls
                                  width="100%"
                                  height="100%"
                                  playsInline
                                  autoPlay
                                  style={{ borderRadius: "4px" }}
                                />
                              </div>
                            ) : (
                              <Image
                                className={cx("image")}
                                src={mediaItem.mediaUrl}
                                alt={timetableDetail.blockName}
                                fill
                                priority={index === 0}
                                style={{ objectFit: "cover" }}
                              />
                            )}
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>

                    {!isSingleMedia && (
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

                  {!isSingleMedia && (
                    <div className={cx("dots")}>
                      {timetableDetail.media.map((_, idx) => (
                        <button
                          key={idx}
                          className={cx("dot", { active: idx === activeIndex })}
                          onClick={() => swiperRef.current?.slideTo(idx)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className={cx("image_placeholder")} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
