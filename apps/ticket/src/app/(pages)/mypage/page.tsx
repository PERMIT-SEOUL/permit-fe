import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { userInfoOptions } from "@/data/users/getUserInfo/queries";
import { userTicketsOptions } from "@/data/users/getUserTickets/queries";
import { getQueryClient } from "@/lib/queryClient/helpers/getQueryClient";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";

import { MyPageClient } from "./_clientBoundary/MyPageClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

// 마이페이지는 사용자별 데이터를 보여주므로 동적 렌더링으로 설정
export const dynamic = "force-dynamic";

/**
 * 마이페이지
 */
const MyPage = () => {
  const qc = getQueryClient();

  qc.prefetchQuery(userInfoOptions());
  qc.prefetchQuery(userTicketsOptions());

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <div className={cx("container")}>
        <Suspense fallback={<LoadingWithLayout />}>
          <MyPageClient />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
};

export default MyPage;
