"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { Button } from "@permit/design-system";
import { eventTicketsOptions } from "@/data/events/getEventTickets/queries";
import { useBottomSheet } from "@/shared/hooks";

import { SelectTicketBottomSheet } from "../SelectTicketBottomSheet";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: string;
  minAge: number;
};

export const MobileFloatingSection = ({ eventId, minAge }: Props) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { show: openBottomSheet } = useBottomSheet(SelectTicketBottomSheet);
  const selectTicket = async () => {
    setIsLoading(true);

    try {
      const eventTicketsData = await queryClient.fetchQuery(eventTicketsOptions({ eventId }));

      const result = await openBottomSheet({
        title: "티켓 선택",
        eventTicketsData,
        eventId,
        minAge,
      });

      if (!result) {
        return;
      }
    } catch {
      // TODO: 에러 처리 추가
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cx("floating")}>
      <Button
        className={cx("button")}
        fullWidth
        variant="primary"
        size="md"
        isLoading={isLoading}
        onClick={selectTicket}
      >
        Buy Ticket
      </Button>
    </div>
  );
};
