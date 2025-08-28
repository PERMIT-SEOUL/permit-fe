import { useEffect } from "react";
import classNames from "classnames/bind";

import { Block } from "../../_clientBoundary/TimeTableClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface EventDetailModalProps {
  block: Block | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailModal = ({ block, isOpen, onClose }: EventDetailModalProps) => {
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

  if (!isOpen || !block) return null;

  // 배경 클릭 시 모달 닫기
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={cx("modalOverlay")} onClick={handleBackgroundClick}>
      <div className={cx("modalContent")}>
        {/* 닫기 버튼 */}
        <button className={cx("closeButton")} onClick={onClose} aria-label="모달 닫기">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
              fill="currentColor"
            />
          </svg>
        </button>

        {/* 모달 내용 */}
        <div className={cx("modalBody")}>
          <div className={cx("eventInfo")}>
            <div className={cx("eventHeader")}>
              <div className={cx("eventTitleSection")}>
                <h2 className={cx("eventTitle")}>{block.blockName}</h2>
                <div className={cx("categoryTag")}>
                  <span>category</span>
                </div>
              </div>
              <button className={cx("starButton")} aria-label="즐겨찾기">
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
                  <path
                    d="M12.1191 6.92285L12.2959 7.33887L12.7471 7.37695L18.165 7.83691L14.0488 11.4033L13.707 11.6992L13.8096 12.1406L15.0449 17.4385L10.3877 14.6279L10 14.3936L9.6123 14.6279L4.9541 17.4385L6.19043 12.1406L6.29297 11.6992L5.95117 11.4033L1.83398 7.83691L7.25293 7.37695L7.7041 7.33887L7.88086 6.92285L10 1.92188L12.1191 6.92285Z"
                    fill={block.isUserLiked ? "currentColor" : "transparent"}
                    fillOpacity={block.isUserLiked ? "1" : "0.1"}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>

            <div className={cx("eventDetails")}>
              <div className={cx("timeAndPlace")}>
                <div className={cx("timeInfo")}>
                  <span>
                    {block.blockStartDate} ~ {block.blockEndDate}
                  </span>
                  <div className={cx("divider")} />
                  <span>Place</span>
                </div>
                <p className={cx("description")}>
                  소개글 가나다라마바사 아자차카타파하 소개글 가나다라마바사 아자차카타파하 소개글
                  가나다라마바사 아자차카타파하소개글 가나다라마바사 아자차카타파하 소개글
                  가나다라마바사 아자차카타파하 소개글 가나다라마바사 아자차카타파하
                </p>
              </div>

              <div className={cx("artistInfo")}>
                <span className={cx("artistLabel")}>아티스트 url</span>
                <a href="#" className={cx("artistLink")}>
                  아티스트 url 링크
                </a>
              </div>
            </div>
          </div>

          {/* 이미지 플레이스홀더 */}
          <div className={cx("eventImage")}>
            <div className={cx("imagePlaceholder")}>{/* 실제 이미지가 있다면 여기에 추가 */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;
