import { useState } from "react";

import { Button, Dialog, Flex } from "@permit/design-system";
import { ModalComponentProps } from "@/shared/hooks/useModal/types";

type Props = {} & ModalComponentProps<{ result: boolean }>;

// TODO: 수정
export const ChangeRoleModal = ({ isOpen, close }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    if (!isSubmitting) {
      close();
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} title="Change User Role">
      <Dialog.Content>
        <Flex gap={12}>
          <Button
            variant="primary"
            size="md"
            onClick={() => {}}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            ADMIN
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => {}}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            STAFF
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => {}}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            USER
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog>
  );
};
