import { SelectedTicket } from "../_clientBoundray/DesktopTicketSectionClient";

export const calculateTotalPrice = (selectedTickets: SelectedTicket[]) => {
  return selectedTickets.reduce((total, ticket) => {
    const price = parseInt(ticket.ticketInfo.ticketTypePrice.replace(/,/g, ""));

    return total + price * ticket.count;
  }, 0);
};
