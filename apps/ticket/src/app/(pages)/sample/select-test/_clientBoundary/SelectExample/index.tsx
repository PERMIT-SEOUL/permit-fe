"use client";

import { Flex, Select, Typography } from "@permit/design-system";
import { useSelect } from "@permit/design-system/hooks";

const ageOptions = [
  { value: "20", label: "20세" },
  { value: "21", label: "21세" },
  { value: "22", label: "22세" },
  { value: "23", label: "23세" },
  { value: "24", label: "24세" },
  { value: "25", label: "25세" },
];

const colorOptions = [
  { value: "red", label: "빨간색" },
  { value: "blue", label: "파란색" },
  { value: "green", label: "초록색" },
  { value: "yellow", label: "노란색" },
  { value: "purple", label: "보라색" },
];

export const SelectExample = () => {
  // useSelect 훅 사용 예시
  const ageSelect = useSelect({
    initialValue: "",
    validate: (value) => {
      if (!value) return "나이를 선택해주세요!!!";

      return undefined;
    },
    onChange: (value) => {
      console.log("나이 변경:", value);
    },
  });

  const dateSelect = useSelect({
    initialValue: "",
    validate: (value) => {
      if (!value) return "날짜를 선택해주세요.";

      return undefined;
    },
  });

  const colorSelect = useSelect({
    initialValue: "",
  });

  const disabledSelect = useSelect({
    initialValue: "",
  });

  const errorSelect = useSelect({
    initialValue: "",
    validate: (value) => {
      if (!value) return "필수 항목입니다.";

      return undefined;
    },
  });

  const handleValidateAge = () => {
    const isValid = ageSelect.validateValue();

    console.log("나이 유효성 검사:", isValid);
  };

  const handleResetAll = () => {
    ageSelect.reset();
    dateSelect.reset();
    colorSelect.reset();
  };

  return (
    <Flex direction="column" gap={32}>
      <div>
        <Typography type="title18" weight="bold" style={{ color: "white", marginBottom: "16px" }}>
          useSelect Hook - 나이 선택 (유효성 검사 포함)
        </Typography>
        <Select
          type="default"
          placeholder="나이를 선택해주세요"
          options={ageOptions}
          {...ageSelect.selectProps}
        />
        <Flex gap={8} style={{ marginTop: "8px" }}>
          <button
            onClick={handleValidateAge}
            style={{
              padding: "4px 8px",
              backgroundColor: "#262626",
              color: "white",
              border: "1px solid #525252",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            유효성 검사
          </button>
          <button
            onClick={() => ageSelect.reset()}
            style={{
              padding: "4px 8px",
              backgroundColor: "#262626",
              color: "white",
              border: "1px solid #525252",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            초기화
          </button>
        </Flex>
        {ageSelect.value && (
          <Typography type="body14" weight="regular" style={{ color: "#8A8A8A", marginTop: "8px" }}>
            선택된 나이: {ageSelect.value}세 | isDirty: {ageSelect.isDirty.toString()}
          </Typography>
        )}
      </div>

      <div>
        <Typography type="title18" weight="bold" style={{ color: "white", marginBottom: "16px" }}>
          useSelect Hook - 날짜 선택
        </Typography>
        <Select type="calendar" placeholder="날짜를 선택해주세요" {...dateSelect.selectProps} />
        {dateSelect.value && (
          <Typography type="body14" weight="regular" style={{ color: "#8A8A8A", marginTop: "8px" }}>
            선택된 날짜: {dateSelect.value}
          </Typography>
        )}
      </div>

      <div>
        <Typography type="title18" weight="bold" style={{ color: "white", marginBottom: "16px" }}>
          useSelect Hook - 색상 선택
        </Typography>
        <Select
          type="default"
          placeholder="색상을 선택해주세요"
          options={colorOptions}
          {...colorSelect.selectProps}
        />
        {colorSelect.value && (
          <Typography type="body14" weight="regular" style={{ color: "#8A8A8A", marginTop: "8px" }}>
            선택된 색상: {colorOptions.find((c) => c.value === colorSelect.value)?.label}
          </Typography>
        )}
      </div>

      <div>
        <Typography type="title18" weight="bold" style={{ color: "white", marginBottom: "16px" }}>
          Disabled Select
        </Typography>
        <Select
          type="default"
          placeholder="비활성화된 선택"
          options={ageOptions}
          {...disabledSelect.selectProps}
          disabled
        />
      </div>

      <div>
        <Typography type="title18" weight="bold" style={{ color: "white", marginBottom: "16px" }}>
          Error State Select (자동 유효성 검사)
        </Typography>
        <Select
          type="default"
          placeholder="에러 상태 선택"
          options={ageOptions}
          {...errorSelect.selectProps}
        />
        <button
          onClick={() => errorSelect.validateValue()}
          style={{
            padding: "4px 8px",
            backgroundColor: "#262626",
            color: "white",
            border: "1px solid #525252",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "8px",
          }}
        >
          유효성 검사 실행
        </button>
      </div>

      <div>
        <button
          onClick={handleResetAll}
          style={{
            padding: "8px 16px",
            backgroundColor: "#FF283E",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          모든 선택 초기화
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            console.log("=== 전체 유효성 검사 결과 ===");

            const ageValid = ageSelect.validateValue();
            const dateValid = dateSelect.validateValue();
            const colorValid = colorSelect.validateValue();
            const errorValid = errorSelect.validateValue();

            console.log("나이 선택:", {
              value: ageSelect.value,
              isValid: ageValid,
              error: ageSelect.error,
              isDirty: ageSelect.isDirty,
            });

            console.log("날짜 선택:", {
              value: dateSelect.value,
              isValid: dateValid,
              error: dateSelect.error,
              isDirty: dateSelect.isDirty,
            });

            console.log("색상 선택:", {
              value: colorSelect.value,
              isValid: colorValid,
              error: colorSelect.error,
              isDirty: colorSelect.isDirty,
            });

            console.log("에러 상태 선택:", {
              value: errorSelect.value,
              isValid: errorValid,
              error: errorSelect.error,
              isDirty: errorSelect.isDirty,
            });

            const allValid = ageValid && dateValid && colorValid && errorValid;

            console.log("전체 유효성 검사 통과:", allValid);

            if (allValid) {
              console.log("✅ 모든 필드가 유효합니다!");
            } else {
              console.log("❌ 일부 필드에 오류가 있습니다.");
            }

            console.log("=====================================");
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: "#10B981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          전체 유효성 검사 (콘솔 확인)
        </button>
      </div>
    </Flex>
  );
};
