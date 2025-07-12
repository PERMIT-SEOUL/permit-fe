import { Flex } from "@permit/design-system";

import { FloatingSection } from "./_clientBoundray/FloatingSection";
import { ImageCarouselClient } from "./_clientBoundray/ImageCarouselClient";
import { EventInfo } from "./_components/EventInfo";
import { data } from "./constants/mock";

interface Props {
  params: {
    eventId: string;
  };
}

/**
 * 이벤트 상세 페이지
 */
export const EventDetailPage = ({ params }: Props) => {
  const { eventId } = params;

  return (
    <>
      <Flex>
        <ImageCarouselClient images={data.images} />
        <EventInfo
          eventName={data.eventName}
          venue={data.venue}
          date={data.date}
          time={data.time}
          minAge={data.minAge}
          details={data.details}
          lineup={data.lineup}
        />
      </Flex>

      <FloatingSection />
    </>
  );
};

export default EventDetailPage;
