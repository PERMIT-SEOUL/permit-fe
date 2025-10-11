"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button, Flex, Select, TextField, Typography } from "@permit/design-system";
import { useSelect, useTextField } from "@permit/design-system/hooks";
import { type TicketData, TicketForm } from "@/app/events/create/_components/TicketForm";
import { useEventDetailSuspenseQuery } from "@/data/admin/getEventDetail/queries";
import { useTicketsDetailSuspenseQuery } from "@/data/admin/getTicketsDetail/queries";
import { usePatchTicketsMutation } from "@/data/admin/patchTickets/mutation";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: number;
  ticketRoundId: number;
};

export function EditTicketDetailFormClient({ eventId, ticketRoundId }: Props) {
  const router = useRouter();

  const { data: eventDetailData } = useEventDetailSuspenseQuery({
    eventId,
  });

  const { data: ticketsDetail } = useTicketsDetailSuspenseQuery({
    ticketRoundId,
  });

  const { mutateAsync: updateTickets } = usePatchTicketsMutation({});

  const [ticketTypes, setTicketTypes] = useState<TicketData[]>(() => {
    return ticketsDetail.ticketTypes.map((ticket) => ({
      id: ticket.ticketTypeId.toString(),
      ticketName: ticket.ticketTypeName,
      price: ticket.ticketTypePrice,
      ticketCount: ticket.ticketTypeCount,
      ticketStartDate: ticket.ticketTypeStartDate,
      ticketStartTime: ticket.ticketTypeStartTime,
      ticketEndDate: ticket.ticketTypeEndDate,
      ticketEndTime: ticket.ticketTypeEndTime,
    }));
  });

  // ticketsDetail이 변경될 때마다 ticketTypes 업데이트
  useEffect(() => {
    const updatedTickets = ticketsDetail.ticketTypes.map((ticket) => ({
      id: ticket.ticketTypeId.toString(),
      ticketName: ticket.ticketTypeName,
      price: ticket.ticketTypePrice,
      ticketCount: ticket.ticketTypeCount,
      ticketStartDate: ticket.ticketTypeStartDate,
      ticketStartTime: ticket.ticketTypeStartTime,
      ticketEndDate: ticket.ticketTypeEndDate,
      ticketEndTime: ticket.ticketTypeEndTime,
    }));

    setTicketTypes(updatedTickets);
  }, [ticketsDetail.ticketTypes]);

  // 티켓 라운드 이름 필드
  const ticketRoundNameField = useTextField({
    initialValue: ticketsDetail.ticketRoundName || "",
    validate: (value: string) => {
      if (!value.trim()) return "티켓 차수 이름을 입력해주세요.";

      return undefined;
    },
  });

  // 티켓 차수 판매 시작 날짜 필드
  const roundSalesStartDateField = useSelect({
    initialValue: ticketsDetail.ticketRoundSalesStartDate || "",
    validate: (value: string) => {
      if (!value) return "티켓 차수 판매 시작 날짜를 선택해주세요.";

      return undefined;
    },
  });

  // 티켓 차수 판매 종료 날짜 필드
  const roundSalesEndDateField = useSelect({
    initialValue: ticketsDetail.ticketRoundSalesEndDate || "",
    validate: (value: string) => {
      if (!value) return "티켓 차수 판매 종료 날짜를 선택해주세요.";

      return undefined;
    },
  });

  // 티켓 차수 판매 시작 시간 필드
  const roundSalesStartTimeField = useTextField({
    initialValue: ticketsDetail.ticketRoundSalesStartTime || "",
    validate: (value: string) => {
      if (!value.trim()) return "티켓 차수 판매 시작 시간을 입력해주세요.";

      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

      if (!timeRegex.test(value)) return "올바른 시간 형식이 아닙니다. (HH:MM)";

      return undefined;
    },
  });

  // 티켓 차수 판매 종료 시간 필드
  const roundSalesEndTimeField = useTextField({
    initialValue: ticketsDetail.ticketRoundSalesEndTime || "",
    validate: (value: string) => {
      if (!value.trim()) return "티켓 차수 판매 종료 시간을 입력해주세요.";

      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

      if (!timeRegex.test(value)) return "올바른 시간 형식이 아닙니다. (HH:MM)";

      return undefined;
    },
  });

  const handleAddTicket = () => {
    const newTicket: TicketData = {
      id: `ticket-${Date.now()}`,
      ticketName: "",
      price: 0,
      ticketCount: 0,
      ticketStartDate: "",
      ticketStartTime: "",
      ticketEndDate: "",
      ticketEndTime: "",
    };

    setTicketTypes((prev) => [...prev, newTicket]);
  };

  const handleUpdateTicket = (ticketId: string, updatedTicket: TicketData) => {
    setTicketTypes((prev) =>
      prev.map((ticket) => (ticket.id === ticketId ? updatedTicket : ticket)),
    );
  };

  const handleDeleteTicket = (ticketId: string) => {
    setTicketTypes((prev) => prev.filter((ticket) => ticket.id !== ticketId));
  };

  const handleSubmit = async () => {
    const requestData = {
      ticketRoundId,
      ticketRoundName: ticketRoundNameField.value,
      ticketRoundSalesStartDate: `${roundSalesStartDateField.value} ${roundSalesStartTimeField.value}`,
      ticketRoundSalesEndDate: `${roundSalesEndDateField.value} ${roundSalesEndTimeField.value}`,
      ticketTypes: ticketTypes.map((ticket) => ({
        id: ticket.id.startsWith("ticket-") ? null : Number(ticket.id), // 새 티켓은 ID 없음
        name: ticket.ticketName,
        price: ticket.price,
        totalCount: ticket.ticketCount,
        startDate: `${ticket.ticketStartDate} ${ticket.ticketStartTime}`,
        endDate: `${ticket.ticketEndDate} ${ticket.ticketEndTime}`,
      })),
    };

    try {
      await updateTickets(requestData);
      alert("티켓(라운드)이 성공적으로 수정되었습니다.");
      router.replace(`/events/${eventId}/edit`);
    } catch (error) {
      alert("티켓 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Error updating tickets:", error);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("sidebar")} />

      <div className={cx("content")}>
        <div className={cx("header")}>
          <Typography type="title24">
            {eventDetailData.name} <span className={cx("subtitle")}>티켓 라운드 수정</span>
          </Typography>
        </div>

        <Flex className={cx("form")} direction="column" gap={24}>
          <Flex gap={24}>
            <Flex className={cx("row")} direction="column" gap={12}>
              <Typography type="body16" weight="bold">
                Ticket Round Name
              </Typography>
              <TextField
                placeholder="티켓 차수 이름을 입력해주세요"
                value={ticketRoundNameField.value}
                onChange={ticketRoundNameField.handleChange}
                error={ticketRoundNameField.error}
              />
            </Flex>
          </Flex>

          <div>
            <Typography type="body16" weight="bold">
              Sales period
            </Typography>
            <Typography type="body12" color="gray300">
              Date & Time
            </Typography>
          </div>

          <Flex gap={24}>
            <Flex className={cx("row")} direction="column" gap={12}>
              <Typography type="body16" weight="bold">
                Sales Start Date
              </Typography>
              <Select
                type="calendar"
                placeholder="티켓 차수 판매 시작 날짜를 선택해주세요"
                {...roundSalesStartDateField.selectProps}
              />
            </Flex>
            <Flex className={cx("row")} direction="column" gap={12}>
              <Typography type="body16" weight="bold">
                Sales End Date
              </Typography>
              <Select
                type="calendar"
                placeholder="티켓 차수 판매 종료 날짜를 선택해주세요"
                {...roundSalesEndDateField.selectProps}
              />
            </Flex>
          </Flex>

          <Flex gap={24}>
            <Flex className={cx("row")} direction="column" gap={12}>
              <Typography type="body16" weight="bold">
                Sales Start Time
              </Typography>
              <TextField
                placeholder="티켓 차수 판매 시작 시간을 입력해주세요 (HH:MM)"
                value={roundSalesStartTimeField.value}
                onChange={roundSalesStartTimeField.handleChange}
                error={roundSalesStartTimeField.error}
              />
            </Flex>
            <Flex className={cx("row")} direction="column" gap={12}>
              <Typography type="body16" weight="bold">
                Sales End Time
              </Typography>
              <TextField
                placeholder="티켓 차수 판매 종료 시간을 입력해주세요 (HH:MM)"
                value={roundSalesEndTimeField.value}
                onChange={roundSalesEndTimeField.handleChange}
                error={roundSalesEndTimeField.error}
              />
            </Flex>
          </Flex>

          {/* 티켓 추가 버튼 */}
          <Button variant="cta" size="md" onClick={handleAddTicket}>
            Add Ticket
          </Button>

          {/* 티켓 폼들 */}
          {ticketTypes.map((ticket) => (
            <TicketForm
              key={ticket.id}
              ticketData={ticket}
              onUpdate={(updatedTicket) => handleUpdateTicket(ticket.id, updatedTicket)}
              onDelete={() => handleDeleteTicket(ticket.id)}
              ticketNameField={{
                value: ticket.ticketName,
                handleChange: (e) => {
                  handleUpdateTicket(ticket.id, { ...ticket, ticketName: e.target.value });
                },
              }}
              priceField={{
                value: ticket.price.toString(),
                handleChange: (e) => {
                  handleUpdateTicket(ticket.id, { ...ticket, price: Number(e.target.value) });
                },
              }}
              ticketCountField={{
                value: ticket.ticketCount.toString(),
                handleChange: (e) => {
                  handleUpdateTicket(ticket.id, { ...ticket, ticketCount: Number(e.target.value) });
                },
              }}
              ticketStartDateField={{
                value: ticket.ticketStartDate,
                onChange: (value: string) => {
                  handleUpdateTicket(ticket.id, { ...ticket, ticketStartDate: value });
                },
              }}
              ticketEndDateField={{
                value: ticket.ticketEndDate,
                onChange: (value: string) => {
                  handleUpdateTicket(ticket.id, { ...ticket, ticketEndDate: value });
                },
              }}
              ticketStartTimeField={{
                value: ticket.ticketStartTime,
                handleChange: (e) => {
                  handleUpdateTicket(ticket.id, { ...ticket, ticketStartTime: e.target.value });
                },
              }}
              ticketEndTimeField={{
                value: ticket.ticketEndTime,
                handleChange: (e) => {
                  handleUpdateTicket(ticket.id, { ...ticket, ticketEndTime: e.target.value });
                },
              }}
            />
          ))}

          <div className={cx("floating")}>
            <Button variant="cta" size="md" onClick={handleSubmit}>
              Save Round
            </Button>
          </div>
        </Flex>
      </div>
    </div>
  );
}
