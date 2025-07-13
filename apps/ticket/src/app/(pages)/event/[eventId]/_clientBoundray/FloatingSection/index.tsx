"use client";

import classNames from "classnames/bind";

import { Button } from "@permit/design-system";
import { DialogContent } from "@/app/(pages)/sample/_clientBoundary/DialogContent";
import { useModal } from "@/shared/hooks/useModal";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: number;
};

export const FloatingSection = ({ eventId }: Props) => {
  const { show: openDialog } = useModal(DialogContent);

  const selectTicket = async () => {
    const result = await openDialog();

    console.log("Selected Ticket:", result);
  };

  return (
    <div className={cx("floating")}>
      <Button className={cx("button")} variant="primary" size="md" onClick={selectTicket}>
        Buy Ticket
      </Button>
    </div>
  );
};
