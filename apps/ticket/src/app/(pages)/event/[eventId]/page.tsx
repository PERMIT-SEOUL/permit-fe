import { Flex } from "@permit/design-system";

import { FloatingSection } from "./_clientBoundray/FloatingSection";
import { ImageCarouselClient } from "./_clientBoundray/ImageCarouselClient";
import { EventInfo } from "./_components/EventInfo";
import { mockEvent } from "./constants/mock";

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
      <Flex>
        <ImageCarouselClient images={mockEvent.images} />
        <EventInfo
          eventName={mockEvent.eventName}
          venue={mockEvent.venue}
          date={mockEvent.date}
          time={mockEvent.time}
          minAge={mockEvent.minAge}
          details={mockEvent.details}
          lineup={mockEvent.lineup}
        />
      </Flex>

      <FloatingSection eventId={Number(eventId)} />
    </>
  );
};

export default EventDetailPage;
