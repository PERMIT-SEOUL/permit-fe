"use client";

import { usePathname } from "next/navigation";
import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const Footer = () => {
  const pathname = usePathname();

  const isEventPage = /^\/event\/[^/]+$/.test(pathname);

  return (
    <footer className={cx("container", { is_event_page: isEventPage })}>
      <div className={cx("links")}>
        <Typography type="body12" color="gray400">
          Copyright © 2024 PERMIT
        </Typography>
        <Typography type="body12" color="gray400">
          Instagram_Permit
        </Typography>
        <Typography type="body12" color="gray400">
          Instagram_ceiling
        </Typography>
        <Typography type="body12" color="gray400">
          hello@permitseoul.com
        </Typography>
      </div>
      <Typography className={cx("info")} type="body12" color="gray400">
        퍼밋(PERMIT) | 대표 곽희준 | 사업자등록번호(268-13-02526) | 사업장 주소: 경기도 용인시
        기흥구 강남서로 9, 7층 703호 -b705(구갈동) | 통신판매업 신고번호: 2025-용인기흥-01329
        유선번호: 010-8775-4618 |{" "}
        <a
          href="https://natural-server-9a4.notion.site/PERMIT-239132f3c6c680a4aa47ca8e02d0a5c2?source=copy_link"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline" }}
        >
          환불 정책
        </a>
      </Typography>
    </footer>
  );
};
