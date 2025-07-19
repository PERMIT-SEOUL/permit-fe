"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button, Flex, Select, TextField, Typography } from "@permit/design-system";
import { useSignupMutation } from "@/data/users/postUserSignup/mutation";
import { safeLocalStorage } from "@/lib/storage";
import { PATH } from "@/shared/constants/path";
import { SOCIAL_LOGIN_TYPE_KEY, TOKEN_KEY } from "@/shared/constants/storage";
import { SocialLoginType } from "@/shared/hooks/useOAuth/types";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

/**
 * 회원가입 페이지
 */
const SignupPage = () => {
  const router = useRouter();

  const token = safeLocalStorage.get(TOKEN_KEY);
  const socialType = safeLocalStorage.get(SOCIAL_LOGIN_TYPE_KEY) as SocialLoginType;

  const [formData, setFormData] = useState({
    userName: "",
    userAge: 0,
    userGender: "MALE" as "MALE" | "FEMALE",
    userEmail: "",
    socialType: socialType,
    socialAccessToken: token || "",
  });

  const [emailVerified, setEmailVerified] = useState(false);

  const { mutateAsync, isPending } = useSignupMutation();

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEmailCheck = () => {
    // TODO: 이메일 중복 확인 API 연동
    setEmailVerified(true);
    alert("이메일 확인이 완료되었습니다.");
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    if (!emailVerified) {
      alert("이메일 확인을 먼저 해주세요.");

      return;
    }

    const submitData = {
      ...formData,
      userAge: formData.userAge,
    };

    try {
      await mutateAsync(submitData);

      // signup API 요청에 필요한 정보 제거
      safeLocalStorage.remove(TOKEN_KEY);
      safeLocalStorage.remove(SOCIAL_LOGIN_TYPE_KEY);

      // TODO: redirect 로직 구체적으로 추가
      router.replace(PATH.HOME);
    } catch (error) {
      alert("회원가입에 실패했습니다.");
      console.error("회원가입 실패:", error);
    }
  };

  const ageOptions = Array.from({ length: 80 }, (_, i) => ({
    value: String(i + 10),
    label: `${i + 10}세`,
  }));

  const genderOptions = [
    { value: "MALE", label: "남성" },
    { value: "FEMALE", label: "여성" },
  ];

  return (
    <div className={cx("container")}>
      <form onSubmit={handleSignup} className={cx("form")}>
        <Flex direction="column" gap={20} className={cx("formFields")}>
          {/* 이름 */}
          <div className={cx("fieldRow")}>
            <div className={cx("labelContainer")}>
              <Flex align="flex-start" gap={8}>
                <Typography type="body14" weight="regular" color="white">
                  NAME
                </Typography>
                <div className={cx("required")}>*</div>
              </Flex>
            </div>
            <TextField
              placeholder="이름을 입력해주세요"
              value={formData.userName}
              onChange={(value) => handleChange("userName", value)}
            />
          </div>

          {/* 나이 */}
          <div className={cx("fieldRow")}>
            <div className={cx("labelContainer")}>
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
              value={String(formData.userAge)}
              onChange={(value) => handleChange("userAge", Number(value))}
            />
          </div>

          {/* 성별 */}
          <div className={cx("fieldRow")}>
            <div className={cx("labelContainer")}>
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
              value={formData.userGender}
              onChange={(value) => handleChange("userGender", value)}
            />
          </div>

          {/* 이메일 */}
          <div className={cx("fieldRow")}>
            <div className={cx("labelContainer")}>
              <Flex align="flex-start" gap={5}>
                <Typography type="body14" weight="regular" color="white">
                  EMAIL
                </Typography>
                <div className={cx("required")}>*</div>
              </Flex>
            </div>
            <div className={cx("emailContainer")}>
              <TextField
                placeholder="이메일을 입력해주세요"
                value={formData.userEmail}
                onChange={(value) => handleChange("userEmail", value)}
              />
              <Button variant="secondary" onClick={handleEmailCheck}>
                Check
              </Button>
            </div>
          </div>
        </Flex>

        <Button type="submit" variant="secondary" disabled={isPending}>
          {isPending ? "처리중..." : "Create Account"}
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
