import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";

import { Area } from "../../_clientBoundary/TimeTableClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type AreaHeadersProps = {
  areas: Area[];
  columnWidth: number;
};

const AreaHeaders = ({ areas, columnWidth }: AreaHeadersProps) => {
  return (
    <div className={cx("area_headers")}>
      {areas.map((area) => (
        <Typography
          key={area.areaId}
          className={cx("area_header")}
          type="body14"
          style={{ width: columnWidth }}
        >
          <span className={cx("area_header_text")}>{area.areaName}</span>
        </Typography>
      ))}
    </div>
  );
};

export default AreaHeaders;
