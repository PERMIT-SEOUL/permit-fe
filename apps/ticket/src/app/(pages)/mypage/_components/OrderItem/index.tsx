import classNames from "classnames/bind";

import { Button, Flex, Typography } from "@permit/design-system";
import { useIsMobile } from "@permit/design-system/hooks";
import type { Order } from "@/data/users/getUserTickets/types";

import { QrTicketInfo } from "../../_clientBoundary/QrTicketModal";
import { QRCodeButton } from "../QRCodeButton";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  order: Order;
  onCancelOrderClick: (orderId: string, eventName: string) => void;
  onClickQRCode: ({
    ticketCode,
    eventName,
    eventDate,
    eventTime,
    ticketName,
    eventVenue,
  }: QrTicketInfo) => void;
};

export const OrderItem = ({ order, onCancelOrderClick, onClickQRCode }: Props) => {
  const isMobile = useIsMobile();

  return (
    <div className={cx("container")}>
      {/* 상단: 날짜/주문번호 + 취소 버튼 */}
      <div className={cx("header_section")}>
        <div className={cx("order_info")}>
          <span className={cx("order_date")}>{order.orderDate}</span>
          <Typography className={cx("order_id")} type="body14" color="gray500">
            {`ORD_${order.orderId}`}
          </Typography>
        </div>

        {order.canCancel && (
          <Button
            className={cx("cancel_button")}
            variant="primary"
            size="sm"
            onClick={() => onCancelOrderClick(order.orderId, order.eventName)}
          >
            Cancel Order
          </Button>
        )}
        {order.refundedPrice && (
          <Flex gap={8}>
            <Typography className={cx("refund_price")} type="body14" color="gray300">
              ₩{order.refundedPrice}
            </Typography>
            <Typography type="body14" color="gray300">
              Refunded
            </Typography>
          </Flex>
        )}
      </div>

      <div className={cx("content_wrap")}>
        {order.ticketInfo.map((ticket) => (
          <div key={ticket.ticketCode}>
            {/* 하단: QR 코드 + 이벤트 정보 */}
            <div className={cx("content_section")}>
              <QRCodeButton
                ticketCode={ticket.ticketCode}
                onClick={() =>
                  onClickQRCode({
                    ticketCode: ticket.ticketCode,
                    eventName: order.eventName,
                    eventVenue: order.eventVenue,
                    ticketName: ticket.ticketName,
                    eventDate: ticket.ticketDate,
                    eventTime: ticket.ticketTime,
                  })
                }
              />

              <div className={cx("event_info")}>
                {isMobile && (
                  <span
                    className={cx("event_status", {
                      usable: ticket.ticketStatus === "USABLE",
                      refunded: ticket.ticketStatus === "REFUNDED",
                    })}
                  >
                    {ticket.ticketStatus}
                  </span>
                )}
                <div className={cx("event_details")}>
                  <span className={cx("event_title")}>{order.eventName}</span>
                  <span className={cx("event_title", "ticket_name")}>{ticket.ticketName}</span>

                  {!isMobile && (
                    <span
                      className={cx("event_status", {
                        usable: ticket.ticketStatus === "USABLE",
                        refunded: ticket.ticketStatus === "REFUNDED",
                      })}
                    >
                      {ticket.ticketStatus}
                    </span>
                  )}
                </div>

                <Flex gap={30}>
                  <span className={cx("event_schedule")}>{ticket.ticketDate}</span>
                  {/* TODO: 추후 티켓 시간 보이도록 변경 */}
                  {/* <span className={cx("event_schedule")}>{ticket.ticketTime}</span> */}
                </Flex>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
