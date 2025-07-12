"use client";

import classNames from "classnames/bind";

import { Button, Flex, Typography } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const CtaButtonClient = () => {
  const goToTicket = () => {
    // TODO: 마이페이지 티켓 정보로 이동
  };

  return (
    <Flex direction="column" align="center" gap={12}>
      <Typography type="body14" color="gray400">
        You can view your tickets on Mypage
      </Typography>

      <Button className={cx("button")} size="md" onClick={goToTicket}>
        Go to Ticket
      </Button>
    </Flex>
  );
};
