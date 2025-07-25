"use client";

import { useState } from "react";
import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";

import { BookingHistoryTabs } from "../../_components/BookingHistoryTabs";
import { BookingItem } from "../../_components/BookingItem";
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

type TabType = "ready" | "not_available";

/**
 * 예약 히스토리 섹션
 */
export const BookingHistoryClient = () => {
  const [activeTab, setActiveTab] = useState<TabType>("ready");

  const filteredBookings = mockOrders;

  const handleCancelOrder = (orderId: string) => {
    // TODO: 주문 취소 API 호출
    console.log("주문 취소:", orderId);
  };

  return (
    <div className={cx("booking_history_section")}>
      <Typography type="body16" className={cx("section_title")}>
        Booking History
      </Typography>

      <BookingHistoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 예약 목록 */}
      <div className={cx("booking_list")}>
        {filteredBookings.map((booking, index) => (
          <div key={booking.orderId}>
            <BookingItem booking={booking} onCancelOrderClick={handleCancelOrder} />
            {index < filteredBookings.length - 1 && <div className={cx("divider")} />}
          </div>
        ))}
      </div>
    </div>
  );
};
