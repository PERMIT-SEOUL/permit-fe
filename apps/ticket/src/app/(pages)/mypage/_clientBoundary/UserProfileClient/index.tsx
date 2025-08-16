import { useState } from "react";
import classNames from "classnames/bind";

import { Button, Flex, Select, TextField, Typography } from "@permit/design-system";
import { useSelect, useTextField } from "@permit/design-system/hooks";
import { useUserInfoSuspenseQuery } from "@/data/users/getUserInfo/queries";
import { usePatchUserInfoMutation } from "@/data/users/patchUserInfo/mutation";
import { useUserEmailCheckMutation } from "@/data/users/postUserEmailCheck/mutation";
import { isAxiosErrorResponse } from "@/shared/types/axioxError";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

// 성별 옵션
const GENDER_OPTIONS = [
  { value: "MALE", label: "남성" },
  { value: "FEMALE", label: "여성" },
];

/**
 * 사용자 프로필 섹션
 */
export const UserProfileClient = () => {
  const { data: userInfoData } = useUserInfoSuspenseQuery();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({
    userName: userInfoData.name,
    age: userInfoData.age,
    gender: userInfoData.gender,
    email: userInfoData.email,
  });

  const [emailVerified, setEmailVerified] = useState(false);

  const { mutateAsync: mutateEmailCheck, isPending: isEmailCheckPending } =
    useUserEmailCheckMutation();

  const { mutateAsync: mutatePatchUserInfo, isPending } = usePatchUserInfoMutation();

  const nameField = useTextField({
    initialValue: userInfoData.name,
    validate: (value: string) => {
      if (!value.trim()) return "이름을 입력해주세요.";

      return undefined;
    },
    onChange: (value) => {
      setEditData((prev) => ({
        ...prev,
        userName: value,
      }));
    },
  });

  const genderField = useSelect({
    initialValue: userInfoData.gender,
    validate: (value: string) => {
      if (!value) return "성별을 선택해주세요.";

      return undefined;
    },
    onChange: (value) => {
      setEditData((prev) => ({
        ...prev,
        gender: value,
      }));
    },
  });

  const emailField = useTextField({
    initialValue: userInfoData.email,
    validate: (value: string) => {
      if (!value.trim()) return "이메일을 입력해주세요.";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) return "올바른 이메일 형식이 아닙니다.";

      return undefined;
    },
    onChange: (value) => {
      setEditData((prev) => ({
        ...prev,
        email: value,
      }));
    },
  });

  const handleEditClick = () => {
    setIsEditMode(true);
  };

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

  const handleSave = async () => {
    if (!emailVerified) {
      alert("이메일 확인을 먼저 해주세요.");

      return;
    }

    try {
      await mutatePatchUserInfo({
        name: editData.userName,
        gender: editData.gender,
        email: editData.email,
      });

      setIsEditMode(false);
      alert("프로필 수정이 완료되었습니다.");
      // TODO: 프로필 수정 후 프로필 페이지 업데이트 (쿼리 무효화)
    } catch (error) {
      if (isAxiosErrorResponse(error)) {
        alert(error.message);
      }
    }
  };

  const handleFieldChange = (field: keyof typeof editData, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className={cx("container")}>
      <Flex gap={8} justify="space-between" className={cx("header")}>
        {isEditMode ? (
          <TextField
            placeholder="이름을 입력해주세요"
            fullWidth
            value={nameField.value}
            onChange={nameField.handleChange}
            error={nameField.error}
          />
        ) : (
          <Typography type="title20" weight="bold" color="white">
            {editData.userName}
          </Typography>
        )}

        {!isEditMode && (
          <>
            <button
              className={cx("mobile_edit_button")}
              onClick={handleEditClick}
              aria-label="Edit"
            >
              <EditIcon />
            </button>
            <Button type="button" className={cx("pc_edit_button")} onClick={handleEditClick}>
              Edit Profile
            </Button>
          </>
        )}

        {isEditMode && (
          <Flex gap={8}>
            <Button variant="cta" onClick={handleSave} isLoading={isPending} disabled={isPending}>
              save
            </Button>
          </Flex>
        )}
      </Flex>

      <Flex direction="column" gap={16}>
        <Flex gap={40} align="center">
          <Typography className={cx("label")} type="body14" color="gray400">
            Age
          </Typography>
          <TextField readOnly fullWidth value={`${editData.age}세`} />
        </Flex>

        <Flex gap={40} align="center">
          <Typography className={cx("label")} type="body14" color="gray400">
            Gender
          </Typography>
          {isEditMode ? (
            <Select
              options={GENDER_OPTIONS}
              placeholder="성별을 선택해주세요"
              {...genderField.selectProps}
            />
          ) : (
            <TextField
              readOnly
              fullWidth
              value={
                GENDER_OPTIONS.find((option) => option.value === editData.gender)?.label ||
                editData.gender
              }
            />
          )}
        </Flex>

        <Flex gap={40} align="center">
          <Typography className={cx("label")} type="body14" color="gray400">
            EMAIL
          </Typography>
          {isEditMode ? (
            <Flex gap={8}>
              <TextField
                placeholder="이메일을 입력해주세요"
                fullWidth
                value={emailField.value}
                onChange={emailField.handleChange}
                error={emailField.error}
                disabled={emailVerified}
              />
              <Button
                type="button"
                variant="primary"
                onClick={handleEmailCheck}
                isLoading={isEmailCheckPending}
                disabled={emailVerified || isEmailCheckPending}
              >
                Check
              </Button>
            </Flex>
          ) : (
            <TextField readOnly fullWidth value={editData.email} />
          )}
        </Flex>
      </Flex>

      <Flex className={cx("bottom_actions")} direction="column" gap={20}>
        <button>
          <Typography type="body14" color="white">
            Logout
          </Typography>
        </button>
        <button>
          <Typography type="body14" color="white">
            Delete Account
          </Typography>
        </button>
      </Flex>
    </div>
  );
};

// 편집 아이콘 SVG
const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.7583 3.36875C15.0833 3.04375 15.0833 2.50208 14.7583 2.19375L12.8083 0.24375C12.5 -0.08125 11.9583 -0.08125 11.6333 0.24375L10.1 1.76875L13.225 4.89375M0 11.8771V15.0021H3.125L12.3417 5.77708L9.21667 2.65208L0 11.8771Z"
      fill="#A3A3A3"
    />
  </svg>
);
