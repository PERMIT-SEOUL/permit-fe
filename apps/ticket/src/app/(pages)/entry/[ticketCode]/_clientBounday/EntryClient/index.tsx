"use client";

import classNames from "classnames/bind";

import { Button, TextField, Typography } from "@permit/design-system";
import { useTextField } from "@permit/design-system/hooks";
import { useTicketDoorValidationQuery } from "@/data/tickets/getTicketDoorValidation/queries";
import { useTicketStaffConfirmMutation } from "@/data/tickets/postTicketStaffConfirm/mutation";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";
import { isAxiosErrorResponse } from "@/shared/types/axioxError";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  ticketCode: string;
};

export const EntryClient = ({ ticketCode }: Props) => {
  // TODO: 정상 동작 확인 하기
  const { data, isLoading, error } = useTicketDoorValidationQuery({
    ticketCode,
    options: { refetchOnWindowFocus: true, throwOnError: false },
  });

  const { mutateAsync: mutateCheckEntryCode, isPending: isCheckEntryCodePending } =
    useTicketStaffConfirmMutation();

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
    } catch (e) {
      if (isAxiosErrorResponse(e)) {
        alert(e.message || "An error occurred while verifying the code.");
      }
    }
  };

  if (isLoading) {
    return <LoadingWithLayout />;
  }

  // TODO: 정상 동작 확인 하기
  // if (error) {
  //   return (
  //     <div className={cx("container")}>
  //       <Typography type="title20" weight="bold" color="error">
  //         Failed to load ticket information.
  //       </Typography>
  //       <Typography type="body16" color="gray300">
  //         {isAxiosErrorResponse(error) ? error.message : "An unexpected error occurred."}
  //       </Typography>
  //     </div>
  //   );
  // }

  return (
    <div className={cx("container")}>
      <div className={cx("event_info")}>
        <Typography type="title20" weight="bold">
          Ceiling service vol.6 -Ksawery Komputery [PL]
        </Typography>
        <Typography type="body16" weight="bold" color="gray300">
          Day 1
        </Typography>

        <Typography type="body14" color="gray300">
          2025.03.15 19:00 ~ 2025.03.15 ~ 22:00
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
