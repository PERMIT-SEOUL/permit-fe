import classNames from "classnames/bind";

import { FloatingSection } from "./_clientBoundray/FloatingSection";
import { ImageCarouselClient } from "./_clientBoundray/ImageCarouselClient";
import { EventInfo } from "./_components/EventInfo";
import { mockEvent } from "./constants/mock";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  params: Promise<{ eventId: string }>;
};

/**
 * 이벤트 상세 페이지
 */
const EventDetailPage = async ({ params }: Props) => {
  const { eventId } = await params;

  // TODO: 행사 상세 조회 API 추가

  return (
    <>
      <div className={cx("content")}>
        <div className={cx("mobile_title_section")}>
          <EventInfo
            eventName={mockEvent.eventName}
            venue={mockEvent.venue}
            date={mockEvent.date}
            time={mockEvent.time}
            minAge={mockEvent.minAge}
            details={mockEvent.details}
            lineup={mockEvent.lineup}
            showOnlyTitle={true}
          />
        </div>

        {/* <div className={cx("image_section")}> */}
        <ImageCarouselClient images={mockEvent.images} />
        {/* </div> */}

        <div className={cx("info_section")}>
          <EventInfo
            eventName={mockEvent.eventName}
            venue={mockEvent.venue}
            date={mockEvent.date}
            time={mockEvent.time}
            minAge={mockEvent.minAge}
            details={mockEvent.details}
            lineup={mockEvent.lineup}
            showOnlyTitle={false}
          />
        </div>
      </div>

      <FloatingSection eventId={Number(eventId)} />
    </>
  );
};

export default EventDetailPage;
