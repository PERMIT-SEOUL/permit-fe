import classNames from "classnames/bind";

import { Button, Typography } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventName: string;
};

export const TitleSection = ({ eventName }: Props) => {
  return (
    <div className={cx("title_section")}>
      <Typography className={cx("title")} type="title20" color="white">
        {eventName}
      </Typography>
      <Button className={cx("time_table_button")} variant="secondary" size="sm">
        {/* TODO: 티켓 테이블 버튼 추가 */}
        TIME TABLE
      </Button>
    </div>
  );
};
