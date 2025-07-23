"use client";

import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import permitLogo from "public/assets/png/permit_logo.png";

import { Button } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const Header = () => {
  const onShopClick = () => {
    // TODO: Shop 페이지로 이동
    console.log("Shop clicked");
  };

  const onMyPageClick = () => {
    // TODO: MyPage로 이동
    console.log("MyPage clicked");
  };

  return (
    <header className={cx("header")}>
      <div className={cx("content")}>
        <Link className={cx("logo")} href="/">
          <Image src={permitLogo} alt="PERMIT" className={cx("logo_image")} />
        </Link>

        <div className={cx("actions")}>
          <Button variant="secondary" size="sm" className={cx("nav_button")} onClick={onShopClick}>
            SHOP
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className={cx("nav_button")}
            onClick={onMyPageClick}
          >
            MyPage
          </Button>
        </div>
      </div>
    </header>
  );
};
