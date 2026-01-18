"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames/bind";
import permitLogo from "public/assets/png/permit_logo.png";

import { Button } from "@permit/design-system";
import { useLogoutMutation } from "@/data/users/postUserLogout/mutation";
import { safeLocalStorage } from "@/lib/storage";
import { PATH } from "@/shared/constants/path";
import { IS_LOGINED } from "@/shared/constants/storage";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isLogined, setIsLogined] = useState(false);

  const { mutateAsync: mutateLogout } = useLogoutMutation();

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

  const handleSignout = async () => {
    try {
      // TODO: 로그아웃 여부 물어봐야할까?
      if (!confirm("로그아웃 하시겠습니까?")) {
        return;
      }

      await mutateLogout();

      safeLocalStorage.remove(IS_LOGINED);
      window.location.href = `${PATH.LOGIN}?redirectUrl=${encodeURIComponent(pathname)}`;
    } catch (error) {
      // 로그아웃 에러는 처리하지 않고, 로그인 페이지로 이동
      safeLocalStorage.remove(IS_LOGINED);
      window.location.href = `${PATH.LOGIN}?redirectUrl=${encodeURIComponent(pathname)}`;
    }
  };

  const onLoginClick = () => {
    router.push(`${PATH.LOGIN}?redirectUrl=${encodeURIComponent(pathname)}`);
  };

  return (
    <header className={cx("header")}>
      <div className={cx("content")}>
        <Link className={cx("logo")} href="/">
          <Image src={permitLogo} alt="PERMIT" className={cx("logo_image")} />
        </Link>

        <div className={cx("actions")}>
          <Button
            variant="secondary"
            size="sm"
            className={cx("nav_button")}
            onClick={isLogined ? handleSignout : onLoginClick}
          >
            {isLogined ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    </header>
  );
};
