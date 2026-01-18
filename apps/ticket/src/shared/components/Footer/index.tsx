"use client";

import { usePathname } from "next/navigation";
import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const Footer = () => {
  const pathname = usePathname();

  const isEntryPage = pathname.includes("/entry");
  const isEventPage = /^\/event\/[^/]+$/.test(pathname);
  const isTimeTablePage = /^\/event\/[^/]+\/time-table$/.test(pathname);
  const isSiteMapPage = pathname.includes("/site-map");

  return (
    <footer
      className={cx("container", {
        is_event_page: isEventPage,
        no_footer: isTimeTablePage || isEntryPage || isSiteMapPage,
      })}
    >
      <div className={cx("links")}>
        <Typography type="body12" color="gray400">
          Copyright © 2024 PERMIT
        </Typography>
        <a href="https://www.instagram.com/permit_invites/" target="_blank" rel="noreferrer">
          <Typography type="body12" color="gray400">
            Instagram_Permit
          </Typography>
        </a>
        <a href="https://www.instagram.com/ceilingservice/" target="_blank" rel="noreferrer">
          <Typography type="body12" color="gray400">
            Instagram_Ceiling
          </Typography>
        </a>
        <a href="https://www.instagram.com/olympan.kr/" target="_blank" rel="noreferrer">
          <Typography type="body12" color="gray400">
            Instagram_Olympan
          </Typography>
        </a>
        <Typography type="body12" color="gray400">
          hello@permitseoul.com
        </Typography>
      </div>
      <Typography className={cx("info")} type="body12" color="gray400">
        퍼밋(PERMIT) | 대표 곽희준 | 사업자등록번호(268-13-02526) | 사업장 주소: 경기도 용인시
        기흥구 강남서로 9, 7층 703호 -b705(구갈동) | 통신판매업 신고번호: 2025-용인기흥-01329 |
        유선번호: 010-8895-4618
      </Typography>
      <br />
      <a
        href="https://natural-server-9a4.notion.site/2eb132f3c6c68090b9bac43a8763b615?source=copy_link"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "underline", color: "#888888" }}
      >
        서비스 이용약관
      </a>
      <span style={{ color: "#888888" }}> | </span>
      <a
        href="https://natural-server-9a4.notion.site/2eb132f3c6c6807fbe5dfc225f638909?source=copy_link"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "underline", color: "#888888" }}
      >
        개인정보 처리 방침
      </a>
      <span style={{ color: "#888888" }}> | </span>
      <a
        href="/refund-policy"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "underline", color: "#888888" }}
      >
        환불 정책
      </a>
    </footer>
  );
};
