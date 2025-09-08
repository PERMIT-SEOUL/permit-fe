"use client";

import { useState } from "react";

import { BottomSheet, Button, Flex, Typography, useBottomSheetClose } from "@permit/design-system";

import { ExampleBottomSheet } from "../../../shared/components/ExampleBottomSheet";
import { useBottomSheet } from "../../../shared/hooks/useBottomSheet";
import { BottomSheetComponentProps } from "../../../shared/hooks/useBottomSheet/types";

// 간단한 BottomSheet 컴포넌트
type SimpleBottomSheetProps = {
  title: string;
} & BottomSheetComponentProps<string>;

const SimpleBottomSheetContent = () => {
  const { close } = useBottomSheetClose();

  return (
    <>
      <BottomSheet.Content>
        <Flex direction="column" gap={16}>
          <Typography type="body16" color="white">
            이것은 간단한 BottomSheet 예시입니다.
          </Typography>
          <Typography type="body14" color="gray400">
            아래로 드래그하거나 X 버튼을 눌러서 닫을 수 있습니다.
          </Typography>
        </Flex>
      </BottomSheet.Content>

      <BottomSheet.Bottom>
        <Button fullWidth variant="cta" onClick={() => close(true)}>
          확인
        </Button>
      </BottomSheet.Bottom>
    </>
  );
};

const SimpleBottomSheet = ({ isOpen, close, title }: SimpleBottomSheetProps) => {
  return (
    <BottomSheet open={isOpen} onClose={() => close("cancelled")} title={title}>
      <SimpleBottomSheetContent />
    </BottomSheet>
  );
};

// 긴 콘텐츠 BottomSheet 컴포넌트
type LongContentBottomSheetProps = {
  title: string;
} & BottomSheetComponentProps<boolean>;

const LongContentBottomSheet = ({ isOpen, close, title }: LongContentBottomSheetProps) => {
  return (
    <BottomSheet open={isOpen} onClose={() => close(false)} title={title}>
      <BottomSheet.Content>
        <Flex direction="column" gap={16}>
          <Typography type="body16" color="white">
            긴 콘텐츠를 테스트하는 BottomSheet입니다.
          </Typography>
          {Array.from({ length: 20 }, (_, index) => (
            <Typography key={index} type="body14" color="gray300">
              {index + 1}. 이것은 스크롤 테스트를 위한 긴 콘텐츠입니다. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </Typography>
          ))}
        </Flex>
      </BottomSheet.Content>

      <BottomSheet.Bottom>
        <Button variant="cta" onClick={() => close(true)}>
          확인
        </Button>
      </BottomSheet.Bottom>
    </BottomSheet>
  );
};

// 드래그 비활성화 BottomSheet 컴포넌트
type NoDragBottomSheetProps = {
  title: string;
} & BottomSheetComponentProps<boolean>;

const NoDragBottomSheet = ({ isOpen, close, title }: NoDragBottomSheetProps) => {
  return (
    <BottomSheet open={isOpen} onClose={() => close(false)} title={title} enableDragToClose={false}>
      <BottomSheet.Content>
        <Typography type="body16" color="white">
          이 BottomSheet는 드래그로 닫기가 비활성화되어 있습니다. 버튼으로만 닫을 수 있습니다.
        </Typography>
      </BottomSheet.Content>

      <BottomSheet.Bottom>
        <Button variant="primary" onClick={() => close(true)}>
          닫기
        </Button>
      </BottomSheet.Bottom>
    </BottomSheet>
  );
};

// X 버튼 없는 BottomSheet 컴포넌트
type NoCloseButtonBottomSheetProps = {
  title: string;
} & BottomSheetComponentProps<boolean>;

