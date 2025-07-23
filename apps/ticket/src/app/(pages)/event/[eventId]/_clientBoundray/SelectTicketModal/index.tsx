import { useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button, Dialog, Flex, TextField, Typography } from "@permit/design-system";
import { useDebounce } from "@permit/design-system/hooks";
import { useReservationReadyMutation } from "@/data/reservations/postReservationReady/mutation";
import { generateRandomString } from "@/shared/helpers/generateRandomString";
import { ModalComponentProps } from "@/shared/hooks/useModal/types";
import { isAxiosErrorResponse } from "@/shared/types/axioxError";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  title: string;
  ticketInfo: {
    roundId: number;
    roundAvailable: boolean;
    roundPrice: string;
    roundName: string;
    ticketTypes: {
      ticketTypeId: number;
      ticketTypeName: string;
      ticketTypeDate: string;
      ticketTypeTime: string;
      ticketTypePrice: string;
    }[];
  }[];
} & ModalComponentProps<{ result: boolean }>;

/**
 * 티켓 선택 모달
 */
export const SelectTicketModal = ({ isOpen, close, title, ticketInfo }: Props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [selectedRoundId, setSelectedRoundId] = useState<number>();
  const [selectedTicketId, setSelectedTicketId] = useState<number>();

  const [isPromocodeOpen, setIsPromocodeOpen] = useState(false);

  const selectedRound = ticketInfo.find((round) => round.roundId === selectedRoundId);

  const { mutateAsync } = useReservationReadyMutation();

  const handleBuyTicket = useDebounce(async () => {
    setIsLoading(true);

    try {
      const orderId = generateRandomString();

      await mutateAsync({ ...mock, orderId });

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
        {ticketInfo.map((round) => (
          <Button
            key={round.roundId}
            disabled={!round.roundAvailable}
            variant={selectedRoundId === round.roundId ? "primary" : "secondary"}
            fullWidth
            onClick={() => {
              setSelectedRoundId(round.roundId);
            }}
          >
            {round.roundName}
          </Button>
        ))}

        {selectedRoundId && (
          <>
            <div style={{ marginTop: 12 }}>
              {selectedRound?.ticketTypes.map((ticket) => (
                <Button
                  key={ticket.ticketTypeId}
                  variant={selectedTicketId === ticket.ticketTypeId ? "primary" : "secondary"}
                  fullWidth
                  onClick={() => {
                    setSelectedTicketId(ticket.ticketTypeId);
                  }}
                >
                  {ticket.ticketTypeName} {ticket.ticketTypeDate} {ticket.ticketTypeTime}
                </Button>
              ))}
            </div>

            <button className={cx("promo_code_button")} onClick={() => setIsPromocodeOpen(true)}>
              {isPromocodeOpen ? "Enter Promo Code" : "Have a Promo Code?"}
            </button>

            {isPromocodeOpen && (
              <>
                <Typography className={cx("promo_code_notice")} type="body14" color="red">
                  * Only one per purchase
                </Typography>
                <Flex gap={12}>
                  <TextField fullWidth placeholder="promotion code" />
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
          </>
        )}
      </Dialog.Content>

      <Dialog.Bottom>
        <Flex gap={12}>
          <Button
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

// TODO: 선택한 값으로 변경
const mock = {
  eventId: 2,
  // couponCode: "dijkkksdrl", // 필요 시 주석 해제
  totalAmount: 900,
  ticketTypeInfos: [
    // { id: 1, count: 2 },
    { id: 9, count: 1 },
  ],
};
