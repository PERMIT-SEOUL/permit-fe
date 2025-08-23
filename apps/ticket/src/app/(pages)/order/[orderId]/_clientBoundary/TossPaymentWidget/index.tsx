"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import classNames from "classnames/bind";

import { Button } from "@permit/design-system";
import { useReservationReadyQuery } from "@/data/reservations/getReservationReady/queries";
import { LoadingIndicator } from "@/shared/components/LoadingIndicator";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  orderId: string;
};

export const TossPaymentWidget = ({ orderId }: Props) => {
  const { data: reservationReady } = useReservationReadyQuery({});

  const [isSDKLoaded, setSDKLoaded] = useState(false);
  const [isWidgetRendered, setIsWidgetRendered] = useState(false);

  const paymentRef = useRef<HTMLDivElement>(null);
  const agreementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initTossPayment = async () => {
      if (!window.TossPayments || !paymentRef.current || !agreementRef.current) {
        console.warn("SDK 또는 DOM 요소가 준비되지 않았습니다.");

        return;
      }

      if (!reservationReady) {
        return;
      }

      try {
        // TODO: 추후 변경
        const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
        const customerKey = reservationReady.customerKey;
        const tossPayments = window.TossPayments(clientKey);
        const widgets = tossPayments.widgets({ customerKey });

        /**
         * 토스 결제 위젯 초기화
         */
        await widgets.setAmount({
          currency: "KRW",
          value: reservationReady.totalAmount,
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

        button?.addEventListener("click", async () => {
          /**
           * 결제 요청
           * @docs https://docs.tosspayments.com/sdk/widget-js#requestpayment%EA%B2%B0%EC%A0%9C-%EC%A0%95%EB%B3%B4
           */
          await widgets.requestPayment({
            orderId,
            orderName: reservationReady.orderName,
            customerName: reservationReady.userName,
            customerEmail: reservationReady.userEmail,
            successUrl: `${window.location.origin}/order/${orderId}/process`,
            failUrl: `${window.location.origin}/order/${orderId}/fail`,
          });
        });

        setIsWidgetRendered(true);
      } catch (error) {
        console.error("결제 요청 실패:", error);
      }
    };

    initTossPayment();
  }, [isSDKLoaded, orderId, reservationReady]);

  return (
    <>
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

      {!isSDKLoaded && <LoadingIndicator className={cx("loading_wrap")} size="large" />}

      {/* TODO: 따로 컴포넌트 분리 */}
      <div
        style={{
          marginTop: "12px",
        }}
      >
        <div id="payment-method" ref={paymentRef} />
        <div id="agreement" ref={agreementRef} className="mt-6" />
        <Button
          id="payment-button"
          variant="primary"
          fullWidth
          className={cx({ hidden: !isWidgetRendered })}
          style={{ backgroundColor: "#3182F7" }}
        >
          결제하기
        </Button>
      </div>
    </>
  );
};
