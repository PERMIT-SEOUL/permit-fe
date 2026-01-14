"use client";

import classNames from "classnames/bind";

import { Flex } from "@permit/design-system";
import { useEventDetailSuspenseQuery } from "@/data/events/getEventDetail/queries";

import { EventInfo } from "../../_components/EventInfo";
import { TitleSection } from "../../_components/TitleSection";
import { DesktopTicketSectionClient } from "../DesktopTicketSectionClient";
import { ImageCarouselClient } from "../ImageCarouselClient";
import { MobileFloatingSection } from "../MobileFloatingSection";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: string;
};

export const EventDetailClient = ({ eventId }: Props) => {
  const { data: eventDetailData } = useEventDetailSuspenseQuery({
    eventId,
    options: { refetchOnWindowFocus: true },
  });

  return (
    <>
      <Flex justify="center">
        <div className={cx("content")}>
          <div className={cx("mobile_title_section")}>
            <TitleSection eventName={eventDetailData.eventName} eventId={eventId} />
          </div>

          <ImageCarouselClient images={eventDetailData.images} />

          <DesktopTicketSectionClient eventId={eventId} eventName={eventDetailData.eventName} />

          <div className={cx("info_section")}>
            <EventInfo
              eventName={eventDetailData.eventName}
              venue={eventDetailData.venue}
              date={eventDetailData.date}
              time={eventDetailData.time}
              minAge={eventDetailData.minAge}
              details={eventDetailData.details}
              lineup={eventDetailData.lineup}
            />
          </div>
        </div>
      </Flex>

      <MobileFloatingSection eventId={eventId} />
    </>
  );
};
