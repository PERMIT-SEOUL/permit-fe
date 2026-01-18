"use client";

import { useEffect } from "react";

import { Flex, Typography } from "@permit/design-system";
import { safeLocalStorage } from "@/lib/storage";
import { PATH } from "@/shared/constants/path";
import { IS_LOGINED } from "@/shared/constants/storage";

// TODO: 추후 변경
export const RequiredLoginFallback = () => {
  useEffect(() => {
    function redirectToLogin() {
      alert("로그인 후 이용해 주세요.");
      safeLocalStorage.remove(IS_LOGINED);

      const redirectUrl = window.location.pathname + window.location.search;

      const loginUrl = `${PATH.LOGIN}?redirectUrl=${encodeURIComponent(redirectUrl)}`;

      window.location.href = loginUrl;
    }

    redirectToLogin();
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap={16}
      style={{ height: "calc(100vh" }}
    >
      <Typography type="title20">로그인 화면으로 이동 중이에요</Typography>
      <Typography type="body14">잠시만 기다려주세요</Typography>
    </Flex>
  );
};
