import classNames from "classnames/bind";

import { Button, Flex, Typography } from "@permit/design-system";
import { useIsMobile } from "@permit/design-system/hooks";
import { Order } from "@/data/users/getUserTickets/types";

import { QRCodeButton } from "../QRCodeButton";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  order: Order;
  onCancelOrderClick: (orderId: string) => void;
};

export const OrderItem = ({ order, onCancelOrderClick }: Props) => {
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

        <Button
          className={cx("cancel_button")}
          variant="primary"
          size="sm"
          onClick={() => onCancelOrderClick(order.orderId)}
        >
          Cancel Order
        </Button>
      </div>

      <div className={cx("content_wrap")}>
        {order.ticketInfo.map((ticket) => (
          <div key={ticket.ticketCode}>
            {/* 하단: QR 코드 + 이벤트 정보 */}
            <div className={cx("content_section")}>
              <QRCodeButton ticketCode={ticket.ticketCode} />

              <div className={cx("event_info")}>
                {isMobile && (
                  <span
                    className={cx("event_status", { usable: ticket.ticketStatus === "USABLE" })}
                  >
                    {ticket.ticketStatus}
                  </span>
                )}
                <div className={cx("event_details")}>
                  <span className={cx("event_title")}>{order.eventName}</span>
                  <span className={cx("event_title", "ticket_name")}>{ticket.ticketName}</span>

                  {!isMobile && (
                    <span
                      className={cx("event_status", { usable: ticket.ticketStatus === "USABLE" })}
                    >
                      {ticket.ticketStatus}
                    </span>
                  )}
                </div>

                <Flex gap={30}>
                  <span className={cx("event_schedule")}>{ticket.ticketDate}</span>
                  <span className={cx("event_schedule")}>{ticket.ticketTime}</span>
                </Flex>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
