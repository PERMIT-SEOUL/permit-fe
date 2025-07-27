export type EventTicketsParams = {
  eventId: string;
};

export type EventTicketsResponse = {
  rounds: Round[];
};

export type Round = {
  roundId: number;
  roundAvailable: boolean;
  roundPrice: string;
  roundName: string;
  ticketTypes: TicketType[];
};

type TicketType = {
  ticketTypeId: number;
  ticketTypeName: string;
  ticketTypeDate: string;
  ticketTypeTime: string;
  ticketTypePrice: string;
};
