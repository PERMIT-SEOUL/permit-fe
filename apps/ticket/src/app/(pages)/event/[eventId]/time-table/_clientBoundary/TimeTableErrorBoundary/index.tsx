"use client";

import { ReactNode } from "react";

import { Button, Flex, Typography } from "@permit/design-system";
import { ErrorBoundary, ErrorHandler } from "@/shared/clientBoundary/ErrorBoundary";
import { AxiosErrorResponse } from "@/shared/types/axioxError";

type Props = {
  children: ReactNode;
  eventId: string;
};

const NOT_FOUND_TIME_TABLE_ERROR_CODE = 40420;

export const TimeTableErrorBoundary = ({ children, eventId }: Props) => {
  return <ErrorBoundary handlers={timeTableErrorHandlers({ eventId })}>{children}</ErrorBoundary>;
};

const timeTableErrorHandlers = ({ eventId }: { eventId?: string }): ErrorHandler[] => [
  {
    isError: (error) => isTimeTableNotRegisteredError(error as AxiosErrorResponse),
    fallback: () => {
      return (
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap={16}
          style={{ height: "calc(100vh - 150px)" }}
        >
          <Typography type="title20">아직 타임테이블이 등록되지 않았어요.</Typography>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              window.location.href = `/event/${eventId}`;
            }}
          >
            이벤트 보기
          </Button>
        </Flex>
      );
    },
  },
];

const isTimeTableNotRegisteredError = (error: AxiosErrorResponse) => {
  return error.code === NOT_FOUND_TIME_TABLE_ERROR_CODE;
};
