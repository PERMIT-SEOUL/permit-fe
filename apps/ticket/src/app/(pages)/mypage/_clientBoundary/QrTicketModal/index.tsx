import classNames from "classnames/bind";
import { QRCodeSVG } from "qrcode.react";

import { Dialog, Flex, Typography } from "@permit/design-system";
import { useIsMobile } from "@permit/design-system/hooks";
import { ModalComponentProps } from "@/shared/hooks/useModal/types";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type QrTicketInfo = {
  ticketCode: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  ticketName: string;
  eventVenue: string;
};

type Props = {
  ticketInfo: QrTicketInfo;
} & ModalComponentProps<{ result: boolean }>;

export const QrTicketModal = ({ isOpen, close, ticketInfo }: Props) => {
  const isMobile = useIsMobile();

  // TODO: 어드민 연결 후 확인
  const qrCodeUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/entry/${ticketInfo.ticketCode}`;

  return (
    <Dialog open={isOpen} title={ticketInfo.eventName} onClose={() => close()}>
      <Dialog.Content>
        <div>
          <Typography type="body16" color="gray300" weight="bold">
            {ticketInfo.ticketName}
          </Typography>
          <Typography className={cx("event_venue")} type="body14" color="gray300">
            {ticketInfo.eventVenue}
          </Typography>
          <Flex className={cx("date_time_wrap")} gap={30}>
            <Typography type="body14" color="gray300">
              {ticketInfo.eventDate}
            </Typography>
            <Typography type="body14" color="gray300">
              {ticketInfo.eventTime}
            </Typography>
          </Flex>
          <div className={cx("qr_code_wrap")}>
            <QRCodeSVG value={qrCodeUrl} size={isMobile ? 180 : 224} />
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
