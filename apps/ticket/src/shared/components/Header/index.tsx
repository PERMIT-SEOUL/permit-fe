"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames/bind";
import permitLogo from "public/assets/png/permit_logo.png";

import { Button } from "@permit/design-system";
import { safeLocalStorage } from "@/lib/storage";
import { IS_LOGINED } from "@/shared/constants/storage";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    try {
      const stored = safeLocalStorage.get(IS_LOGINED);

      if (stored !== null) {
        setIsLogined(JSON.parse(stored));
      }
    } catch {
      // 파싱 실패 시 기본값(false) 유지
    }
  }, [pathname]);

  const onShopClick = () => {
    // TODO: Shop 페이지로 이동
    console.log("Shop clicked");
  };

  const onMyPageClick = () => {
    // TODO: MyPage로 이동
    console.log("MyPage clicked");
  };

  const onLoginClick = () => {
    router.push("/login");
  };

  return (
    <header className={cx("header")}>
      <div className={cx("content")}>
        <Link className={cx("logo")} href="/">
          <Image src={permitLogo} alt="PERMIT" className={cx("logo_image")} />
        </Link>

        <div className={cx("actions")}>
          {/* TODO: 쇼핑 페이지 추가 시 주석 해제 */}
          {/* <Button variant="secondary" size="sm" className={cx("nav_button")} onClick={onShopClick}>
            SHOP
          </Button> */}
          <Button
            variant="secondary"
            size="sm"
            className={cx("nav_button")}
            onClick={isLogined ? onMyPageClick : onLoginClick}
          >
            {isLogined ? "MyPage" : "Login"}
          </Button>
        </div>
      </div>
    </header>
  );
};
