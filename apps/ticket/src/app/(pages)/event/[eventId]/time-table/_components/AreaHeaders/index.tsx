import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";
import { Stages } from "@/data/events/getTimetables/types";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type AreaHeadersProps = {
  stages: Stages[];
  columnWidth: number;
};

const AreaHeaders = ({ stages, columnWidth }: AreaHeadersProps) => {
  return (
    <div className={cx("area_headers")}>
      {stages.map((stage) => (
        <Typography
          key={stage.stageNotionId}
          className={cx("area_header")}
          type="body14"
          style={{ width: columnWidth }}
        >
          <span className={cx("area_header_text")}>{stage.stageName}</span>
        </Typography>
      ))}
    </div>
  );
};

export default AreaHeaders;
