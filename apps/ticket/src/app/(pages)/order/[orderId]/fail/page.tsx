"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

/**
 * 결제 요청 실패 페이지
 * 에러 코드와 메세지 노출 방식 정하기
 */
const FailPage = () => {
  const searchParams = useSearchParams();

  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    setErrorCode(searchParams.get("code") || "");
    setErrorMessage(searchParams.get("message") || "");
    setOrderId(searchParams.get("orderId") || "");
  }, [searchParams]);

  // TODO: 에러 코드와 메세지 노출 방식 정하기
  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">❌ 결제 실패</h1>
      <p className="text-xl mb-8">결제 중 문제가 발생했습니다.</p>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">오류 정보</h2>
        <dl className="space-y-2">
          <dt className="font-medium">주문번호</dt>
          <dd className="text-gray-600">{orderId}</dd>
          <dt className="font-medium">에러 코드</dt>
          <dd className="text-gray-600">{errorCode}</dd>
          <dt className="font-medium mt-4">에러 메시지</dt>
          <dd className="text-gray-600">{errorMessage}</dd>
        </dl>
      </div>
    </div>
  );
};

export default FailPage;
