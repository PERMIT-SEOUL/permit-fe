"use client";

import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";
import { useUserTicketsSuspenseQuery } from "@/data/users/getUserTickets/queries";
import { useModal } from "@/shared/hooks/useModal";

import { OrderItem } from "../../_components/OrderItem";
import { CancelTicketModal } from "../CancelTicketModal";
import { QrTicketInfo, QrTicketModal } from "../QrTicketModal";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

/**
 * 예약 히스토리 섹션
 */
export const BookingHistoryClient = () => {
  const { data: userTickets } = useUserTicketsSuspenseQuery();

  const { show: openCancelTicketModal } = useModal(CancelTicketModal);
  const { show: openQrTicketModal } = useModal(QrTicketModal);

  const handleCancelOrder = (orderId: string, eventName: string) => {
    openCancelTicketModal({ orderId, eventName });
  };

  const handleClickQRCode = (ticketInfo: QrTicketInfo) => {
    openQrTicketModal({ ticketInfo });
  };

  return (
    <div className={cx("booking_history_section")}>
      <Typography type="body16" className={cx("section_title")}>
        Booking History
      </Typography>

      {/* 예약 목록 */}
      <div className={cx("booking_list")}>
        {userTickets.orders.map((order, index) => (
          <div key={order.orderId}>
            <OrderItem
              order={order}
              onCancelOrderClick={handleCancelOrder}
              onClickQRCode={handleClickQRCode}
            />
            {index < userTickets.orders.length - 1 && <div className={cx("divider")} />}
          </div>
        ))}
      </div>
    </div>
  );
};
