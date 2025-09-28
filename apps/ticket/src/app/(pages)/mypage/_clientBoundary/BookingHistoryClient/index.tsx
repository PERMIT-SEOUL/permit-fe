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
  const { data: userTicketsData } = useUserTicketsSuspenseQuery({ refetchOnWindowFocus: true });

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
        {userTicketsData.orders.length > 0 ? (
          userTicketsData.orders.map((order, index) => (
            <div key={order.orderId}>
              <OrderItem
                order={order}
                onCancelOrderClick={handleCancelOrder}
                onClickQRCode={handleClickQRCode}
              />
              {index < userTicketsData.orders.length - 1 && <div className={cx("divider")} />}
            </div>
          ))
        ) : (
          <Typography type="body16" color="gray500">
            예약 내역이 없습니다.
          </Typography>
        )}
      </div>
    </div>
  );
};
