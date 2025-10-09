"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button, Flex, Select, TextField, Typography } from "@permit/design-system";
import { useSelect, useTextField } from "@permit/design-system/hooks";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: number;
};

export function AddRoundFormClient({ eventId }: Props) {
  const router = useRouter();
  const [newRoundData, setNewRoundData] = useState({
    ticketRoundName: "",
    roundSalesStartDate: "",
    roundSalesEndDate: "",
    roundSalesStartTime: "",
    roundSalesEndTime: "",
  });

  // 티켓 라운드 이름 필드
  const ticketRoundNameField = useTextField({
    initialValue: newRoundData.ticketRoundName,
    validate: (value: string) => {
      if (!value.trim()) return "티켓 차수 이름을 입력해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setNewRoundData((prev) => ({ ...prev, ticketRoundName: value }));
    },
  });

  // 티켓 차수 판매 시작 날짜 필드
  const roundSalesStartDateField = useSelect({
    initialValue: newRoundData.roundSalesStartDate,
    validate: (value: string) => {
      if (!value) return "티켓 차수 판매 시작 날짜를 선택해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setNewRoundData((prev) => ({ ...prev, roundSalesStartDate: value }));
    },
  });

  // 티켓 차수 판매 종료 날짜 필드
  const roundSalesEndDateField = useSelect({
    initialValue: newRoundData.roundSalesEndDate,
    validate: (value: string) => {
      if (!value) return "티켓 차수 판매 종료 날짜를 선택해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setNewRoundData((prev) => ({ ...prev, roundSalesEndDate: value }));
    },
  });

  // 티켓 차수 판매 시작 시간 필드
  const roundSalesStartTimeField = useTextField({
    initialValue: newRoundData.roundSalesStartTime,
    validate: (value: string) => {
      if (!value.trim()) return "티켓 차수 판매 시작 시간을 입력해주세요.";

      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

      if (!timeRegex.test(value)) return "올바른 시간 형식이 아닙니다. (HH:MM)";

      return undefined;
    },
    onChange: (value: string) => {
      setNewRoundData((prev) => ({ ...prev, roundSalesStartTime: value }));
    },
  });

  // 티켓 차수 판매 종료 시간 필드
  const roundSalesEndTimeField = useTextField({
    initialValue: newRoundData.roundSalesEndTime,
    validate: (value: string) => {
      if (!value.trim()) return "티켓 차수 판매 종료 시간을 입력해주세요.";

      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

      if (!timeRegex.test(value)) return "올바른 시간 형식이 아닙니다. (HH:MM)";

      return undefined;
    },
    onChange: (value: string) => {
      setNewRoundData((prev) => ({ ...prev, roundSalesEndTime: value }));
    },
  });

  const handleAddRound = () => {
    // TODO: API 호출로 라운드 저장
    console.log("Saving new round:", newRoundData);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("sidebar")} />

      <div className={cx("content")}>
        <div className={cx("header")}>
          <Typography type="title24">새 티켓 라운드 추가</Typography>
          <Typography type="body16" className={cx("subtitle")}>
            이벤트 ID: {eventId}
          </Typography>
        </div>

        <Flex className={cx("form")} direction="column" gap={24}>
          <Flex gap={24}>
            <Flex className={cx("row")} direction="column" gap={12}>
              <Typography type="body16" weight="bold">
                Ticket Round Name
              </Typography>
              <TextField
                placeholder="티켓 차수 이름을 입력해주세요"
                value={ticketRoundNameField.value}
                onChange={ticketRoundNameField.handleChange}
                error={ticketRoundNameField.error}
              />
            </Flex>
          </Flex>

          <div>
            <Typography type="body16" weight="bold">
              Sales period
            </Typography>
            <Typography type="body12" color="gray300">
              Date & Time
            </Typography>
          </div>

          <Flex gap={24}>
            <Flex className={cx("row")} direction="column" gap={12}>
              <Typography type="body16" weight="bold">
                Sales Start Date
              </Typography>
              <Select
                type="calendar"
                placeholder="티켓 차수 판매 시작 날짜를 선택해주세요"
                {...roundSalesStartDateField.selectProps}
              />
            </Flex>
            <Flex className={cx("row")} direction="column" gap={12}>
              <Typography type="body16" weight="bold">
                Sales End Date
              </Typography>
              <Select
                type="calendar"
                placeholder="티켓 차수 판매 종료 날짜를 선택해주세요"
                {...roundSalesEndDateField.selectProps}
              />
            </Flex>
          </Flex>

          <Flex gap={24}>
            <Flex className={cx("row")} direction="column" gap={12}>
              <Typography type="body16" weight="bold">
                Sales Start Time
              </Typography>
              <TextField
                placeholder="티켓 차수 판매 시작 시간을 입력해주세요 (HH:MM)"
                value={roundSalesStartTimeField.value}
                onChange={roundSalesStartTimeField.handleChange}
                error={roundSalesStartTimeField.error}
              />
            </Flex>
            <Flex className={cx("row")} direction="column" gap={12}>
              <Typography type="body16" weight="bold">
                Sales End Time
              </Typography>
              <TextField
                placeholder="티켓 차수 판매 종료 시간을 입력해주세요 (HH:MM)"
                value={roundSalesEndTimeField.value}
                onChange={roundSalesEndTimeField.handleChange}
                error={roundSalesEndTimeField.error}
              />
            </Flex>
          </Flex>

          <Button variant="cta" size="md" onClick={handleAddRound}>
            Add Round
          </Button>
        </Flex>
      </div>
    </div>
  );
}
