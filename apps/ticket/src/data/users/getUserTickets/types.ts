export type UserTicketsResponse = {
  orders: Order[];
};

export type Order = {
  orderDate: string;
  orderId: string;
  eventName: string;
  canCancel: boolean;
  ticketInfo: TicketInfo[];
};

type TicketInfo = {
  ticketCode: string;
  ticketName: string;
  ticketStatus: TicketStatus;
  ticketDate: string;
  ticketTime: string;
};

type TicketStatus = "USABLE" | "USED" | "REFUNDED" | "EXPIRED";
