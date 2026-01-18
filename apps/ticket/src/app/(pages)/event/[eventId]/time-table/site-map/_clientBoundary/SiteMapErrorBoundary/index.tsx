"use client";

import { ReactNode } from "react";

import { Button, Flex, Typography } from "@permit/design-system";
import { ErrorBoundary, ErrorHandler } from "@/shared/clientBoundary/ErrorBoundary";
import { AxiosErrorResponse, isAxiosErrorResponse } from "@/shared/types/axioxError";

type Props = {
  children: ReactNode;
};

const NOT_FOUND_SITE_MAP_ERROR_CODE = 40429;

export const SiteMapErrorBoundary = ({ children }: Props) => {
  return <ErrorBoundary handlers={siteMapErrorHandlers}>{children}</ErrorBoundary>;
};

const siteMapErrorHandlers: ErrorHandler[] = [
  {
    isError: (error) => isSiteMapNotRegisteredError(error as AxiosErrorResponse),
    fallback: () => (
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap={16}
        style={{ height: "calc(100vh - 150px)" }}
      >
        <Typography type="title20">아직 사이트맵이 등록되지 않았어요.</Typography>
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          홈으로 이동
        </Button>
      </Flex>
    ),
  },
];

const isSiteMapNotRegisteredError = (error: AxiosErrorResponse) => {
  return isAxiosErrorResponse(error) && error.response?.data.code === NOT_FOUND_SITE_MAP_ERROR_CODE;
};
