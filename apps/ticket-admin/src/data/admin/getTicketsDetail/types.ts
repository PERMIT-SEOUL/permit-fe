export type TicketsDetailParams = {
  ticketRoundId: number;
};

export type TicketsDetailResponse = {
  ticketRoundId: number;
  ticketRoundName: string;
  ticketRoundSalesStartDate: string;
  ticketRoundSalesEndDate: string;
  ticketRoundSalesStartTime: string;
  ticketRoundSalesEndTime: string;
  ticketTypes: {
    ticketTypeId: number;
    ticketTypeName: string;
    ticketTypePrice: number;
    ticketTypeCount: number;
    ticketTypeStartDate: string;
    ticketTypeEndDate: string;
    ticketTypeStartTime: string;
    ticketTypeEndTime: string;
  }[];
};
