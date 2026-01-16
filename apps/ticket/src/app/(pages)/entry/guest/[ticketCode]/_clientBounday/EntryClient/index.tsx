"use client";

import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import permitLogo from "public/assets/png/permit_logo.png";

import { Button, Flex, TextField, Typography } from "@permit/design-system";
import { useTextField } from "@permit/design-system/hooks";
import { useGuestTicketDoorValidationQuery } from "@/data/tickets/getGuestTicketDoorValidation/queries";
import { useGuestTicketStaffConfirmMutation } from "@/data/tickets/postGuestTicketStaffConfirm/mutation";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";
import { isAxiosErrorResponse } from "@/shared/types/axioxError";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const NO_ENTRY_TIME = 40013;
const ALREADY_USED_TICKET = 40906;
const CANCELED_TICKET = 40015;

type Props = {
  ticketCode: string;
};

export const EntryClient = ({ ticketCode }: Props) => {
  const { data, isLoading, error } = useGuestTicketDoorValidationQuery({
    ticketCode,
    options: { refetchOnWindowFocus: true, throwOnError: false },
  });

  const { mutateAsync: mutateCheckEntryCode, isPending: isCheckEntryCodePending } =
    useGuestTicketStaffConfirmMutation();

  const checkCodeField = useTextField({
    initialValue: "",
    validate: (value) => {
      if (!value) return "Please input check code.";

      return undefined;
    },
  });

  const handleCheckConfirm = async () => {
    if (!checkCodeField.validateValue()) {
      return;
    }

    try {
      await mutateCheckEntryCode({ ticketCode, checkCode: checkCodeField.value });
      alert("확인되었습니다.");
    } catch (error) {
      if (isAxiosErrorResponse(error)) {
        alert(error.response?.data.message || "An error occurred while verifying the code.");
      }
    }
  };

  if (isLoading) {
    return <LoadingWithLayout />;
  }

  const { code: errorCode } = error?.response?.data ?? {};

  if (errorCode === NO_ENTRY_TIME) {
    return (
      <Flex direction="column" justify="center" align="center" gap={16} style={{ height: "100vh" }}>
        <Link className={cx("logo")} href="/">
          <Image src={permitLogo} alt="PERMIT" className={cx("logo_image")} />
        </Link>
        <Typography type="title20" weight="bold" color="white">
          Ticket Not Valid at This Time
        </Typography>
        <Typography type="body16" color="gray300">
          해당 티켓의 유효 시간이 아닙니다.
        </Typography>
      </Flex>
    );
  }

  if (errorCode === ALREADY_USED_TICKET) {
    return (
      <Flex direction="column" justify="center" align="center" style={{ height: "100vh" }}>
        <Link className={cx("logo")} href="/">
          <Image src={permitLogo} alt="PERMIT" className={cx("logo_image")} />
        </Link>
        <Typography type="title20" weight="bold" color="white">
          이미 사용한 티켓입니다.
        </Typography>
      </Flex>
    );
  }

  if (errorCode === CANCELED_TICKET) {
    return (
      <Flex direction="column" justify="center" align="center" style={{ height: "100vh" }}>
        <Link className={cx("logo")} href="/">
          <Image src={permitLogo} alt="PERMIT" className={cx("logo_image")} />
        </Link>
        <Typography type="title20" weight="bold" color="white">
          취소된 티켓입니다.
        </Typography>
      </Flex>
    );
  }

  if (error) {
    throw error;
  }

  return (
    <div className={cx("container")}>
      <div className={cx("event_info")}>
        <Typography type="title24">Guest Ticket</Typography>
        <Typography type="title20" weight="bold">
          {data?.eventName}
        </Typography>
        <Typography type="body16" weight="bold" color="gray300">
          {data?.ticketName}
        </Typography>
      </div>

      <Typography type="body14">Event Verification Code</Typography>
      <TextField
        placeholder="코드를 입력해주세요"
        fullWidth
        value={checkCodeField.value}
        onChange={checkCodeField.handleChange}
        error={checkCodeField.error}
      />
      <Button
        fullWidth
        variant="cta"
        isLoading={isCheckEntryCodePending}
        onClick={handleCheckConfirm}
      >
        Check
      </Button>
    </div>
  );
};
