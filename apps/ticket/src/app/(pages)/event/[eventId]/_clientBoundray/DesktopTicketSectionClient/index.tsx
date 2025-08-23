import { useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button, Flex, Select, TextField, Typography } from "@permit/design-system";
import { useDebounce, useSelect } from "@permit/design-system/hooks";
import { useEventTicketsSuspenseQuery } from "@/data/events/getEventTickets/queries";
import { useReservationReadyMutation } from "@/data/reservations/postReservationReady/mutation";
import { generateRandomString } from "@/shared/helpers/generateRandomString";
import { isAxiosErrorResponse } from "@/shared/types/axioxError";

import { TitleSection } from "../../_components/TitleSection";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type SelectedTicket = {
  ticketTypeId: number;
  count: number;
  ticketInfo: {
    ticketTypeName: string;
    ticketTypeDate: string;
    ticketTypeTime: string;
    ticketTypePrice: string;
  };
};

type Props = {
  eventId: string;
  eventName: string;
};

export const DesktopTicketSectionClient = ({ eventId, eventName }: Props) => {
  const router = useRouter();

  const { data: eventTicketsData } = useEventTicketsSuspenseQuery({ eventId });

  const [isLoading, setIsLoading] = useState(false);
  const selectedRound = eventTicketsData.rounds.find((round) => round.roundAvailable);
  const [selectedRoundId, setSelectedRoundId] = useState<number>(
    selectedRound?.roundId || eventTicketsData.rounds[0].roundId,
  );
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([]);
  const [isPromocodeOpen, setIsPromocodeOpen] = useState(false);

  const { mutateAsync: reservationReadyMutateAsync } = useReservationReadyMutation();

  const roundOptions = eventTicketsData.rounds.map((round) => {
    return {
      value: String(round.roundId),
      label: `${round.roundName} (${round.roundPrice})`,
      disabled: !round.roundAvailable,
    };
  });

  const ticketOptions = eventTicketsData.rounds.flatMap((round) =>
    round.ticketTypes.map((ticket) => ({
      value: String(ticket.ticketTypeId),
      label: ticket.ticketTypeName,
    })),
  );

  const roundSelect = useSelect({
    initialValue: selectedRoundId?.toString() || "",
    validate: (value) => {
      if (!value) return "Round를 선택해주세요!";

      return undefined;
    },
    onChange: (value) => {
      setSelectedRoundId(Number(value));
    },
  });

  const ticketSelect = useSelect({
    onChange: (value) => {
      const selectedRound = eventTicketsData.rounds.find(
        (round) => round.roundId === selectedRoundId,
      );

      const ticket = selectedRound?.ticketTypes.find(
        (ticket) => ticket.ticketTypeId === Number(value),
      );

      if (!ticket) return;

      // 이미 해당 티켓을 선택한 경우
      // TODO: 토스트 메시지 노출 추가
      if (selectedTickets.find((ticket) => ticket.ticketTypeId === Number(value))) {
        return;
      }

      setSelectedTickets((prev) => [
        ...prev,
        { ticketTypeId: Number(value), count: 1, ticketInfo: ticket },
      ]);

      ticketSelect.reset();
    },
  });

  const handleTicketCountChange = (ticketTypeId: number, change: number) => {
    setSelectedTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.ticketTypeId === ticketTypeId) {
          const newCount = ticket.count + change;

          return {
            ...ticket,
            count: Math.max(1, Math.min(10, newCount)), // 1~10개 제한
          };
        }

        return ticket;
      }),
    );
  };

  const calculateTotalPrice = () => {
    return selectedTickets.reduce((total, ticket) => {
      const price = parseInt(ticket.ticketInfo.ticketTypePrice.replace(/,/g, ""));

      return total + price * ticket.count;
    }, 0);
  };

  const handleBuyTicket = useDebounce(async () => {
    setIsLoading(true);

    if (selectedTickets.length === 0) {
      return;
    }

    try {
      const orderId = generateRandomString();

      // TODO: 프로모션 코드 로직 추가
      const requestData = {
        // eventId: Number(eventId),
        eventId: 2,
        totalAmount: calculateTotalPrice(),
        ticketTypeInfos: selectedTickets.map((ticket) => ({
          id: ticket.ticketTypeId,
          count: ticket.count,
        })),
      };

      await reservationReadyMutateAsync({ ...requestData, orderId });

      router.push(`/order/${orderId}`);
    } catch (error) {
      if (isAxiosErrorResponse(error)) {
        // TODO: 토스트나 커스텀 모달로 변경
        // 메시지 프론트 설정 필요
        alert(error.message);
      }

      setIsLoading(false);
    }
  });

  return (
    <div className={cx("wrap")}>
      <TitleSection eventName={eventName} />

      <div className={cx("ticket_section")}>
        <Flex className={cx("select_section")} direction="column" gap={12}>
          <Select
            type="default"
            placeholder="Round"
            options={roundOptions}
            {...roundSelect.selectProps}
          />

          <Select
            type="default"
            placeholder="Ticket"
            options={ticketOptions}
            {...ticketSelect.selectProps}
          />
        </Flex>

        {selectedTickets.length > 0 && (
          <div>
            <Flex className={cx("selected_tickets_wrap")} direction="column">
              <div>
                <button
                  className={cx("promo_code_button", {
                    open: isPromocodeOpen,
                  })}
                  onClick={() => setIsPromocodeOpen((prev) => !prev)}
                >
                  {isPromocodeOpen ? "Enter Promo Code" : "Have a Promo Code?"}
                </button>

                {isPromocodeOpen && (
                  <>
                    <Typography className={cx("promo_code_notice")} type="body14" color="red">
                      * Only one per purchase
                    </Typography>
                    <Flex className={cx("promo_code_input_wrap")} gap={12}>
                      <TextField
                        className={cx("promo_code_input")}
                        fullWidth
                        placeholder="promotion code"
                      />
                      <Button
                        variant="secondary"
                        onClick={() => {
                          // TODO: 할인 적용 로직 추가
                        }}
                      >
                        Confirm
                      </Button>
                    </Flex>
                  </>
                )}
              </div>

              <Flex className={cx("selected_tickets_list")} direction="column" gap={12}>
                {selectedTickets.map((selectedTicket) => (
                  <Flex
                    key={selectedTicket.ticketTypeId}
                    className={cx("selected_ticket_item")}
                    align="center"
                    justify="space-between"
                    gap={12}
                  >
                    <Flex direction="column" gap={4}>
                      <Typography type="body14" weight="medium">
                        {selectedTicket.ticketInfo.ticketTypeName}
                      </Typography>
                      <Typography type="body12" color="gray500">
                        {selectedTicket.ticketInfo.ticketTypeDate},{" "}
                        {selectedTicket.ticketInfo.ticketTypeTime}
                      </Typography>
                    </Flex>

                    <Flex align="center" gap={8}>
                      <Flex direction="column" align="center" gap={2}>
                        <Flex align="center" gap={6}>
                          <button
                            className={cx("count_button")}
                            onClick={() => handleTicketCountChange(selectedTicket.ticketTypeId, -1)}
                            disabled={selectedTicket.count <= 1}
                          >
                            −
                          </button>
                          <div className={cx("count_display")}>
                            <span>{selectedTicket.count}</span>
                          </div>
                          <button
                            className={cx("count_button")}
                            onClick={() => handleTicketCountChange(selectedTicket.ticketTypeId, 1)}
                            disabled={selectedTicket.count >= 10}
                          >
                            +
                          </button>
                        </Flex>
                      </Flex>

                      <Flex direction="column" align="center" gap={2}>
                        <Typography type="body14" weight="medium">
                          ₩
                          {(
                            parseInt(selectedTicket.ticketInfo.ticketTypePrice.replace(/,/g, "")) *
                            selectedTicket.count
                          ).toLocaleString()}
                        </Typography>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </div>
        )}
      </div>
      <Button
        className={cx("buy_button")}
        variant="cta"
        isLoading={isLoading}
        disabled={selectedTickets.length === 0}
        onClick={handleBuyTicket}
        fullWidth
      >
        {selectedTickets.length === 0 ? "Select Ticket Type" : "Buy Ticket"}
      </Button>
    </div>
  );
};