const NoCloseButtonBottomSheet = ({ isOpen, close, title }: NoCloseButtonBottomSheetProps) => {
  return (
    <BottomSheet open={isOpen} onClose={() => close(false)} title={title} showCloseButton={false}>
      <BottomSheet.Content>
        <Typography type="body16" color="white">
          이 BottomSheet는 X 닫기 버튼이 없습니다.
        </Typography>
        <Typography type="body14" color="gray400" style={{ marginTop: "8px" }}>
          드래그하거나 Dim 영역을 클릭하거나 아래 버튼으로 닫을 수 있습니다.
        </Typography>
      </BottomSheet.Content>

      <BottomSheet.Bottom>
        <Button fullWidth variant="primary" onClick={() => close(true)}>
          닫기
        </Button>
      </BottomSheet.Bottom>
    </BottomSheet>
  );
};

export default function TestBottomSheetPage() {
  const [result, setResult] = useState<string>("");

  const { show: showExample } = useBottomSheet(ExampleBottomSheet);
  const { show: showSimple } = useBottomSheet(SimpleBottomSheet);
  const { show: showLongContent } = useBottomSheet(LongContentBottomSheet);
  const { show: showNoDrag } = useBottomSheet(NoDragBottomSheet);
  const { show: showNoCloseButton } = useBottomSheet(NoCloseButtonBottomSheet);

  const handleExampleBottomSheet = async () => {
    const result = await showExample({
      title: "예시 BottomSheet",
    });

    setResult(`Example BottomSheet 결과: ${result}`);
  };

  const handleSimpleBottomSheet = async () => {
    const result = await showSimple({
      title: "간단한 BottomSheet",
    });

    setResult(`Simple BottomSheet 결과: ${result}`);
  };

  const handleLongContentBottomSheet = async () => {
    const result = await showLongContent({
      title: "긴 콘텐츠 BottomSheet",
    });

    setResult(`Long Content BottomSheet 결과: ${result}`);
  };

  const handleNoDragBottomSheet = async () => {
    const result = await showNoDrag({
      title: "드래그 비활성화 BottomSheet",
    });

    setResult(`No Drag BottomSheet 결과: ${result}`);
  };

  const handleNoCloseButtonBottomSheet = async () => {
    const result = await showNoCloseButton({
      title: "X 버튼 없는 BottomSheet",
    });

    setResult(`No Close Button BottomSheet 결과: ${result}`);
  };

  return (
    <div style={{ padding: "24px", minHeight: "100vh", backgroundColor: "#1a1a1a" }}>
      <Flex direction="column" gap={24} align="center">
        <Typography type="title24" color="white">
          BottomSheet 테스트 페이지
        </Typography>

        <Typography type="body16" color="gray400">
          다양한 BottomSheet를 테스트해보세요!
        </Typography>

        <Flex direction="column" gap={16} style={{ width: "100%", maxWidth: "400px" }}>
          <Button variant="primary" onClick={handleExampleBottomSheet}>
            예시 BottomSheet 열기
          </Button>

          <Button variant="secondary" onClick={handleSimpleBottomSheet}>
            간단한 BottomSheet 열기
          </Button>

          <Button variant="primary" onClick={handleLongContentBottomSheet}>
            긴 콘텐츠 BottomSheet 열기
          </Button>

          <Button variant="secondary" onClick={handleNoDragBottomSheet}>
            드래그 비활성화 BottomSheet 열기
          </Button>

          <Button variant="primary" onClick={handleNoCloseButtonBottomSheet}>
            X 버튼 없는 BottomSheet 열기
          </Button>
        </Flex>

        {result && (
          <div
            style={{
              padding: "16px",
              backgroundColor: "#2a2a2a",
              borderRadius: "8px",
              marginTop: "24px",
            }}
          >
            <Typography type="body14">{result}</Typography>
          </div>
        )}

        <div style={{ marginTop: "40px" }}>
          <Typography type="body14" color="gray500">
            💡 팁: 모바일에서는 BottomSheet를 아래로 드래그해서 닫을 수 있습니다!
          </Typography>
        </div>
      </Flex>
    </div>
  );
}
