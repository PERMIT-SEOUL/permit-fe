import { useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button, Dialog, Flex, TextField, Typography } from "@permit/design-system";
import { useDebounce } from "@permit/design-system/hooks";
import { Round } from "@/data/events/getEventTickets/types";
import { useReservationReadyMutation } from "@/data/reservations/postReservationReady/mutation";
import { generateRandomString } from "@/shared/helpers/generateRandomString";
import { ModalComponentProps } from "@/shared/hooks/useModal/types";
import { isAxiosErrorResponse } from "@/shared/types/axioxError";

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
  title: string;
  eventId: number;
  ticketInfo: Round[];
} & ModalComponentProps<{ result: boolean }>;

/**
 * 티켓 선택 모달
 */
export const SelectTicketModal = ({ isOpen, close, title, eventId, ticketInfo }: Props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([]);

  const selectedRound = ticketInfo.find((round) => round.roundAvailable);
  const [selectedRoundId, setSelectedRoundId] = useState(
    selectedRound?.roundId || ticketInfo[0].roundId,
  );

  const [isPromocodeOpen, setIsPromocodeOpen] = useState(false);

  const { mutateAsync } = useReservationReadyMutation();

  const handleTicketSelect = (ticketTypeId: number) => {
    const ticket = selectedRound?.ticketTypes.find(
      (ticket) => ticket.ticketTypeId === ticketTypeId,
    );

    if (!ticket) return;

    const existingTicketIndex = selectedTickets.findIndex(
      (selected) => selected.ticketTypeId === ticketTypeId,
    );

    if (existingTicketIndex >= 0) {
      // 이미 선택된 티켓이면 제거
      setSelectedTickets((prev) => prev.filter((_, index) => index !== existingTicketIndex));
    } else {
      // 새로운 티켓 추가
      const newTicket: SelectedTicket = {
        ticketTypeId,
        count: 1,
        ticketInfo: {
          ticketTypeName: ticket.ticketTypeName,
          ticketTypeDate: ticket.ticketTypeDate,
          ticketTypeTime: ticket.ticketTypeTime,
          ticketTypePrice: ticket.ticketTypePrice,
        },
      };

      setSelectedTickets((prev) => [...prev, newTicket]);
    }
  };

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
        eventId,
        totalAmount: calculateTotalPrice(),
        ticketTypeInfos: selectedTickets.map((ticket) => ({
          id: ticket.ticketTypeId,
          count: ticket.count,
        })),
      };

      await mutateAsync({ ...requestData, orderId });

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

  // TODO: 차수별, 날짜별 뷰 다르게 수정
  return (
    <Dialog open={isOpen} title={title} onClose={() => close()}>
      {/* TODO: onClick={close} 와 리턴이 다른 이유 확인 */}
      <Dialog.Content>
        <Flex direction="column" gap={8}>
          {ticketInfo.map((round) => (
            <button
              key={round.roundId}
              className={cx("select_button", {
                selected: selectedRoundId === round.roundId,
                disabled: !round.roundAvailable,
              })}
              disabled={!round.roundAvailable}
              onClick={() => {
                setSelectedRoundId(round.roundId);
                // 라운드 변경 시 선택된 티켓 초기화
                setSelectedTickets([]);
              }}
            >
              <span className={cx({ disabled: !round.roundAvailable })}>{round.roundName}</span>
              <span className={cx({ disabled: !round.roundAvailable })}>{round.roundPrice}</span>
            </button>
          ))}
        </Flex>

        {selectedRoundId && (
          <>
            <Flex className={cx("select_ticket_wrap")} direction="column" gap={8}>
              {selectedRound?.ticketTypes.map((ticket) => {
                const isSelected = selectedTickets.some(
                  (selected) => selected.ticketTypeId === ticket.ticketTypeId,
                );

                return (
                  <button
                    key={ticket.ticketTypeId}
                    className={cx("select_button", {
                      selected: isSelected,
                    })}
                    onClick={() => handleTicketSelect(ticket.ticketTypeId)}
                  >
                    <span>
                      {ticket.ticketTypeName} {ticket.ticketTypeDate}, {ticket.ticketTypeTime}
                    </span>
                    <span>{ticket.ticketTypePrice}</span>
                  </button>
                );
              })}
            </Flex>

            {selectedTickets.length > 0 && (
              <Flex className={cx("selected_tickets_wrap")} direction="column" gap={12}>
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
                        <Typography type="body12" color="gray500">
                          수량
                        </Typography>
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
                        <Typography type="body12" color="gray500">
                          가격
                        </Typography>
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
            )}

            <button className={cx("promo_code_button")} onClick={() => setIsPromocodeOpen(true)}>
              {isPromocodeOpen ? "Enter Promo Code" : "Have a Promo Code?"}
            </button>

            {isPromocodeOpen && (
              <>
                <Typography className={cx("promo_code_notice")} type="body14" color="red">
                  * Only one per purchase
                </Typography>
                <Flex gap={12}>
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

            {selectedTickets.length > 0 && (
              <Flex
                className={cx("total_price_wrap")}
                align="center"
                justify="space-between"
                gap={16}
              >
                <Typography type="body16" weight="bold">
                  총 금액
                </Typography>
                <Typography type="body16" weight="bold">
                  ₩{calculateTotalPrice().toLocaleString()}
                </Typography>
              </Flex>
            )}
          </>
        )}
      </Dialog.Content>

      <Dialog.Bottom>
        <Flex gap={12}>
          <Button
            className={cx("buy_button")}
            variant="cta"
            isLoading={isLoading}
            disabled={selectedTickets.length === 0}
            onClick={handleBuyTicket}
          >
            Buy Ticket
          </Button>
        </Flex>
      </Dialog.Bottom>
    </Dialog>
  );
};
