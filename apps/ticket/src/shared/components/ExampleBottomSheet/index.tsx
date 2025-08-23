import { BottomSheet, Button, Flex, Typography, useBottomSheetClose } from "@permit/design-system";

import { BottomSheetComponentProps } from "../../hooks/useBottomSheet/types";

type ExampleBottomSheetProps = {
  title: string;
} & BottomSheetComponentProps<boolean>;

/**
 * BottomSheet 사용 예시 컴포넌트
 */
const ExampleBottomSheetContent = () => {
  const { close } = useBottomSheetClose();

  const handleCancel = () => {
    close(false);
  };

  const handleConfirm = () => {
    close(true);
  };

  return (
    <>
      <BottomSheet.Content>
        <Typography type="body16" color="white">
          이것은 ExampleBottomSheet 컴포넌트입니다!
        </Typography>
      </BottomSheet.Content>

      <BottomSheet.Bottom>
        <Flex gap={12}>
          <Button variant="secondary" onClick={handleCancel}>
            취소
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            확인
          </Button>
        </Flex>
      </BottomSheet.Bottom>
    </>
  );
};

export const ExampleBottomSheet = ({ isOpen, close, title }: ExampleBottomSheetProps) => {
  return (
    <BottomSheet open={isOpen} onClose={() => close(false)} title={title}>
      <ExampleBottomSheetContent />
    </BottomSheet>
  );
};
