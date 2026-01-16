"use client";

import classNames from "classnames/bind";

import { Button, Flex, TextField, Typography } from "@permit/design-system";
import { useModal } from "@/shared/hooks/useModal";

import { ChangeRoleModal } from "../ChangeRoleModal";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const UserManagementClient = () => {
  const { show } = useModal(ChangeRoleModal);

  const searchUser = () => {
    alert("hi");
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
          <TextField className={cx("input")} placeholder="이메일을 입력해주세요" />
          <Button variant="cta" onClick={searchUser}>
            Search
          </Button>
        </Flex>

        <div className={cx("serach_area")}>
          <Flex justify="space-between">
            <Flex direction="column">
              <Typography type="title20">userName: hi</Typography>
              <Typography type="title20">current Role: USER</Typography>
            </Flex>
            <Button variant="primary" onClick={show}>
              Change Role
            </Button>
          </Flex>
        </div>
      </main>
    </div>
  );
};
