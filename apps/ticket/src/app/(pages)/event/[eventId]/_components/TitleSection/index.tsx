import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button, Typography } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventName: string;
  eventId: string;
};

export const TitleSection = ({ eventName, eventId }: Props) => {
  const router = useRouter();

  const goToTimeTable = () => {
    router.push(`/event/${eventId}/time-table`);
  };

  return (
    <div className={cx("title_section")}>
      <Typography className={cx("title")} type="title20" color="white">
        {eventName}
      </Typography>
      <Button
        className={cx("time_table_button")}
        variant="secondary"
        size="sm"
        onClick={goToTimeTable}
      >
        TIME TABLE
      </Button>
    </div>
  );
};
