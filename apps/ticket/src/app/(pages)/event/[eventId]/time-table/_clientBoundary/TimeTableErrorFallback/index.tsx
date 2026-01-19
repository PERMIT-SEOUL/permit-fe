"use client";

import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button, Flex, Typography } from "@permit/design-system";
import { useEventDetailQuery } from "@/data/events/getEventDetail/queries";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: string;
};

export const TimeTableErrorFallback = ({ eventId }: Props) => {
  const router = useRouter();

  const {
    data: eventDetailData,
    isLoading,
    error,
  } = useEventDetailQuery({
    eventId,
  });

  const handleBackButtonClick = () => {
    router.push(`/event/${eventId}`);
  };

  if (isLoading) {
    return <LoadingWithLayout />;
  }

  if (error) {
    throw error;
  }

  return (
    <>
      <header className={cx("header")}>
        <Flex gap={8} justify="space-between">
          <Flex direction="column" gap={16}>
            <Typography type="title20">{eventDetailData?.eventName}</Typography>

            <Button
              className={cx("back_button")}
              variant="secondary"
              onClick={handleBackButtonClick}
            >
              {"< back"}
            </Button>

            <Flex gap={8}>
              <Button
                variant="secondary"
                onClick={() => router.push(`/event/${eventId}/time-table`)}
              >
                {"Timetable"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push(`/event/${eventId}/time-table/site-map`)}
              >
                {"Sitemap"}
              </Button>
            </Flex>
          </Flex>
          <></>
        </Flex>
      </header>

      <Flex
        direction="column"
        align="center"
        justify="center"
        gap={16}
        style={{ height: "calc(100vh - 150px)" }}
      >
        <Typography type="title20">아직 타임테이블이 등록되지 않았어요.</Typography>
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            window.location.href = `/event/${eventId}`;
          }}
        >
          이벤트 보기
        </Button>
      </Flex>
    </>
  );
};
