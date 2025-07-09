import { Flex } from "@permit/design-system";

import { FloatingSection } from "./_clientBoundray/FloatingSection";
import { ImageCarouselClient } from "./_clientBoundray/ImageCarouselClient";
import { EventInfo } from "./_components/EventInfo";

interface Props {
  params: {
    id: string;
  };
}

// TODO: mock data 수정
export const data = {
  eventName: "Summer Vibes Festival",
  venue: "Seoul Olympic Stadium",
  date: "Sun-mon, 25-26 May 2025",
  time: "18:00 - 22:00",
  minAge: 19,
  details: "한여름 밤을 뜨겁게 달굴 뮤직 페스티벌!",
  lineup: [
    {
      category: "[Headliner]",
      artists: [{ name: "NewJeans" }, { name: "Zico" }],
    },
    {
      category: "[Opening Act]",
      artists: [{ name: "LUCY" }, { name: "10CM" }],
    },
  ],
  images: [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/58854041?v=4",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/70939232?v=4",
    },
  ],
};

/**
 * 이벤트 상세 페이지
 */
export const EventDetailPage = ({ params }: Props) => {
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
