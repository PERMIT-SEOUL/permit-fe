"use client";

import Image from "next/image";
import classNames from "classnames/bind";
import googleLogo from "public/assets/png/google_logo.png";
import kakaoLogo from "public/assets/png/kakao_logo.png";

import { Typography } from "@permit/design-system";
import { useOAuth } from "@/shared/hooks/useOAuth";
import { SOCIAL_LOGIN_TYPE } from "@/shared/hooks/useOAuth/types";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

/**
 * 로그인 페이지
 */
const LoginPage = () => {
  const { handleLogin } = useOAuth();

  return (
    <div className={cx("wrap")}>
      <Typography type="body16" color="white">
        Login
      </Typography>

      <button
        className={cx("button", "kakao")}
        onClick={() => handleLogin(SOCIAL_LOGIN_TYPE.KAKAO)}
      >
        <Image src={kakaoLogo} alt="kakao" width={20} height={20} />
        <Typography className={cx("text")} type="body14" color="black">
          Login with kakao
        </Typography>
      </button>
      <button
        className={cx("button", "google")}
        onClick={() => handleLogin(SOCIAL_LOGIN_TYPE.GOOGLE)}
      >
        <Image src={googleLogo} alt="google" width={20} height={20} />
        <Typography className={cx("text")} type="body14" color="gray200">
          Login with Google
        </Typography>
      </button>
    </div>
  );
};

export default LoginPage;
