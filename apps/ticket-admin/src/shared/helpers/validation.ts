import type { TicketData } from "@/app/events/create/_components/TicketForm";

export const REQUIRED_FIELDS_MESSAGE =
  "입력되지 않은 필수 항목이 있습니다.\n빨간색으로 표시된 항목을 확인해주세요.";

export const TICKET_REQUIREMENT_NOTICE =
  "한 행사 당 최소 한 개의 TicketRound와 TicketType이 있어야 됩니다.";

// HH:MM (서버 값이 HH:MM:SS로 내려오는 경우도 허용)
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;

export function isValidTime(value: string) {
  return TIME_REGEX.test(value);
}

export type TicketErrors = Partial<Record<keyof Omit<TicketData, "id">, string>>;

export function validateTicket(ticket: TicketData): TicketErrors {
  const errors: TicketErrors = {};

  if (!ticket.ticketName.trim()) errors.ticketName = "티켓 종류, 이름을 입력해주세요.";

  if (!Number.isFinite(ticket.price) || ticket.price < 1)
    errors.price = "가격은 1 이상으로 입력해주세요.";

  if (!Number.isInteger(ticket.ticketCount) || ticket.ticketCount < 0)
    errors.ticketCount = "티켓 수는 0 이상의 숫자로 입력해주세요.";

  if (!ticket.ticketStartDate) errors.ticketStartDate = "입장 시작 날짜를 선택해주세요.";

  if (!ticket.ticketStartTime.trim()) errors.ticketStartTime = "입장 시작 시간을 입력해주세요.";
  else if (!isValidTime(ticket.ticketStartTime))
    errors.ticketStartTime = "올바른 시간 형식이 아닙니다. (HH:MM)";

  if (!ticket.ticketEndDate) errors.ticketEndDate = "입장 종료 날짜를 선택해주세요.";

  if (!ticket.ticketEndTime.trim()) errors.ticketEndTime = "입장 종료 시간을 입력해주세요.";
  else if (!isValidTime(ticket.ticketEndTime))
    errors.ticketEndTime = "올바른 시간 형식이 아닙니다. (HH:MM)";

  return errors;
}

export function hasTicketErrors(errors: TicketErrors) {
  return Object.keys(errors).length > 0;
}

// 티켓 목록 전체를 검증해 에러가 있는 티켓만 { [ticketId]: errors } 형태로 반환
export function validateTickets(tickets: TicketData[]) {
  return tickets.reduce<Record<string, TicketErrors>>((acc, ticket) => {
    const errors = validateTicket(ticket);

    if (hasTicketErrors(errors)) acc[ticket.id] = errors;

    return acc;
  }, {});
}
