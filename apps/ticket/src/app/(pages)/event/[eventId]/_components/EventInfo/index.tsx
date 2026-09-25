import classNames from "classnames/bind";

import { Flex, Typography } from "@permit/design-system";
import { EventDetailResponse } from "@/data/events/getEventDetail/types";

import { InfoText } from "../InfoText";
import { LineupText } from "../LineupText";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = Omit<EventDetailResponse, "images">;

// URL 시작: http(s):// 또는 www. / 끝: 공백·한글에서 멈추고, 끝에 붙은 문장부호는 링크에서 제외
const URL_REGEX = /((?:https?:\/\/|www\.)[^\s가-힣]*[^\s가-힣.,!?)\]'"])/g;

const linkify = (text: string) =>
  text.split(URL_REGEX).map((part, i) =>
    i % 2 === 1 ? (
      <a
        key={i}
        href={part.startsWith("www.") ? `https://${part}` : part}
        target="_blank"
        rel="noopener noreferrer"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );

export const EventInfo = ({ venue, date, time, minAge, details, lineup }: Props) => {
  return (
    <div className={cx("wrap")}>
      <div className={cx("info_section")}>
        <div className={cx("info_group")}>
          <InfoText title="Venue" value={venue === "" ? "TBD" : venue} />

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
            {linkify(details)}
          </Typography>
        </div>
      </div>
    </div>
  );
};
