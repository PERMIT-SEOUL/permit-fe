import { useState } from "react";

import { Button, Dialog, Flex } from "@permit/design-system";
import { ModalComponentProps } from "@/shared/hooks/useModal/types";

export const DialogContent = ({ isOpen, close }: ModalComponentProps<boolean>) => {
  const [isOpenAdditionalInfo, setIsOpenAdditionalInfo] = useState(false);

  return (
    <Dialog
      open={isOpen}
      title="Title"
      subTitle="sub text"
      onClose={() => {
        close();
      }}
    >
      <Dialog.Content>
        <Button
          onClick={() => {
            alert("additional info dialog open");
            setIsOpenAdditionalInfo(true);
          }}
        >
          Content 더 열기
        </Button>
        {isOpenAdditionalInfo && (
          <div>
            <Button onClick={() => setIsOpenAdditionalInfo(false)}>Content 닫기</Button>
          </div>
        )}
      </Dialog.Content>

      <Dialog.Bottom>
        <Flex gap={12}>
          <Button
            variant="secondary"
            onClick={() => {
              close(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              close(true);
            }}
          >
            Yes, Confirm
          </Button>
        </Flex>
      </Dialog.Bottom>
    </Dialog>
  );
};
