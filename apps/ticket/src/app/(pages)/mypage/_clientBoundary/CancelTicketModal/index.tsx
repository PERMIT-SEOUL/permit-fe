import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { Button, Dialog, Flex, Typography } from "@permit/design-system";
import { usePaymentCancelMutation } from "@/data/payments/postPaymentCancel/mutation";
import { USER_QUERY_KEYS } from "@/data/users/queryKeys";
import { redirectToLoginOnce } from "@/shared/helpers/redirectToLoginOnce";
import { ModalComponentProps } from "@/shared/hooks/useModal/types";
import { isAxiosErrorResponse, isNotAuthErrorResponse } from "@/shared/types/axioxError";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  orderId: string;
  eventName: string;
} & ModalComponentProps<{ result: boolean }>;

export const CancelTicketModal = ({ isOpen, close, orderId, eventName }: Props) => {
  const qc = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = usePaymentCancelMutation();

  const handleCancelOrder = async () => {
    try {
      setIsLoading(true);
      await mutateAsync({ orderId });
      qc.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.TICKETS],
      });

      close({ result: true });
    } catch (error) {
      if (isNotAuthErrorResponse(error)) {
        redirectToLoginOnce();

        return;
      }

      if (isAxiosErrorResponse(error)) {
        // TODO: 토스트나 커스텀 모달로 변경
        alert(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} title="Cancel Ticket" onClose={() => close()}>
      <Dialog.Content>
        <Typography className={cx("event_name")} type="body14" color="gray100">
          {eventName}
        </Typography>
      </Dialog.Content>
      <Dialog.Bottom>
        <Flex gap={12}>
          <Button
            variant="error"
            size="sm"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={handleCancelOrder}
          >
            Cancel ticket
          </Button>
          <Button variant="secondary" size="sm" onClick={() => close()}>
            Close
          </Button>
        </Flex>
      </Dialog.Bottom>
    </Dialog>
  );
};
