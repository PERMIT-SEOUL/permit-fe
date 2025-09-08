import classNames from "classnames/bind";

import { Flex, Typography } from "@permit/design-system";
import { EventDetailResponse } from "@/data/events/getEventDetail/types";

import { InfoText } from "../InfoText";
import { LineupText } from "../LineupText";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = Omit<EventDetailResponse, "images">;

export const EventInfo = ({ venue, date, time, minAge, details, lineup }: Props) => {
  return (
    <div className={cx("wrap")}>
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
