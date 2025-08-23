"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import classNames from "classnames/bind";

import { Flex, Typography } from "@permit/design-system";

import { CtaButtonClient } from "./_clientBoundary/CtaButtonClient";
import { EventInfoClient } from "./_clientBoundary/EventInfoClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

/**
 * 결제 요청 성공 페이지
 */
const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    const eventName = searchParams.get("eventName");
    const eventDate = searchParams.get("eventDate");

    setEventName(eventName || "");
    setEventDate(eventDate || "");
  }, [searchParams]);

  return (
    <Flex className={cx("wrap")} direction="column" align="center">
      <Typography type="title24">Booking Confirmed</Typography>
      <EventInfoClient eventName={eventName} eventDate={eventDate} />
      <CtaButtonClient />
    </Flex>
  );
};

export default PaymentSuccessPage;
