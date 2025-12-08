import { Suspense } from "react";

import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";

import { AddRoundFormClient } from "./_clientBoundary/AddRoundFormClient";

type Props = {
  params: Promise<{ eventId: number }>;
};

export default async function AddRoundPage({ params }: Props) {
  const { eventId } = await params;

  return (
    <Suspense fallback={<LoadingWithLayout />}>
      <AddRoundFormClient eventId={eventId} />
    </Suspense>
  );
}
