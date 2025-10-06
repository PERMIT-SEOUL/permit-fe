export type TicketsParams = {
  eventId: string;
};

export type TicketsResponse = {
  totalTicketCount: number;
  totalTicketSoldCount: number;
  totalTicketSoldAmount: number;
  ticketRoundsWithTypes: {
    ticketRoundId: number;
    ticketRoundName: string;
    ticketRoundSalesStartDate: string; // yyyy.mm.dd
    ticketRoundSalesStartTime: string; // hh:mm
    ticketRoundSalesEndDate: string;
    ticketRoundSalesEndTime: string;
    ticketTypes: {
      ticketTypeId: number;
      ticketTypeName: "string";
      ticketTypePrice: number;
      ticketTypeSoldCount: number;
      ticketTypeTotalCount: number;
      ticketTypeSoldAmount: number;
      ticketTypeRefundCount: number;
      ticketTypeUsedCount: number;
    }[];
  }[];
};
