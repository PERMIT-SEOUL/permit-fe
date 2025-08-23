"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Flex, Typography } from "@permit/design-system";

/**
 * 결제 요청 실패 페이지
 * 에러 코드와 메세지 노출 방식 정하기
 */
const FailPage = () => {
  const searchParams = useSearchParams();

  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    setErrorCode(searchParams.get("code") || "");
    setErrorMessage(searchParams.get("message") || "");
    setOrderId(searchParams.get("orderId") || "");
  }, [searchParams]);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap={16}
      style={{ height: "calc(100vh - 200px)" }}
    >
      <Typography type="body16" weight="medium">
        ❌ 결제 실패 ❌
      </Typography>
      <Typography type="body16" weight="medium">
        결제 중 문제가 발생했습니다. 다시 시도해주세요.
      </Typography>

      <Flex direction="column" gap={16}>
        {(orderId || errorCode || errorMessage) && (
          <Typography type="body16" weight="medium">
            오류 정보
          </Typography>
        )}
        <Flex direction="column" gap={16}>
          {orderId && (
            <>
              <Typography type="body16" weight="medium">
                주문번호
              </Typography>
              <Typography type="body16" weight="medium">
                {orderId}
              </Typography>
            </>
          )}
          {errorCode && (
            <>
              <Typography type="body16" weight="medium">
                에러 코드
              </Typography>
              <Typography type="body16" weight="medium">
                {errorCode}
              </Typography>
            </>
          )}
          {errorMessage && (
            <>
              <Typography type="body16" weight="medium">
                에러 메시지
              </Typography>
              <Typography type="body16" weight="medium">
                {errorMessage}
              </Typography>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FailPage;
