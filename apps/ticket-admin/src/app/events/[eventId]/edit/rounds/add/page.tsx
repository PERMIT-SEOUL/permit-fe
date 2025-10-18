import { Suspense } from "react";

import { AddRoundFormClient } from "./_clientBoundary/AddRoundFormClient";

type Props = {
  params: Promise<{ eventId: number }>;
};

export default async function AddRoundPage({ params }: Props) {
  const { eventId } = await params;

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <AddRoundFormClient eventId={eventId} />
    </Suspense>
  );
}
