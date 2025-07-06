"use client";

import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

import { Button, Flex } from "@permit/design-system";

export default function DesignSystemPage() {
  return (
    <div>
      <h1>🚀 Streaming SSR Example</h1>
      <div className={cx("wrap")}>
        <Flex gap={8}>
          <Button>버튼 1</Button>
          <Button>버튼 2</Button>
          <Button>버튼 3</Button>
        </Flex>
      </div>

      <div className={cx("wrap_2")}>
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
      </div>
    </div>
  );
}
