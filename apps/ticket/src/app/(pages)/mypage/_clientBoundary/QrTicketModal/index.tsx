import classNames from "classnames/bind";
import { QRCodeSVG } from "qrcode.react";

import { Dialog, Typography } from "@permit/design-system";
import { useIsMobile } from "@permit/design-system/hooks";
import { ModalComponentProps } from "@/shared/hooks/useModal/types";

const cx = classNames.bind({});

export type QrTicketInfo = {
  ticketCode: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
};

type Props = {
  ticketInfo: QrTicketInfo;
} & ModalComponentProps<{ result: boolean }>;

export const QrTicketModal = ({ isOpen, close, ticketInfo }: Props) => {
  const isMobile = useIsMobile();

  return (
    <Dialog open={isOpen} title="" onClose={() => close()}>
      <Dialog.Content>
        <div>
          <Typography type="body16" color="gray100">
            {ticketInfo.eventName}
          </Typography>
          <Typography type="body14" color="gray100">
            {ticketInfo.eventDate}
          </Typography>
          <Typography type="body14" color="gray100">
            {ticketInfo.eventTime}
          </Typography>
          <QRCodeSVG
            value={`${typeof window !== "undefined" ? window.location.origin : ""}/entry/${ticketInfo.ticketCode}`}
            size={isMobile ? 240 : 300}
          />
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
