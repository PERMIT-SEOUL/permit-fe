"use client";

import { useState } from "react";

import { Button, Dialog, Flex } from "@permit/design-system";
import { useOverlay } from "@permit/design-system/hooks";
import { CURRENT_ENV } from "@/shared/constants/env";

/**
 * Dialog 컨텐츠 컴포넌트
 */
const DialogContent = ({
  isOpen,
  close,
  resolve,
}: {
  isOpen: boolean;
  close: () => void;
  resolve: (value: boolean) => void;
}) => {
  const [isOpenAdditionalInfo, setIsOpenAdditionalInfo] = useState(false);

  return (
    <Dialog
      open={isOpen}
      title="Title"
      subTitle="sub text"
      onClose={() => {
        resolve(false);
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
              resolve(false);
              close();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              resolve(true);
              close();
            }}
          >
            Yes, Confirm
          </Button>
        </Flex>
      </Dialog.Bottom>
    </Dialog>
  );
};

/**
 * 홈 페이지
 */
const Home = () => {
  const { open } = useOverlay();

  const openFooConfirmDialog = () => {
    return new Promise((resolve) => {
      const dialog = open(({ isOpen, close }) => (
        <DialogContent isOpen={isOpen} close={close} resolve={resolve} />
      ));

      return dialog;
    });
  };

  return (
    <div>
      Hello world!
      <br />
      current env is {CURRENT_ENV}
      <br />
      <Button
        onClick={async () => {
          const result = await openFooConfirmDialog();

          console.log(result);
        }}
      >
        Open Dialog
      </Button>
    </div>
  );
};

export default Home;
