"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { isAxiosError } from "axios";

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
        // 에러 메시지 세분화 요청
        if (isAxiosError(error)) {
          alert(error.message);
        }

        // 결제 실패 페이지로 라우팅
        window.location.replace(
          `${window.location.origin}/order/${searchParams.get("orderId")}/fail`,
        );

        return;
      }

      alert("알 수 없는 이유로 결제에 실패했습니다. 다시 시도해주세요.");
      window.location.replace(`${window.location.origin}`);
    };

    handlePaymentConfirm();
  }, [mutateAsync, searchParams, router]);

  if (isLoading) {
    return <LoadingWithLayout />;
  }
};

export default PaymentProcessPage;
