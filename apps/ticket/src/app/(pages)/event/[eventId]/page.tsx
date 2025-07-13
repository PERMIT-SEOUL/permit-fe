import { Flex } from "@permit/design-system";

import { FloatingSection } from "./_clientBoundray/FloatingSection";
import { ImageCarouselClient } from "./_clientBoundray/ImageCarouselClient";
import { EventInfo } from "./_components/EventInfo";
import { data } from "./constants/mock";

type Props = {
  params: Promise<{ eventId: string }>;
};

/**
 * 이벤트 상세 페이지
 */
const EventDetailPage = async ({ params }: Props) => {
  const { eventId } = await params;

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

      <FloatingSection eventId={Number(eventId)} />
    </>
  );
};

export default EventDetailPage;
