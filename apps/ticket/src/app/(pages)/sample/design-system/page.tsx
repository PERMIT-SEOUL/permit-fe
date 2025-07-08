"use client";

import classNames from "classnames/bind";

import { Button, Flex, Icon, TextField, Typography } from "@permit/design-system";
import { useTextField } from "@permit/design-system/hooks";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export default function DesignSystemPage() {
  const {
    value: email,
    handleChange: handleEmailChange,
    error: emailError,
    validateValue: validateEmail,
  } = useTextField({
    validate: (value: string) => {
      if (!value) return "이메일을 입력해주세요.";

      if (!value.includes("@")) return "올바른 이메일 형식이 아닙니다.";

      return undefined;
    },
  });

  const {
    value: password,
    handleChange: handlePasswordChange,
    error: passwordError,
    validateValue: validatePassword,
  } = useTextField({
    validate: (value: string) => {
      if (!value) return "비밀번호를 입력해주세요.";

      if (value.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
    },
  });

  const handleSubmit = () => {
    // 모든 필드 유효성 검사 실행
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      console.log("제출 성공!", {
        email,
        password,
      });
    }
  };

  return (
    <div>
      <Typography type="title24" color="gray800">
        🚀 Design-system Example
      </Typography>
      <div className={cx("wrap")}>
        <Flex gap={8}>
          <Button>버튼 1</Button>
          <Button>버튼 2</Button>
          <Button>버튼 3</Button>
        </Flex>
      </div>

      <div className={cx("wrap_bg")}>
        <Flex gap={8} align="center">
          <Button size="sm" variant="cta">
            버튼입니다람쥐
          </Button>

          <Button size="md" variant="cta">
            버튼입니다람쥐
          </Button>
        </Flex>
        <Button variant="error" fullWidth>
          경고 버튼
        </Button>
        <Button variant="secondary" disabled>
          비활성화 버튼
        </Button>

        <Button size="header">SHOP</Button>
      </div>

      <div className={cx("wrap_bg")}>
        <Icon.Calendar fill="gray800" />
        <Icon.Calendar fill="white" size={40} />
        <Icon.Calendar fill="red100" size={60} />
        <Icon.Calendar fill="gray200" size={80} />

        <Flex direction="column" gap={16}>
          <TextField
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
          />
          <TextField
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
          />
          <Button onClick={handleSubmit}>제출</Button>
        </Flex>
      </div>
    </div>
  );
}
