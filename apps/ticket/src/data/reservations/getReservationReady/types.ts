export type ReservationReadyResponse = {
  /** 행사 이름 */
  orderName: string;
  /** 주문번호 (고유값) */
  orderId: string;
  /** 주문자 이메일 */
  userEmail: string;
  /** 주문자 이름 */
  userName: string;
  /** 총 결제 금액 */
  totalAmount: number;
  /** 유저 소셜 아이디 */
  customerKey: string;
};
