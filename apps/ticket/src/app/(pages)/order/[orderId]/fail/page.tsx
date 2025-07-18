"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * 결제 요청 실패 페이지
 * - TODO: 임시 페이지
 * 에러 코드와 메세지 노출 방식 정하기
 */
const FailPage = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    // 결제 실패 정보 출력
    console.log("code:", searchParams.get("code"));
    console.log("message:", searchParams.get("message"));
    console.log("orderId:", searchParams.get("orderId"));
  }, [searchParams]);

  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">❌ 결제 실패</h1>
      <p className="text-xl mb-8">결제 중 문제가 발생했습니다.</p>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">오류 정보</h2>
        <dl className="space-y-2">
          <dt className="font-medium">에러 코드</dt>
          <dd className="text-gray-600">{searchParams.get("code")}</dd>
          <dt className="font-medium mt-4">에러 메시지</dt>
          <dd className="text-gray-600">{searchParams.get("message")}</dd>
        </dl>
      </div>
    </div>
  );
};

export default FailPage;
