"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button, Flex, Select, TextField, Typography } from "@permit/design-system";
import { useSelect, useTextField } from "@permit/design-system/hooks";
import { type TicketData, TicketForm } from "@/app/events/create/_components/TicketForm";
import { useEventDetailQuery } from "@/data/admin/getEventDetail/queries";
import { useTicketsMutation } from "@/data/admin/postTickets/mutation";
import {
  isValidTime,
  REQUIRED_FIELDS_MESSAGE,
  TICKET_REQUIREMENT_NOTICE,
  type TicketErrors,
  validateTicket,
  validateTickets,
} from "@/shared/helpers/validation";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: number;
};

export function AddRoundFormClient({ eventId }: Props) {
  const router = useRouter();
  const [newRoundData, setNewRoundData] = useState({
    ticketRoundName: "",
    roundSalesStartDate: "",
    roundSalesEndDate: "",
    roundSalesStartTime: "",
    roundSalesEndTime: "",
  });

  const [ticketErrors, setTicketErrors] = useState<Record<string, TicketErrors>>({});
  const [ticketTypes, setTicketTypes] = useState<TicketData[]>([]);

  const { mutateAsync: createTickets } = useTicketsMutation({
    eventId,
  });

  const { data: eventDetailData } = useEventDetailQuery({
    eventId,
    options: {
      refetchOnWindowFocus: true,
    },
  });

  // 티켓 라운드 이름 필드
  const ticketRoundNameField = useTextField({
    initialValue: newRoundData.ticketRoundName,
    validate: (value: string) => {
      if (!value.trim()) return "티켓 차수 이름을 입력해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setNewRoundData((prev) => ({ ...prev, ticketRoundName: value }));
    },
  });

  // 티켓 차수 판매 시작 날짜 필드
  const roundSalesStartDateField = useSelect({
    initialValue: newRoundData.roundSalesStartDate,
    validate: (value: string) => {
      if (!value) return "티켓 차수 판매 시작 날짜를 선택해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setNewRoundData((prev) => ({ ...prev, roundSalesStartDate: value }));
    },
  });

  // 티켓 차수 판매 종료 날짜 필드
  const roundSalesEndDateField = useSelect({
    initialValue: newRoundData.roundSalesEndDate,
    validate: (value: string) => {
      if (!value) return "티켓 차수 판매 종료 날짜를 선택해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setNewRoundData((prev) => ({ ...prev, roundSalesEndDate: value }));
    },
  });

  // 티켓 차수 판매 시작 시간 필드
  const roundSalesStartTimeField = useTextField({
    initialValue: newRoundData.roundSalesStartTime,
    validate: (value: string) => {
      if (!value.trim()) return "티켓 차수 판매 시작 시간을 입력해주세요.";

      if (!isValidTime(value)) return "올바른 시간 형식이 아닙니다. (HH:MM)";

      return undefined;
    },
    onChange: (value: string) => {
      setNewRoundData((prev) => ({ ...prev, roundSalesStartTime: value }));
    },
  });

  // 티켓 차수 판매 종료 시간 필드
  const roundSalesEndTimeField = useTextField({
    initialValue: newRoundData.roundSalesEndTime,
    validate: (value: string) => {
      if (!value.trim()) return "티켓 차수 판매 종료 시간을 입력해주세요.";

      if (!isValidTime(value)) return "올바른 시간 형식이 아닙니다. (HH:MM)";

      return undefined;
    },
    onChange: (value: string) => {
      setNewRoundData((prev) => ({ ...prev, roundSalesEndTime: value }));
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

    // 에러가 표시된 티켓은 수정할 때마다 다시 검증
    if (ticketErrors[ticketId]) {
      setTicketErrors((prev) => ({ ...prev, [ticketId]: validateTicket(updatedTicket) }));
    }
  };

  const handleDeleteTicket = (ticketId: string) => {
    setTicketTypes((prev) => prev.filter((ticket) => ticket.id !== ticketId));
    setTicketErrors(({ [ticketId]: _removed, ...rest }) => rest);
  };

  // 필수값 검증. 실패하면 각 필드 아래에 에러 표시
  const validateForm = () => {
    const results = [
      ticketRoundNameField.validateValue(),
      roundSalesStartDateField.validateValue(),
      roundSalesStartTimeField.validateValue(),
      roundSalesEndDateField.validateValue(),
      roundSalesEndTimeField.validateValue(),
    ];

    const nextTicketErrors = validateTickets(ticketTypes);

    setTicketErrors(nextTicketErrors);

    return results.every(Boolean) && Object.keys(nextTicketErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert(REQUIRED_FIELDS_MESSAGE);

      return;
    }

    const requestData = {
      ticketRoundName: newRoundData.ticketRoundName,
      ticketRoundSalesStartDate: `${newRoundData.roundSalesStartDate} ${newRoundData.roundSalesStartTime}`,
      ticketRoundSalesEndDate: `${newRoundData.roundSalesEndDate} ${newRoundData.roundSalesEndTime}`,
      ticketTypes: ticketTypes.map((ticket) => ({
        name: ticket.ticketName,
        price: ticket.price,
        totalCount: ticket.ticketCount,
        startDate: `${ticket.ticketStartDate} ${ticket.ticketStartTime}`,
        endDate: `${ticket.ticketEndDate} ${ticket.ticketEndTime}`,
      })),
    };

    try {
      await createTickets(requestData);
      alert("티켓(라운드)이 성공적으로 등록되었습니다.");
      router.replace(`/events/${eventId}/edit`);
    } catch (error) {
      alert("티켓 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Error creating tickets:", error);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("sidebar")} />

      <div className={cx("content")}>
        <div className={cx("header")}>
          <Typography type="title24">
            {eventDetailData?.name} <span className={cx("subtitle")}>티켓 라운드 추가</span>
          </Typography>
          <Typography type="body14" color="red">
            {TICKET_REQUIREMENT_NOTICE}
          </Typography>
        </div>

        <Flex className={cx("form")} direction="column" gap={24}>
          <Flex className={cx("form_row")} gap={24}>
            <Flex className={cx("row")} direction="column" gap={12}>
              <Flex align="flex-start" gap={8}>
                <Typography type="body16" weight="bold">
                  Ticket Round Name
                </Typography>
                <div className={cx("required")}>*</div>
              </Flex>
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

          <Flex className={cx("form_row")} gap={24}>
            <Flex className={cx("row")} direction="column" gap={12}>
              <Flex align="flex-start" gap={8}>
                <Typography type="body16" weight="bold">
                  Sales Start Date
                </Typography>
                <div className={cx("required")}>*</div>
              </Flex>
              <Select
                type="calendar"
                placeholder="티켓 차수 판매 시작 날짜를 선택해주세요"
                {...roundSalesStartDateField.selectProps}
              />
            </Flex>
            <Flex className={cx("row")} direction="column" gap={12}>
              <Flex align="flex-start" gap={8}>
                <Typography type="body16" weight="bold">
                  Sales Start Time
                </Typography>
                <div className={cx("required")}>*</div>
              </Flex>
              <TextField
                placeholder="티켓 차수 판매 시작 시간을 입력해주세요 (HH:MM)"
                value={roundSalesStartTimeField.value}
                onChange={roundSalesStartTimeField.handleChange}
                error={roundSalesStartTimeField.error}
              />
            </Flex>
          </Flex>

          <Flex className={cx("form_row")} gap={24}>
            <Flex className={cx("row")} direction="column" gap={12}>
              <Flex align="flex-start" gap={8}>
                <Typography type="body16" weight="bold">
                  Sales End Date
                </Typography>
                <div className={cx("required")}>*</div>
              </Flex>
              <Select
                type="calendar"
                placeholder="티켓 차수 판매 종료 날짜를 선택해주세요"
                {...roundSalesEndDateField.selectProps}
              />
            </Flex>

            <Flex className={cx("row")} direction="column" gap={12}>
              <Flex align="flex-start" gap={8}>
                <Typography type="body16" weight="bold">
                  Sales End Time
                </Typography>
                <div className={cx("required")}>*</div>
              </Flex>
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
              errors={ticketErrors[ticket.id]}
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
            <div className={cx("floating_content")}>
              <Button variant="cta" size="md" onClick={handleSubmit}>
                Save Round
              </Button>
            </div>
          </div>
        </Flex>
      </div>
    </div>
  );
}
