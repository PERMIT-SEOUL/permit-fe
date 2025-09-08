import { useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import {
  BottomSheet,
  Button,
  Flex,
  Icon,
  Select,
  TextField,
  Typography,
} from "@permit/design-system";
import { useDebounce, useSelect } from "@permit/design-system/hooks";
import { EventTicketsResponse } from "@/data/events/getEventTickets/types";
import { useReservationReadyMutation } from "@/data/reservations/postReservationReady/mutation";
import { generateRandomString } from "@/shared/helpers/generateRandomString";
import { BottomSheetComponentProps } from "@/shared/hooks";
import { isAxiosErrorResponse } from "@/shared/types/axioxError";

import { calculateTotalPrice } from "../../_helpers/calculateTotalPrice";
import { SelectedTicket } from "../DesktopTicketSectionClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  title: string;
  eventTicketsData: EventTicketsResponse;
  eventId: string;
} & BottomSheetComponentProps<string>;

export const SelectTicketBottomSheet = ({
  isOpen,
  close,
  title,
  eventId,
  eventTicketsData,
}: Props) => {
  return (
    <BottomSheet open={isOpen} onClose={() => close("cancelled")} title={title}>
      <SelectTicketBottomSheetContent eventTicketsData={eventTicketsData} eventId={eventId} />
    </BottomSheet>
  );
};

const SelectTicketBottomSheetContent = ({
  eventTicketsData,
  eventId,
}: {
  eventTicketsData: EventTicketsResponse;
  eventId: string;
}) => {
  const router = useRouter();

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

  const ticketOptions = eventTicketsData.rounds.flatMap((round) => {
    if (round.roundAvailable) {
      return round.ticketTypes.map((ticket) => ({
        value: String(ticket.ticketTypeId),
        label: `${ticket.ticketTypeName} - ₩ ${ticket.ticketTypePrice}`,
      }));
    }

    return [];
  });

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

  const handleRemoveTicket = (ticketTypeId: number) => {
    setSelectedTickets((prev) => prev.filter((ticket) => ticket.ticketTypeId !== ticketTypeId));
  };

  const handleBuyTicket = useDebounce(async () => {
    setIsLoading(true);

    if (selectedTickets.length === 0) {
      return;
    }

    try {
      const orderId = generateRandomString();

      // TODO: 쿠폰 관련해서........... 하나를 적용완료하면 다른 건 클릭을 못하게? => 클릭 금지 상태 추가?
      // TODO: totalPrice 보여주는 부분 수정하기.................
      const requestData = {
        eventId,
        totalAmount: calculateTotalPrice(selectedTickets),
        ticketTypeInfos: selectedTickets.map((ticket) => ({
          id: ticket.ticketTypeId,
          count: ticket.count,
        })),
      };

      await reservationReadyMutateAsync({ ...requestData, orderId });

      window.location.href = `/order/${orderId}`;
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
    <>
      <BottomSheet.Content className={cx("content")}>
        <div>
          <Flex direction="column" gap={16}>
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
        </div>

        {selectedTickets.length > 0 && (
          <div className={cx("ticket_wrap")}>
            <Flex className={cx("selected_tickets_wrap")} direction="column">
              <div className={cx("promo_code_wrap")}>
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
                    <Typography className={cx("promo_code_notice")} type="body14" color="gray400">
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
                            <Icon.Minus fill="gray400" size={20} />
                          </button>
                          <div className={cx("count_display")}>
                            <span>{selectedTicket.count}</span>
                          </div>
                          <button
                            className={cx("count_button")}
                            onClick={() => handleTicketCountChange(selectedTicket.ticketTypeId, 1)}
                            disabled={selectedTicket.count >= 10}
                          >
                            <Icon.Plus fill="gray400" size={20} />
                          </button>
                        </Flex>
                      </Flex>

                      <button
                        onClick={() => handleRemoveTicket(selectedTicket.ticketTypeId)}
                        className={cx("close_button")}
                      >
                        <Icon.Close fill="gray400" size={16} />
                      </button>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>

            <Flex className={cx("total_price_wrap")} align="center" justify="space-between" gap={8}>
              <Typography type="body16" weight="medium">
                Total
              </Typography>
              <Typography type="body14" weight="medium">
                ₩ {calculateTotalPrice(selectedTickets).toLocaleString()}
              </Typography>
            </Flex>
          </div>
        )}
      </BottomSheet.Content>

      <BottomSheet.Bottom>
        <Button
          fullWidth
          variant="cta"
          isLoading={isLoading}
          disabled={selectedTickets.length === 0}
          onClick={handleBuyTicket}
        >
          {selectedTickets.length === 0 ? "Select Ticket Type" : "Buy Ticket"}
        </Button>
      </BottomSheet.Bottom>
    </>
  );
};
