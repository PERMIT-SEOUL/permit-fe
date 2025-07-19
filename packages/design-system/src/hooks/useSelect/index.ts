import { useCallback, useState } from "react";

export type UseSelectProps = {
  /**
   * 초기값
   */
  initialValue?: string;
  /**
   * 유효성 검사 함수
   * @returns 노출될 에러 메시지
   */
  validate?: (value: string) => string | undefined;
  /**
   * 값이 변경될 때 호출되는 콜백
   */
  onChange?: (value: string) => void;
  /**
   * 에러가 있을 때 값이 변경될 때마다 유효성 검사를 수행할지 여부
   * @default true
   */
  validateOnChangeIfError?: boolean;
};

export type UseSelectReturn = {
  /**
   * 현재 선택된 값
   */
  value: string;
  /**
   * 에러 메시지
   */
  error?: string;
  /**
   * 값이 변경되었는지 여부
   */
  isDirty: boolean;
  /**
   * 값 변경 핸들러
   */
  handleChange: (value: string) => void;
  /**
   * 값 초기화
   */
  reset: () => void;
  /**
   * 수동으로 유효성 검사 실행
   */
  validateValue: () => boolean;
  /**
   * 에러 메시지 설정
   */
  setError: (error?: string) => void;
  /**
   * 값 직접 설정
   */
  setValue: (value: string) => void;
  /**
   * Select 컴포넌트에 전달할 props
   */
  selectProps: {
    value: string;
    onChange: (value: string) => void;
    error?: string;
  };
};

/**
 * Select 컴포넌트를 위한 상태 관리 훅
 * @param props - 훅 설정
 * @returns 셀렉트 상태와 핸들러
 */
export const useSelect = ({
  initialValue = "",
  validate,
  onChange,
  validateOnChangeIfError = true,
}: UseSelectProps = {}): UseSelectReturn => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>();
  const [isDirty, setIsDirty] = useState(false);

  const validateValue = useCallback(
    (newValue?: string) => {
      if (!validate) return true;

      const validationError = validate(newValue ?? value);

      setError(validationError);

      return !validationError;
    },
    [validate, value],
  );

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      setIsDirty(true);
      onChange?.(newValue);

      // 에러가 있고 validateOnChangeIfError가 true인 경우 유효성 검사 수행
      if (error && validateOnChangeIfError) {
        validateValue(newValue);
      }
    },
    [error, onChange, validateOnChangeIfError, validateValue],
  );

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(undefined);
    setIsDirty(false);
  }, [initialValue]);

  const selectProps = {
    value,
    onChange: handleChange,
    error,
  };

  return {
    value,
    error,
    isDirty,
    handleChange,
    reset,
    validateValue,
    setError,
    setValue,
    selectProps,
  };
};
