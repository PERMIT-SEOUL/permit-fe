export type ReservationReadyParams = {
  eventId: number;
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
