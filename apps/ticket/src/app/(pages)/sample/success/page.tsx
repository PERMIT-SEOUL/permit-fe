"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // 결제 승인 결과 출력
    console.log("paymentKey:", searchParams.get("paymentKey"));
    console.log("orderId:", searchParams.get("orderId"));
    console.log("amount:", searchParams.get("amount"));
  }, [searchParams]);

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
}
