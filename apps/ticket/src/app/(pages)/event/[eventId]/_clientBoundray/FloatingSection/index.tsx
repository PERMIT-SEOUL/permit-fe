"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { Button } from "@permit/design-system";
import { sampleOptions } from "@/data/sample/getTodoItem/queries";
import { useModal } from "@/shared/hooks/useModal";

import { mockRounds } from "../../constants/mock";
import { SelectTicketModal } from "../SelectTicketModal";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: number;
};

export const FloatingSection = ({ eventId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { show: openDialog } = useModal(SelectTicketModal);

  // TODO: 행사 티켓 정보 조회 API 로 변경
  const { refetch } = useQuery({ ...sampleOptions(), enabled: false });

  const selectTicket = async () => {
    setIsLoading(true);

    try {
      // TODO: eventId 로 티켓 정보 조회
      const { data } = await refetch();

      const result = await openDialog({ title: "티켓 선택", eventId: 2, ticketInfo: mockRounds });

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
