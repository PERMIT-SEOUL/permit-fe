import classNames from "classnames/bind";

import { Button, Typography } from "@permit/design-system";

import { QRCodeButton } from "../QRCodeButton";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Booking = {
  orderId: string;
  orderDate: string;
  eventName: string;
  ticketInfo: {
    ticketCode: string;
    ticketName: string;
    ticketDate: string;
  }[];
};

type Props = {
  booking: Booking;
  onCancelOrderClick: (orderId: string) => void;
};

export const BookingItem = ({ booking, onCancelOrderClick }: Props) => {
  return (
    <div className={cx("container")}>
      {/* 상단: 날짜/주문번호 + 취소 버튼 */}
      <div className={cx("header_section")}>
        <div className={cx("order_info")}>
          <Typography type="body14">{booking.orderDate}</Typography>
          <Typography type="body14" color="gray500">
            {`ORD${booking.orderId}`}
          </Typography>
        </div>

        <Button
          className={cx("cancel_button")}
          variant="primary"
          size="sm"
          onClick={() => onCancelOrderClick(booking.orderId)}
        >
          Cancel Order
        </Button>
      </div>

      <div className={cx("content_wrap")}>
        {booking.ticketInfo.map((ticket) => (
          <div key={ticket.ticketCode}>
            {/* 하단: QR 코드 + 이벤트 정보 */}
            <div className={cx("content_section")}>
              <QRCodeButton ticketCode={ticket.ticketCode} />

              <div className={cx("event_info")}>
                <div className={cx("event_details")}>
                  <Typography type="body14" color="white" weight="bold">
                    {booking.eventName}
                  </Typography>
                  <span className={cx("event_title")}>{ticket.ticketName}</span>
                </div>

                <span className={cx("event_schedule")}>{ticket.ticketDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
