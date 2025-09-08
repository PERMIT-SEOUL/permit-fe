"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { usePaymentConfirmMutation } from "@/data/payments/postPaymentConfirm/mutation";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";

/**
 * 결제 요청 페이지
 */
const PaymentProcessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

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

        window.location.replace(
          `${window.location.origin}/order/${searchParams.get("orderId")}/success?eventName=${encodeURIComponent(eventName)}&eventDate=${encodeURIComponent(eventDate)}`,
        );
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
};

export default PaymentProcessPage;
