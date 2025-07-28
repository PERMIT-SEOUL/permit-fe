"use client";

import { useState } from "react";
import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";
import { useUserTicketsSuspenseQuery } from "@/data/users/getUserTickets/queries";

import { BookingHistoryTabs } from "../../_components/BookingHistoryTabs";
import { OrderItem } from "../../_components/OrderItem";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

// TODO: API 호출로 변경
const mockOrders = [
  {
    orderId: "adsaaforde",
    orderDate: "2025.07.03",
    eventName: "Ceiling service vol.6 -Ksawery Komputery [PL]",
    ticketInfo: [
      {
        ticketCode: "abcd",
        ticketName: "Day1",
        ticketDate: "Sun, 25 May 2025 - Mon, 26 May 2025",
      },
      {
        ticketCode: "efgh",
        ticketName: "Day2",
        ticketDate: "Sun, 25 May 2025 - Mon, 26 May 2025",
      },
    ],
  },
  {
    orderId: "dbbadsaasc",
    orderDate: "2025.07.02",
    eventName: "Ceiling service vol.7 -Ksawery Komputery [PL]",
    ticketInfo: [
      {
        ticketCode: "ijkl",
        ticketName: "Day1",
        ticketDate: "Sun, 25 May 2025 - Mon, 26 May 2025",
      },
    ],
  },
];

/**
 * 예약 히스토리 섹션
 */
export const BookingHistoryClient = () => {
  const { data: userTickets } = useUserTicketsSuspenseQuery();

  const handleCancelOrder = (orderId: string) => {
    // TODO: 주문 취소 API 호출
    console.log("주문 취소:", orderId);
  };

  console.log("@@userTickets", userTickets);

  return (
    <div className={cx("booking_history_section")}>
      <Typography type="body16" className={cx("section_title")}>
        Booking History
      </Typography>

      {/* 예약 목록 */}
      <div className={cx("booking_list")}>
        {userTickets.orders.map((order, index) => (
          <div key={order.orderId}>
            <OrderItem order={order} onCancelOrderClick={handleCancelOrder} />
            {index < userTickets.orders.length - 1 && <div className={cx("divider")} />}
          </div>
        ))}
      </div>
    </div>
  );
};
