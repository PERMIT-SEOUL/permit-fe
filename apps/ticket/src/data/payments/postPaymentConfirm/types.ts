export type PaymentConfirmRequest = {
  /** 주문번호 */
  orderId: string;
  /** 결제 키 (토스 결제 키) */
  paymentKey: string;
  /** 총 결제 금액 */
  totalAmount: number;
};

export type PaymentConfirmResponse = {
  code: number;
  data: {
    eventName: string;
    eventDate: string;
  };
};
