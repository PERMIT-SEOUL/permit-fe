"use client";

import classNames from "classnames/bind";

import { useEventDetailSuspenseQuery } from "@/data/events/getEventDetail/queries";

import { EventInfo } from "../../_components/EventInfo";
import { FloatingSection } from "../FloatingSection";
import { ImageCarouselClient } from "../ImageCarouselClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: string;
};

export const EventDetailClient = ({ eventId }: Props) => {
  const { data: eventDetailData } = useEventDetailSuspenseQuery({ eventId });

  return (
    <>
      <div className={cx("content")}>
        <div className={cx("mobile_title_section")}>
          <EventInfo
            eventName={eventDetailData.eventName}
            venue={eventDetailData.venue}
            date={eventDetailData.date}
            time={eventDetailData.time}
            minAge={eventDetailData.minAge}
            details={eventDetailData.details}
            lineup={eventDetailData.lineup}
            showOnlyTitle={true}
          />
        </div>

        <ImageCarouselClient images={eventDetailData.images} />

        <div className={cx("info_section")}>
          <EventInfo
            eventName={eventDetailData.eventName}
            venue={eventDetailData.venue}
            date={eventDetailData.date}
            time={eventDetailData.time}
            minAge={eventDetailData.minAge}
            details={eventDetailData.details}
            lineup={eventDetailData.lineup}
            showOnlyTitle={false}
          />
        </div>
      </div>

      <FloatingSection eventId={eventId} />
    </>
  );
};
