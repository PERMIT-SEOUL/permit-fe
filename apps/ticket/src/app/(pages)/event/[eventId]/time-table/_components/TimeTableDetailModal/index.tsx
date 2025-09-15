import { useEffect } from "react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { useTimetableUnlikeMutation } from "@/data/events/deleteTimetableLike/mutation";
import { useTimetableDetailQuery } from "@/data/events/getTimetableDetail/queries";
import { useTimetableLikeMutation } from "@/data/events/postTimetableLike/mutation";
import { EVENT_QUERY_KEYS } from "@/data/events/queryKeys";

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
                      backgroundColor: `${timetableDetail.categoryColor}66`,
                      borderColor: timetableDetail.categoryColor,
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
                  <p className={cx("description")}>{timetableDetail.information}</p>
                </div>

                <div className={cx("artist_info")}>
                  <span className={cx("artist_label")}>자세히 보기</span>
                  <a
                    href={timetableDetail.blockInfoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cx("artist_link")}
                  >
                    {timetableDetail.blockInfoUrl}
                  </a>
                </div>
              </div>
            </div>

            {/* 이미지/비디오 플레이스홀더 */}
            <div className={cx("event_image")}>
              {timetableDetail.imageUrl ? (
                <div className={cx("image_wrapper")}>
                  {timetableDetail.imageUrl.includes("videos") ? (
                    <video
                      src={timetableDetail.imageUrl}
                      controls
                      className={cx("event_video")}
                      preload="metadata"
                    >
                      <track kind="captions" />
                      브라우저가 비디오를 지원하지 않습니다.
                    </video>
                  ) : (
                    <Image
                      src={timetableDetail.imageUrl}
                      alt={timetableDetail.blockName}
                      fill
                      priority
                    />
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
