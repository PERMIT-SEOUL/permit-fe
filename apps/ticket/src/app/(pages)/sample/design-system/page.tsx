"use client";

import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

import { Button, Code, Flex } from "@permit/design-system";

export default function DesignSystemPage() {
  return (
    <div>
      <h1>🚀 Streaming SSR Example</h1>

      <div className={cx("wrap")}>
        <Code className={cx("code")}>test 1</Code>
        <Code className={cx("code")}>test 2</Code>
        <Code className={cx("code")}>test 3</Code>
      </div>

      {/* 가로 방향 정렬 */}
      <Flex gap={8} align="center">
        <Button>버튼 1</Button>
        <Button>버튼 2</Button>
        <Button>버튼 3</Button>
      </Flex>

      {/* 세로 방향 정렬 */}
      <Flex direction="column" gap={8}>
        <Button>버튼 1</Button>
        <Button>버튼 2</Button>
        <Button>버튼 3</Button>
      </Flex>

      {/* 가운데 정렬 */}
      <Flex justify="center" gap={8}>
        <Button>버튼 1</Button>
        <Button>버튼 2</Button>
        <Button>버튼 3</Button>
      </Flex>

      {/* Space Between */}
      <Flex justify="space-between" align="center">
        <Button>버튼 1</Button>
        <Button>버튼 2</Button>
        <Button>버튼 3</Button>
      </Flex>
    </div>
  );
}
