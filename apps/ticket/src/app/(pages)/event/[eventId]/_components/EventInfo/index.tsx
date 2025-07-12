import classNames from "classnames/bind";

import { Button, Flex, Typography } from "@permit/design-system";

import { InfoText } from "../InfoText";
import { LineupText } from "../LineupText";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface Props {
  eventName: string;
  venue: string;
  date: string;
  time: string;
  minAge: number;
  details: string;
  lineup: {
    category: string;
    artists: { name: string }[];
  }[];
}

export const EventInfo = ({ eventName, venue, date, time, minAge, details, lineup }: Props) => {
  return (
    <>
      <div className={cx("wrap")}>
        <Typography className={cx("title")} type="title20" color="white">
          {eventName}
        </Typography>
        <Button className={cx("time_table_button")} variant="secondary" size="sm">
          TIME TABLE
        </Button>

        <div className={cx("info_section")}>
          <div className={cx("info_group")}>
            <InfoText title="Venue" value={venue} />

            <Flex direction="column" gap={4}>
              <InfoText title="Date" value={date} />
              <InfoText title="Time" value={time} />
            </Flex>
            <InfoText title="Min. age" value={minAge.toString()} />
          </div>

          <div>
            <Typography type="body14" color="gray400">
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
    </>
  );
};
