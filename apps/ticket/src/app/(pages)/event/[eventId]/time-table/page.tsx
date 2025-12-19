import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { timetablesOptions } from "@/data/events/getTimetables/queries";
import { getQueryClient } from "@/lib/queryClient/helpers/getQueryClient";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";

import { TimeTableClient } from "./_clientBoundary/TimeTableClient";
import { TimeTableErrorBoundary } from "./_clientBoundary/TimeTableErrorBoundary";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  params: Promise<{ eventId: string }>;
};

/**
 * 타임테이블 페이지
 */
const TimeTablePage = async ({ params }: Props) => {
  const { eventId } = await params;

  const qc = getQueryClient();

  qc.prefetchQuery(timetablesOptions({ eventId }));

  return (
    <TimeTableErrorBoundary eventId={eventId}>
      <HydrationBoundary state={dehydrate(qc)}>
        <Suspense fallback={<LoadingWithLayout />}>
          <div className={cx("container")}>
            <TimeTableClient eventId={eventId} />
          </div>
        </Suspense>
      </HydrationBoundary>
    </TimeTableErrorBoundary>
  );
};

export default TimeTablePage;
