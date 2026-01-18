"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { Button, Flex, TextField, Typography } from "@permit/design-system";
import { useTextField } from "@permit/design-system/hooks";
import { userOptions } from "@/data/admin/getUser/queries";
import { UserResponse } from "@/data/admin/getUser/types";
import { useModal } from "@/shared/hooks/useModal";
import { isAxiosErrorResponse } from "@/shared/types/axioxError";

import { ChangeRoleModal } from "../ChangeRoleModal";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const UserManagementClient = () => {
  const qc = useQueryClient();
  const { show: changeUserRoleModal } = useModal(ChangeRoleModal);

  const [userInfo, setUserInfo] = useState<UserResponse | null>(null);

  const userEmail = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value.trim()) return "유저 이메일을 입력해주세요.";

      return undefined;
    },
  });

  const searchUser = async () => {
    const userEmailValid = userEmail.validateValue();

    if (!userEmailValid) {
      return;
    }

    try {
      const userInfoData = await qc.fetchQuery(userOptions({ email: userEmail.value }));

      setUserInfo(userInfoData);
    } catch (error) {
      if (isAxiosErrorResponse(error)) {
        setUserInfo(null);

        alert(error.response?.data.message || "유저를 찾을 수 없습니다.");
      }
    }
  };

  return (
    <div className={cx("container")}>
      <header className={cx("header")}>
        <Typography type="title32">User Management</Typography>
        <Typography type="body14" color="gray300">
          * 권한을 바꾼 후 적용하려면 로그인을 다시 해주세요.
        </Typography>
      </header>
      <main>
        <Flex gap={20}>
          <TextField
            className={cx("input")}
            placeholder="이메일을 입력해주세요"
            value={userEmail.value}
            onChange={userEmail.handleChange}
            error={userEmail.error}
          />
          <Button variant="cta" onClick={searchUser}>
            Search
          </Button>
        </Flex>

        {userInfo && (
          <div className={cx("serach_area")}>
            <Flex justify="space-between">
              <Flex direction="column">
                <Typography type="title20">userName: {userInfo.userName}</Typography>
                <Typography type="title20">current Role: {userInfo.currentUserRole}</Typography>
              </Flex>
              <Button
                variant="primary"
                onClick={() => changeUserRoleModal({ userId: userInfo.userId })}
              >
                Change Role
              </Button>
            </Flex>
          </div>
        )}
      </main>
    </div>
  );
};
