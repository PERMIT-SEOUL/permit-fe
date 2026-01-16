import { useState } from "react";
import axios, { isAxiosError } from "axios";
import classNames from "classnames/bind";

import { Button, Flex, Icon, Select, TextField, Typography } from "@permit/design-system";
import { useDebounce, useSelect, useTextField } from "@permit/design-system/hooks";
import { useCouponValidateMutation } from "@/data/coupon/postCouponValidate/mutation";
import { useEventTicketsSuspenseQuery } from "@/data/events/getEventTickets/queries";
import { useReservationReadyMutation } from "@/data/reservations/postReservationReady/mutation";
import { generateRandomString } from "@/shared/helpers/generateRandomString";
import {
  AxiosErrorResponse,
  isAxiosErrorResponse,
  isNotAuthErrorResponse,
} from "@/shared/types/axioxError";

import { TitleSection } from "../../_components/TitleSection";
import { calculateTotalPrice } from "../../_helpers/calculateTotalPrice";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type SelectedTicket = {
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
  const { data: eventTicketsData } = useEventTicketsSuspenseQuery({
    eventId,
    options: {
      refetchOnWindowFocus: true,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const selectedRound = eventTicketsData.rounds.find((round) => round.roundAvailable);
  const [selectedRoundId, setSelectedRoundId] = useState<number | undefined>(
    selectedRound?.roundId,
  );
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([]);
  const [isPromocodeOpen, setIsPromocodeOpen] = useState(false);
  const [couponVerified, setCouponVerified] = useState(false);
  const [discountRate, setDiscountRate] = useState<number | null>(null);

  const { mutateAsync: reservationReadyMutateAsync } = useReservationReadyMutation();
  const { mutateAsync: couponValidateMutateAsync } = useCouponValidateMutation(eventId);

  const roundOptions = eventTicketsData.rounds.map((round) => {
    return {
      value: String(round.roundId),
      label: `${round.roundName}`,
      disabled: !round.roundAvailable,
    };
  });

  const availableTickets = eventTicketsData.rounds
    .filter((round) => round.roundAvailable)
    .flatMap((round) =>
      round.ticketTypes.map((ticket) => ({
        value: String(ticket.ticketTypeId),
        label: `${ticket.ticketTypeName} - ₩ ${ticket.ticketTypePrice}`,
        disabled: ticket.isTicketSoldOut,
      })),
    );

  const ticketOptions =
    availableTickets.length > 0
      ? availableTickets
      : [
          {
            value: "No Available Tickets",
            label: "No Available Tickets",
            disabled: true,
          },
        ];

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
      if (couponVerified) {
        alert("쿠폰이 적용된 상태에서는 티켓을 추가할 수 없습니다.");

        return;
      }

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

  const couponCodeField = useTextField({
    initialValue: "",
    validate: () => {
      const totalCount = selectedTickets.reduce((sum, ticket) => sum + ticket.count, 0);

      if (totalCount !== 1) return "Please select only one ticket.";

      return undefined;
    },
  });

  // TODO: 훅으로 분리하면 좋을 듯.......
  const handleTicketCountChange = (ticketTypeId: number, change: number) => {
    if (couponVerified) {
      alert("쿠폰이 적용된 상태에서는 티켓 개수를 변경할 수 없습니다.");

      return;
    }

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
    setSelectedTickets((prev) => {
      const filtered = prev.filter((ticket) => ticket.ticketTypeId !== ticketTypeId);

      if (filtered.length === 0) {
        setIsPromocodeOpen(false);
        setCouponVerified(false);
        setDiscountRate(null);
        couponCodeField.reset();
      }

      return filtered;
    });
  };

  const handleCouponValidate = useDebounce(async () => {
    const isCouponCodeValid = couponCodeField.validateValue();

    if (!isCouponCodeValid) {
      return;
    }

    const couponCode = couponCodeField.value;

    try {
      const { discountRate } = await couponValidateMutateAsync({ couponCode });

      setDiscountRate(discountRate);
      setCouponVerified(true);
    } catch (error) {
      if (isAxiosErrorResponse(error)) {
        const errorMessage = "Invalid promotion code.";

        couponCodeField.setError(errorMessage);
      }
    }
  }, 500);

  const handleBuyTicket = useDebounce(async () => {
    setIsLoading(true);

    if (selectedTickets.length === 0) {
      return;
    }

    try {
      const orderId = generateRandomString();

      const requestData = {
        eventId: eventId,
        totalAmount:
          calculateTotalPrice(selectedTickets) *
          (couponVerified && discountRate ? 1 - discountRate / 100 : 1),
        couponCode: discountRate ? couponCodeField.value : undefined,

        ticketTypeInfos: selectedTickets.map((ticket) => ({
          id: ticket.ticketTypeId,
          count: ticket.count,
        })),
      };

      await reservationReadyMutateAsync({ ...requestData, orderId });

      window.location.href = `/order/${orderId}`;
    } catch (error) {
      if (isNotAuthErrorResponse(error)) {
        // TODO: 로그인 화면으로 이동하는 로직 추가해야함.
        // 로그인 페이지로 이동해야함
        // alert("로그인 후 이용해 주세요.");
      }

      if (isAxiosErrorResponse(error)) {
        // TODO: 토스트나 커스텀 모달로 변경
        alert(error.response?.data.message);
      }

      setIsLoading(false);
    }
  });

  return (
    <div className={cx("wrap")}>
      <TitleSection eventName={eventName} eventId={eventId} />

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
            disabled={couponVerified}
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
                        value={couponCodeField.value}
                        onChange={couponCodeField.handleChange}
                        error={couponCodeField.error}
                        disabled={couponVerified}
                      />
                      <Button variant="secondary" onClick={handleCouponValidate}>
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

                      <Flex align="center" gap={2}>
                        <Typography className={cx("price_text")} type="body14" weight="medium">
                          ₩{" "}
                          {(
                            parseInt(selectedTicket.ticketInfo.ticketTypePrice.replace(/,/g, "")) *
                            selectedTicket.count
                          ).toLocaleString()}
                        </Typography>

                        <button
                          onClick={() => handleRemoveTicket(selectedTicket.ticketTypeId)}
                          className={cx("close_button")}
                        >
                          <Icon.Close fill="gray400" size={16} />
                        </button>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>

            <Flex className={cx("total_price_wrap")} direction="column" gap={4}>
              <Flex align="center" justify="space-between" gap={8}>
                <Typography type="body16" weight="medium">
                  Total
                </Typography>
                {couponVerified && discountRate !== null ? (
                  <Flex direction="column" align="flex-end" gap={4}>
                    <Typography type="body14" weight="medium" className={cx("original_price")}>
                      ₩ {calculateTotalPrice(selectedTickets).toLocaleString()}
                    </Typography>
                    <Typography type="body14" weight="medium">
                      ₩{" "}
                      {Math.round(
                        calculateTotalPrice(selectedTickets) * (1 - discountRate / 100),
                      ).toLocaleString()}
                    </Typography>
                  </Flex>
                ) : (
                  <Typography type="body14" weight="medium">
                    ₩ {calculateTotalPrice(selectedTickets).toLocaleString()}
                  </Typography>
                )}
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
