"use client";

import classNames from "classnames/bind";

import { Flex, Typography } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

/**
 * 환불 정책 페이지
 */
const RefundPolicyPage = () => {
  return (
    <Flex className={cx("wrap")} direction="column" align="center" gap={24}>
      <Typography type="title24">PERMIT 환불 정책</Typography>

      <Typography type="title20">✅ 환불 정책 안내</Typography>
      <br />

      <Typography className={cx("policy")} type="body16">
        - 본 티켓은 <b>행사 시작일 기준 5일 전까지</b> 취소 시 <b>100% 환불</b>이 가능합니다.
        <br />
        <br /> -<b> 행사 시작일 5일 전 이후</b>에는 <b>어떠한 사유로도 환불이 불가능</b>합니다.
        <br />
        <br /> - 환불 가능 기간 내 취소 요청 시, 결제하신 금액은{" "}
        <b>영업일 기준 3~5일 내 원결제 수단으로 환불</b>
        됩니다.
        <br />
        <br />※ 본 환불 정책은 [전자상거래 등에서의 소비자 보호에 관한 법률] 제17조 및 제21조를
        준수합니다.
      </Typography>
    </Flex>
  );
};

export default RefundPolicyPage;
