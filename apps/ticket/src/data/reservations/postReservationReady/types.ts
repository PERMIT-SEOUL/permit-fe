export type ReservationReadyParams = {
  eventId: string;
  orderId: string;
  couponCode?: string;
  totalAmount: number;
  ticketTypeInfos: {
    id: number;
    count: number;
  }[];
};

export type ReservationReadyResponse = {
  data: null;
};
