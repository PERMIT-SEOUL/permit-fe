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
  const [ticketCount, setTicketCount] = useState(1);

  const [selectedRoundId, setSelectedRoundId] = useState<number>();
  const [selectedTicketId, setSelectedTicketId] = useState<number>();

  const [isPromocodeOpen, setIsPromocodeOpen] = useState(false);

  const selectedRound = ticketInfo.find((round) => round.roundId === selectedRoundId);

  const selectedTicket = selectedRound?.ticketTypes.find(
    (ticket) => ticket.ticketTypeId === selectedTicketId,
  );

  const { mutateAsync } = useReservationReadyMutation();

  const handleTicketCountChange = (change: number) => {
    const newCount = ticketCount + change;

    if (newCount >= 1 && newCount <= 10) {
      // 최대 10개까지 제한
      setTicketCount(newCount);
    }
  };

  const handleBuyTicket = useDebounce(async () => {
    setIsLoading(true);

    if (!selectedTicketId || !selectedTicket) {
      return;
    }

    try {
      const orderId = generateRandomString();

      // TODO: 프로모션 코드 로직 추가
      const requestData = {
        eventId,
        totalAmount: parseInt(selectedTicket.ticketTypePrice.replace(/,/g, "")) * ticketCount,
        ticketTypeInfos: [{ id: selectedTicketId, count: ticketCount }],
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
              {selectedRound?.ticketTypes.map((ticket) => (
                <button
                  key={ticket.ticketTypeId}
                  className={cx("select_button", {
                    selected: selectedTicketId === ticket.ticketTypeId,
                  })}
                  onClick={() => {
                    setSelectedTicketId(ticket.ticketTypeId);
                  }}
                >
                  <span>
                    {ticket.ticketTypeName} {ticket.ticketTypeDate}, {ticket.ticketTypeTime}
                  </span>
                  <span>{ticket.ticketTypePrice}</span>
                </button>
              ))}
            </Flex>

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

            {selectedTicketId && selectedTicket && (
              <Flex
                className={cx("ticket_count_wrap")}
                align="flex-end"
                justify="space-between"
                gap={16}
              >
                <Flex className={cx("price_wrap")} direction="column" gap={6}>
                  <div>price</div>
                  <div>
                    ₩
                    {(
                      parseInt(selectedTicket.ticketTypePrice.replace(/,/g, "")) * ticketCount
                    ).toLocaleString()}
                  </div>
                </Flex>

                <Flex align="center" gap={6}>
                  {/* TODO: 디테일 확인 */}
                  <button
                    className={cx("count_button")}
                    onClick={() => handleTicketCountChange(-1)}
                    disabled={ticketCount <= 1}
                  >
                    −
                  </button>
                  <div className={cx("count_display")}>
                    <span>{ticketCount}</span>
                  </div>
                  <button
                    className={cx("count_button")}
                    onClick={() => handleTicketCountChange(1)}
                    disabled={ticketCount >= 10}
                  >
                    +
                  </button>
                </Flex>
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
            disabled={!selectedTicketId}
            onClick={handleBuyTicket}
          >
            Buy Ticket
          </Button>
        </Flex>
      </Dialog.Bottom>
    </Dialog>
  );
};
