export type GuestTicketDoorValidationParams = {
  /** 티켓고유코드 */
  ticketCode: string;
};

export type GuestTicketDoorValidationResponse = {
  eventName: string;
  ticketName: string;
};
