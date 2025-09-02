"use client";

import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import permitLogo from "public/assets/png/permit_logo.png";
import { useEffect, useState } from "react";

import { Typography } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const Header = () => {
  const pathname = usePathname();

  const [isActiveTab, setIsActiveTab] = useState<"event" | "guest" | undefined>(undefined);

  useEffect(() => {
    if (pathname.includes("/events")) {
      setIsActiveTab("event");
    } else if (pathname.includes("/guests")) {
      setIsActiveTab("guest");
    }
  }, [pathname]);

  return (
    <header className={cx("header")}>
      <div className={cx("content")}>
        <Link className={cx("logo")} href="/">
          <Image src={permitLogo} alt="PERMIT" className={cx("logo_image")} />
        </Link>

        <Link href="/events">
          <Typography
            className={cx("tab", { active: isActiveTab === "event" })}
            type="body16"
            color="gray400"
          >
            event / ticket
          </Typography>
        </Link>
        <Link href="/guests">
          <Typography
            className={cx("tab", { active: isActiveTab === "guest" })}
            type="body16"
            color="gray400"
          >
            Guest
          </Typography>
        </Link>

        <div className={cx("actions")}>
          {/* <Button
            variant="secondary"
            size="sm"
            className={cx("nav_button")}
            onClick={isLogined ? onMyPageClick : onLoginClick}
          >
            {isLogined ? "MyPage" : "Login"}
          </Button> */}
        </div>
      </div>
    </header>
  );
};
