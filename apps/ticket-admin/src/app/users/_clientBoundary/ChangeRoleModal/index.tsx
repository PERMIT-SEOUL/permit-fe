import { useState } from "react";

import { Button, Dialog, Flex } from "@permit/design-system";
import { usePutUserRoleMutation } from "@/data/admin/putUserRole/mutation";
import { ModalComponentProps } from "@/shared/hooks/useModal/types";
import { isAxiosErrorResponse } from "@/shared/types/axioxError";

type Props = { userId: number } & ModalComponentProps<{ result: boolean }>;

export const ChangeRoleModal = ({ userId, isOpen, close }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync } = usePutUserRoleMutation({ userId });

  const changeUserRole = async (role: "ADMIN" | "STAFF" | "USER") => {
    setIsSubmitting(true);

    try {
      await mutateAsync({ role });
      alert(`${role}으로 권한 변경에 성공하였습니다.`);
    } catch (error) {
      if (isAxiosErrorResponse(error)) {
        alert(error.response?.data.message || "Failed to change user role.");

        return;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
            onClick={() => changeUserRole("ADMIN")}
            disabled={isSubmitting}
          >
            ADMIN
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => changeUserRole("STAFF")}
            disabled={isSubmitting}
          >
            STAFF
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => changeUserRole("USER")}
            disabled={isSubmitting}
          >
            USER
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog>
  );
};
