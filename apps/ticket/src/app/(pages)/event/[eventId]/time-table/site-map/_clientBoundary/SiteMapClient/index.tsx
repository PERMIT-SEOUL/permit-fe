"use client";

import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button, Flex, Typography } from "@permit/design-system";
import { useTimetablesSuspenseQuery } from "@/data/events/getTimetables/queries";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: string;
};

export const SiteMapClient = ({ eventId }: Props) => {
  const router = useRouter();

  const { data: timetablesData } = useTimetablesSuspenseQuery({
    eventId,
    options: {
      refetchOnWindowFocus: true,
    },
  });

  const handleBackButtonClick = () => {
    // router.replace(`/event/${eventId}/time-table`);
  };

  const handleFavoriteClick = () => {};

  return (
    <div>
      <header className={cx("header")}>
        <Flex gap={8} justify="space-between">
          <Flex direction="column" gap={16}>
            <Typography type="title20">{timetablesData.eventName}</Typography>

            <Flex gap={8}>
              <Button
                variant="secondary"
                onClick={() => router.push(`/event/${eventId}/time-table`)}
              >
                {"TIME TABLE"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push(`/event/${eventId}/time-table/site-map`)}
              >
                {"MAP VIEW"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </header>
    </div>
  );
};
