import Link from "next/link";
import classNames from "classnames/bind";

import { Button, Typography } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventName: string;
  eventId: string;
};

export const TitleSection = ({ eventName, eventId }: Props) => {
  return (
    <div className={cx("title_section")}>
      <Typography className={cx("title")} type="title20" color="white">
        {eventName}
      </Typography>

      <Button asChild className={cx("time_table_button")} variant="secondary" size="sm">
        <Link href={`/event/${eventId}/time-table`}>TIME TABLE</Link>
      </Button>
    </div>
  );
};
