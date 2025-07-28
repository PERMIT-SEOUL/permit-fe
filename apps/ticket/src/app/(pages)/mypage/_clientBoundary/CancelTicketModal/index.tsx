import classNames from "classnames/bind";

import { Button, Dialog, Flex, Typography } from "@permit/design-system";
import { ModalComponentProps } from "@/shared/hooks/useModal/types";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  orderId: string;
  eventName: string;
} & ModalComponentProps<{ result: boolean }>;

export const CancelTicketModal = ({ isOpen, close, orderId, eventName }: Props) => {
  const handleCancelOrder = async () => {};

  return (
    <Dialog open={isOpen} title="Cancel Ticket" onClose={() => close()}>
      <Dialog.Content>
        <Typography className={cx("event_name")} type="body14" color="gray100">
          {eventName}
        </Typography>
      </Dialog.Content>
      <Dialog.Bottom>
        <Flex gap={12}>
          <Button variant="secondary" size="sm" onClick={() => close()}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleCancelOrder}>
            Done
          </Button>
        </Flex>
      </Dialog.Bottom>
    </Dialog>
  );
};
