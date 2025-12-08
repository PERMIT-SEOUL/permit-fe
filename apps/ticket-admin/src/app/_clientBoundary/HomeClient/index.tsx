"use client";

import Link from "next/link";
import classNames from "classnames/bind";

import { useEventsListQuery } from "@/data/admin/getEvents/queries";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const HomeClient = () => {
  const { isLoading } = useEventsListQuery({});

  if (isLoading) {
    return <LoadingWithLayout />;
  }

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>Ticket Admin</h1>
      <p className={cx("description")}>티켓 관리자 대시보드에 오신 것을 환영합니다.</p>
      <div className={cx("links")}>
        <Link href="/events" className={cx("link")}>
          이벤트 관리
        </Link>
        <Link href="/guests" className={cx("link")}>
          게스트 관리
        </Link>
      </div>
    </div>
  );
};
