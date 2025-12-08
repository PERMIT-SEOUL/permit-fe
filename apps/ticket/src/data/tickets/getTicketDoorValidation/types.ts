export type TicketDoorValidationParams = {
  /** 티켓고유코드 */
  ticketCode: string;
};

export type TicketDoorValidationResponse = {
  eventName: string;
  ticketName: string;
  ticketStartDate: string;
  ticketEndDate: string;
};
