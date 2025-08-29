import classNames from "classnames/bind";

import { Block } from "../../_clientBoundary/TimeTableClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type TimeTableBlockProps = {
  block: Block & { style: React.CSSProperties };
  onClick?: (block: Block) => void;
};

const TimeTableBlock = ({ block, onClick }: TimeTableBlockProps) => {
  const handleClick = () => {
    onClick?.(block);
  };

  return (
    <div
      className={cx("block")}
      style={block.style}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {block.blockName}
    </div>
  );
};

export default TimeTableBlock;
