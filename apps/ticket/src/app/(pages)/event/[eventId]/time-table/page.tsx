import { Suspense } from "react";

import { timetablesOptions } from "@/data/events/getTimetables/queries";
import { getQueryClient } from "@/lib/queryClient/helpers/getQueryClient";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";

import { TimeTableClient } from "./_clientBoundary/TimeTableClient";

type Props = {
  params: Promise<{ eventId: string }>;
};

/**
 * 타임테이블 페이지
 */
export const TimeTablePage = async ({ params }: Props) => {
  const { eventId } = await params;

  const qc = getQueryClient();

  qc.prefetchQuery(timetablesOptions({ eventId }));

  return (
    <Suspense fallback={<LoadingWithLayout />}>
      <TimeTableClient eventId={eventId} />
    </Suspense>
  );
};

export default TimeTablePage;
