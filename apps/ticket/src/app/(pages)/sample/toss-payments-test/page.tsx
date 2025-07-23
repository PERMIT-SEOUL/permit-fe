"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function TossPaymentsTestPage() {
  const [isSDKLoaded, setSDKLoaded] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isWidgetRendered, setIsWidgetRendered] = useState(false);

  const paymentRef = useRef<HTMLDivElement>(null);
  const agreementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 주문번호 생성
    setOrderId(Date.now().toString());
  }, []);

  const handlePayment = async () => {
    console.log("initTossPayment", window.TossPayments, paymentRef.current, agreementRef.current);

    if (!window.TossPayments || !paymentRef.current || !agreementRef.current) {
      console.warn("SDK 또는 DOM 요소가 준비되지 않았습니다.");

      return;
    }

    try {
      const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
      const customerKey = "21UIIRTiENmceorBAnfsW";
      const tossPayments = window.TossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey });

      await widgets.setAmount({
        currency: "KRW",
        value: 50000,
      });

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      const button = document.getElementById("payment-button");

      if (button) {
        button.innerHTML = "결제하기";
      }

      button?.addEventListener("click", async function () {
        await widgets.requestPayment({
          orderId: orderId,
          orderName: "토스 티켓 결제 테스트",
          customerName: "김토스",
          customerEmail: "customer@email.com",
          successUrl: `${window.location.origin}/sample/success`,
          failUrl: `${window.location.origin}/sample/fail`,
        });
      });

      setIsWidgetRendered(true);
    } catch (error) {
      console.error("결제 요청 실패:", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* SDK 로드 */}
      <Script
        src="https://js.tosspayments.com/v2/standard"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ TossPayments SDK loaded");
          setSDKLoaded(true);
        }}
        onError={(e) => {
          console.error("❌ SDK load failed:", e);
        }}
      />

      <h1 className="text-2xl font-bold mb-8">🎫 티켓 주문하기</h1>

      {/* 결제 금액 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">결제 금액</h2>
        <p className="text-3xl font-bold">50,000원</p>
      </div>

      {/* 주문 정보 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">주문 정보</h2>
        <p className="text-gray-600">주문번호: {orderId}</p>
      </div>

      {/* 결제하기 버튼 */}
      <button
        onClick={handlePayment}
        disabled={!isSDKLoaded || isWidgetRendered}
        className="w-full bg-blue-500 text-white py-4 rounded-lg font-bold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isSDKLoaded ? "결제하기" : "SDK 로드 중..."}
      </button>

      {/* Toss 위젯이 붙을 영역 */}
      <div className="mt-8">
        <div id="payment-method" ref={paymentRef} />
        <div id="agreement" ref={agreementRef} className="mt-6" />
        <button className="button" id="payment-button" style={{ marginTop: "30px" }}></button>
      </div>
    </div>
  );
}

// 글로벌 선언
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TossPayments: any;
  }
}
