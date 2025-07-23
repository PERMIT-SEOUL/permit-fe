"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames/bind";

import { Flex, Typography } from "@permit/design-system";
import { usePaymentConfirmMutation } from "@/data/payments/postPaymentConfirm/mutation";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";

import { CtaButtonClient } from "./_clientBoundary/CtaButtonClient";
import { EventInfoClient } from "./_clientBoundary/EventInfoClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

/**
 * 결제 요청 성공 페이지
 * TODO: 에러 코드와 메세지 노출 방식 정하기
 */
const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const { mutateAsync } = usePaymentConfirmMutation();

  useEffect(() => {
    const handlePaymentConfirm = async () => {
      try {
        const data = await mutateAsync({
          paymentKey: searchParams.get("paymentKey") || "",
          orderId: searchParams.get("orderId") || "",
          totalAmount: Number(searchParams.get("amount")) || 0,
        });

        const { eventName, eventDate } = data;

        setEventName(eventName);
        setEventDate(eventDate);

        setIsLoading(false);
      } catch (error) {
        // TODO: 에러 처리 로직 추가
        // 에러 메시지 세분화 요청
        // 결제 실패 페이지로 라우팅
        alert("결제 실패");

        window.location.replace(
          `${window.location.origin}/order/${searchParams.get("orderId")}/fail`,
        );
      }
    };

    handlePaymentConfirm();
  }, [mutateAsync, searchParams, router]);

  if (isLoading) {
    return <LoadingWithLayout />;
  }

  return (
    <Flex className={cx("wrap")} direction="column" align="center">
      <Typography type="title24">Booking Confirmed</Typography>
      <EventInfoClient eventName={eventName} eventDate={eventDate} />
      <CtaButtonClient />
    </Flex>
  );
};

export default PaymentSuccessPage;
