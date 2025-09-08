"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button, Flex, Select, TextField, Typography } from "@permit/design-system";
import { useSelect, useTextField } from "@permit/design-system/hooks";
import { useUserEmailCheckMutation } from "@/data/users/postUserEmailCheck/mutation";
import { useSignupMutation } from "@/data/users/postUserSignup/mutation";
import { safeLocalStorage } from "@/lib/storage";
import { PATH } from "@/shared/constants/path";
import { IS_LOGINED, SOCIAL_LOGIN_TYPE_KEY, TOKEN_KEY } from "@/shared/constants/storage";
import { SocialLoginType } from "@/shared/hooks/useOAuth/types";
import { isAxiosErrorResponse } from "@/shared/types/axioxError";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const ageOptions = Array.from({ length: 80 }, (_, i) => ({
  value: String(i + 10),
  label: `${i + 10}세`,
}));

const genderOptions = [
  { value: "MALE", label: "남성" },
  { value: "FEMALE", label: "여성" },
];

/**
 * 회원가입 페이지
 */
const SignupPage = () => {
  const router = useRouter();

  const token = safeLocalStorage.get(TOKEN_KEY);
  const socialType = safeLocalStorage.get(SOCIAL_LOGIN_TYPE_KEY) as SocialLoginType;

  const [emailVerified, setEmailVerified] = useState(false);

  const { mutateAsync: mutateEmailCheck } = useUserEmailCheckMutation();

  const { mutateAsync: mutateSignup, isPending } = useSignupMutation();

  // 필드별 상태 관리 훅 사용
  const nameField = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value.trim()) return "이름을 입력해주세요.";

      return undefined;
    },
  });

  const ageField = useSelect({
    initialValue: "",
    validate: (value: string) => {
      if (!value) return "나이를 선택해주세요.";

      return undefined;
    },
  });

  const genderField = useSelect({
    initialValue: "",
    validate: (value: string) => {
      if (!value) return "성별을 선택해주세요.";

      return undefined;
    },
  });

  const emailField = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value.trim()) return "이메일을 입력해주세요.";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) return "올바른 이메일 형식이 아닙니다.";

      return undefined;
    },
  });

  const handleEmailCheck = async () => {
    if (!emailField.validateValue()) {
      return;
    }

    try {
      await mutateEmailCheck({ userEmail: emailField.value });

      setEmailVerified(true);
      alert("이메일 확인이 완료되었습니다.");
    } catch (error) {
      if (isAxiosErrorResponse(error)) {
        alert(error.message);
      }
    }
  };

  const handleSignup = async () => {
    if (!emailVerified) {
      alert("이메일 확인을 먼저 해주세요.");

      return;
    }

    // 모든 필드 유효성 검사
    const isNameValid = nameField.validateValue();
    const isAgeValid = ageField.validateValue();
    const isGenderValid = genderField.validateValue();
    const isEmailValid = emailField.validateValue();

    if (!isNameValid || !isAgeValid || !isGenderValid || !isEmailValid) {
      return;
    }

    const submitData = {
      userName: nameField.value,
      userAge: Number(ageField.value),
      userGender: genderField.value as "MALE" | "FEMALE",
      userEmail: emailField.value,
      socialType: socialType,
      socialAccessToken: token || "",
    };

    try {
      await mutateSignup(submitData);

      // signup API 요청에 필요한 정보 제거
      safeLocalStorage.remove(TOKEN_KEY);
      safeLocalStorage.remove(SOCIAL_LOGIN_TYPE_KEY);

      // TODO: 추후 변경
      safeLocalStorage.set(IS_LOGINED, "true");

      // TODO: redirect 로직 구체적으로 추가
      router.replace(PATH.HOME);
    } catch (error) {
      if (isAxiosErrorResponse(error)) {
        alert(error.message);
      }
    }
  };

  return (
    <div className={cx("container")}>
      <form className={cx("form")}>
        <Flex direction="column" gap={20} className={cx("form_fields")}>
          {/* 이름 */}
          <div className={cx("field_row")}>
            <div className={cx("label_container")}>
              <Flex align="flex-start" gap={8}>
                <Typography type="body14" weight="regular" color="white">
                  NAME
                </Typography>
                <div className={cx("required")}>*</div>
              </Flex>
            </div>
            <TextField
              fullWidth
              placeholder="이름을 입력해주세요"
              value={nameField.value}
              onChange={nameField.handleChange}
              error={nameField.error}
            />
          </div>

          {/* 나이 */}
          <div className={cx("field_row")}>
            <div className={cx("label_container")}>
              <Flex align="flex-start" gap={6}>
                <Typography type="body14" weight="regular" color="white">
                  AGE
                </Typography>
                <div className={cx("required")}>*</div>
              </Flex>
            </div>
            <Select
              placeholder="나이를 선택해주세요"
              options={ageOptions}
              {...ageField.selectProps}
            />
          </div>

          {/* 성별 */}
          <div className={cx("field_row")}>
            <div className={cx("label_container")}>
              <Flex align="flex-start" gap={8}>
                <Typography type="body14" weight="regular" color="white">
                  Gender
                </Typography>
                <div className={cx("required")}>*</div>
              </Flex>
            </div>
            <Select
              placeholder="성별을 선택해주세요"
              options={genderOptions}
              {...genderField.selectProps}
            />
          </div>

          {/* 이메일 */}
          <div className={cx("field_row")}>
            <div className={cx("label_container")}>
              <Flex align="flex-start" gap={5}>
                <Typography type="body14" weight="regular" color="white">
                  EMAIL
                </Typography>
                <div className={cx("required")}>*</div>
              </Flex>
            </div>
            <div className={cx("email_container")}>
              <TextField
                fullWidth
                placeholder="이메일을 입력해주세요"
                value={emailField.value}
                onChange={emailField.handleChange}
                error={emailField.error}
                disabled={emailVerified}
              />
              <Button
                type="button"
                variant="primary"
                onClick={handleEmailCheck}
                disabled={emailVerified}
              >
                Check
              </Button>
            </div>
          </div>
        </Flex>

        <Button
          type="button"
          variant="primary"
          isLoading={isPending}
          useClickDebounce
          onClick={handleSignup}
        >
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
