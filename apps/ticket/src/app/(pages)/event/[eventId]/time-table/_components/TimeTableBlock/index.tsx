import React from "react";
import classNames from "classnames/bind";

import { Block } from "../../_clientBoundary/TimeTableClient";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface TimeTableBlockProps {
  block: Block & { style: React.CSSProperties };
}

export default function TimeTableBlock({ block }: TimeTableBlockProps) {
  return (
    <div className={cx("block")} style={block.style}>
      {block.blockName}
    </div>
  );
}
