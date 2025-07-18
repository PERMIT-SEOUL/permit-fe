"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { usePaymentConfirmMutation } from "@/data/payments/postPaymentConfirm/mutation";

/**
 * 결제 요청 성공 페이지
 * - TODO: 페이지 뷰 수정
 * 에러 코드와 메세지 노출 방식 정하기
 */
const SuccessPage = () => {
  const searchParams = useSearchParams();

  const { mutateAsync } = usePaymentConfirmMutation();

  useEffect(() => {
    const handlePaymentConfirm = async () => {
      try {
        await mutateAsync({
          paymentKey: searchParams.get("paymentKey") || "",
          orderId: searchParams.get("orderId") || "",
          totalAmount: Number(searchParams.get("amount")) || 0,
        });

        // TODO: mutate 성공하면 페이지 보여주도록 수정 그 전까지 loading 표시
      } catch (error) {
        // TODO: 에러 처리 로직 추가
        // 결제 실패 페이지로 라우팅
      }
    };

    handlePaymentConfirm();
  }, [mutateAsync, searchParams]);

  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 결제 성공</h1>
      <p className="text-xl mb-8">결제가 성공적으로 완료되었습니다.</p>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">결제 정보</h2>
        <dl className="space-y-2">
          <dt className="font-medium">주문번호</dt>
          <dd className="text-gray-600">{searchParams.get("orderId")}</dd>
          <dt className="font-medium mt-4">결제 금액</dt>
          <dd className="text-gray-600">{searchParams.get("amount")}원</dd>
        </dl>
      </div>
    </div>
  );
};

export default SuccessPage;
