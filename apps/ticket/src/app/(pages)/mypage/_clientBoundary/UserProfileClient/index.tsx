import { useState } from "react";
import classNames from "classnames/bind";

import { Button, Flex, Select, TextField, Typography } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

// 나이 옵션 (18-100세)
const AGE_OPTIONS = Array.from({ length: 83 }, (_, i) => ({
  value: String(i + 18),
  label: `${i + 18}세`,
}));

// 성별 옵션
const GENDER_OPTIONS = [
  { value: "MALE", label: "남성" },
  { value: "FEMALE", label: "여성" },
  { value: "OTHER", label: "기타" },
];

/**
 * 사용자 프로필 섹션
 */
export const UserProfileClient = () => {
  // TODO: API 호출
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({
    userName: "User name",
    age: "20",
    gender: "MALE",
    email: "test@test.com",
  });

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    // TODO: API 호출로 데이터 저장
    console.log("저장할 데이터:", editData);
    setIsEditMode(false);
  };

  const handleFieldChange = (field: keyof typeof editData, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className={cx("container")}>
      <Flex gap={8} justify="space-between" align="center" className={cx("header")}>
        <Typography type="title20" weight="bold" color="white">
          {editData.userName}
        </Typography>

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
            <Button variant="cta" onClick={handleSave}>
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
          {isEditMode ? (
            <Select
              options={AGE_OPTIONS}
              value={editData.age}
              onChange={(value) => handleFieldChange("age", value)}
              placeholder="나이를 선택해주세요"
            />
          ) : (
            <TextField readOnly fullWidth value={`${editData.age}세`} />
          )}
        </Flex>

        <Flex gap={40} align="center">
          <Typography className={cx("label")} type="body14" color="gray400">
            Gender
          </Typography>
          {isEditMode ? (
            <Select
              options={GENDER_OPTIONS}
              value={editData.gender}
              onChange={(value) => handleFieldChange("gender", value)}
              placeholder="성별을 선택해주세요"
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
            // TODO: 이메일 검증 버튼 추가
            <TextField
              fullWidth
              value={editData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              placeholder="이메일을 입력해주세요"
              type="email"
            />
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
