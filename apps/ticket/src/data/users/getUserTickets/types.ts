export type UserTicketsResponse = {
  orders: Order[];
};

export type Order = {
  /** 주문 날짜 (yyyy.MM.dd) */
  orderDate: string;
  /** 주문 번호 */
  orderId: string;
  /** 이벤트 이름 */
  eventName: string;
  /** 이벤트 장소 */
  eventVenue: string;
  /** 환불 가격 */
  refundedPrice?: string;
  /** 취소 가능 여부 */
  canCancel: boolean;
  /** 티켓 정보 리스트 */
  ticketInfo: TicketInfo[];
};

type TicketInfo = {
  /** 티켓 코드 */
  ticketCode: string;
  /** 티켓 이름 */
  ticketName: string;
  /** 티켓 상태 */
  ticketStatus: TicketStatus;
  /** 티켓 날짜 */
  ticketDate: string;
  /** 티켓 시간 */
  ticketTime: string;
};

type TicketStatus = "USABLE" | "USED" | "REFUNDED" | "EXPIRED";
