import { Suspense } from "react";

import { EditTicketDetailFormClient } from "./_clientBoundary/EditTicketDetailFormClient";

type Props = {
  params: Promise<{
    eventId: string;
  }>;
  searchParams: Promise<{
    ticketRoundId: string;
  }>;
};

/** 티켓 라운드/타입 수정 페이지 */
export default async function EditTicketDetailPage({ params, searchParams }: Props) {
  const { eventId } = await params;
  const { ticketRoundId } = await searchParams;

  return (
    <Suspense fallback={<div style={{ color: "#fff" }}>Loading...</div>}>
      <EditTicketDetailFormClient eventId={Number(eventId)} ticketRoundId={Number(ticketRoundId)} />
    </Suspense>
  );
}
