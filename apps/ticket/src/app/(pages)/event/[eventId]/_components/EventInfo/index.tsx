import classNames from "classnames/bind";

import { Button, Flex, Typography } from "@permit/design-system";
import { EventDetailResponse } from "@/data/events/getEventDetail/types";

import { InfoText } from "../InfoText";
import { LineupText } from "../LineupText";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  showOnlyTitle?: boolean;
} & Omit<EventDetailResponse, "images">;

export const EventInfo = ({
  eventName,
  venue,
  date,
  time,
  minAge,
  details,
  lineup,
  showOnlyTitle = false,
}: Props) => {
  if (showOnlyTitle) {
    return (
      <div className={cx("title_section")}>
        <Typography className={cx("title")} type="title20" color="white">
          {eventName}
        </Typography>
        <Button className={cx("time_table_button")} variant="secondary" size="sm">
          TIME TABLE
        </Button>
      </div>
    );
  }

  return (
    <div className={cx("wrap")}>
      <div className={cx("title_section", { is_show: !showOnlyTitle })}>
        <Typography className={cx("title")} type="title20" color="white">
          {eventName}
        </Typography>
        <Button className={cx("time_table_button")} variant="secondary" size="sm">
          TIME TABLE
        </Button>
      </div>

      <div className={cx("info_section")}>
        <div className={cx("info_group")}>
          <InfoText title="Venue" value={venue} />

          <Flex direction="column" gap={8}>
            <InfoText title="Date" value={date} />
            <InfoText title="Time" value={time} />
          </Flex>

          <InfoText title="Min. age" value={`${minAge}+`} />
        </div>

        <div className={cx("lineup_section")}>
          <Typography className={cx("lineup_title")} type="body14" color="gray400">
            Lineup
          </Typography>
          <div className={cx("lineup_grid")}>
            <LineupText lineup={lineup} />
          </div>
        </div>

        <div className={cx("description")}>
          <Typography type="body14" color="white">
            {details}
          </Typography>
        </div>
      </div>
    </div>
  );
};
