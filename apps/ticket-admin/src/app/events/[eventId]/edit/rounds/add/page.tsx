import { Suspense } from "react";

import { AddRoundFormClient } from "./_clientBoundary/AddRoundFormClient";

type Props = {
  params: {
    eventId: string;
  };
};

export default function AddRoundPage({ params }: Props) {
  const eventId = Number(params.eventId);

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <AddRoundFormClient eventId={eventId} />
    </Suspense>
  );
}
