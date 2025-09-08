"use client";

import Link from "next/link";
import classNames from "classnames/bind";

import { Button, Typography } from "@permit/design-system";

import styles from "./page.module.scss";

const cx = classNames.bind(styles);

type Event = {
  eventId: number;
  eventName: string;
  eventVenue: string | null;
  eventDate: string;
  soldTicketCount: number;
};

type EventGroup = {
  eventYearMonth: string;
  events: Event[];
};

export default function EventsPage() {
  const totalEventNumber = mockData.reduce((acc, group) => acc + group.events.length, 0);

  return (
    <div className={cx("container")}>
      <main className={cx("main")}>
        <header className={cx("header")}>
          <div>
            <Typography type="title32">Events submitted</Typography>
            <Typography type="body16" color="gray200">
              total number: {totalEventNumber}
            </Typography>
          </div>

          <Link href="/events/create">
            <Button variant="cta">submit an event</Button>
          </Link>
        </header>

        <header className={cx("header")}>
          <Typography type="title24">events</Typography>
        </header>
        {mockData.map((group) => (
          <section key={group.eventYearMonth} className={cx("month_section")}>
            <Typography type="title20">{group.eventYearMonth}</Typography>

            <div className={cx("events_list")}>
              {group.events.map((event) => (
                <div key={event.eventId} className={cx("event_item")}>
                  <div className={cx("event_details")}>
                    <Typography type="body14">{event.eventDate}</Typography>
                    <div>
                      <Typography type="body14">{event.eventName}</Typography>
                      <Typography type="body14">{event.eventVenue || "TBA"}</Typography>
                    </div>
                  </div>

                  <div className={cx("event_status")}>
                    <Typography type="body14">{event.soldTicketCount} tickets sold</Typography>
                    <Link
                      href={`/events/${event.eventId}/manage`}
                      className={cx("management_link")}
                    >
                      Event management
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

// TODO: 추후 Mock data 제거
const mockData: EventGroup[] = [
  {
    eventYearMonth: "2025.09",
    events: [
      {
        eventId: 1,
        eventName: "2025 여름 음악 축제",
        eventVenue: "서울 월드컵 경기장",
        eventDate: "Fri, 04",
        soldTicketCount: 1345,
      },
      {
        eventId: 2,
        eventName: "2025 글로벌 스타트업 콘퍼런스",
        eventVenue: null,
        eventDate: "Fri, 04",
        soldTicketCount: 987,
      },
    ],
  },
  {
    eventYearMonth: "2025.08",
    events: [
      {
        eventId: 3,
        eventName: "2025 여름 음악 축제",
        eventVenue: "서울 월드컵 경기장",
        eventDate: "Fri, 04",
        soldTicketCount: 1345,
      },
      {
        eventId: 4,
        eventName: "2025 글로벌 스타트업 콘퍼런스",
        eventVenue: null,
        eventDate: "Fri, 04",
        soldTicketCount: 987,
      },
    ],
  },
  {
    eventYearMonth: "2025.07",
    events: [
      {
        eventId: 5,
        eventName: "Ceiling service vol.6 - Ksawery Komputery [PL]",
        eventVenue: "TBA - Layer 41, 성수동",
        eventDate: "Fri, 04",
        soldTicketCount: 25,
      },
      {
        eventId: 6,
        eventName: "Ceiling service vol.6 - Ksawery Komputery [PL]",
        eventVenue: "TBA - Layer 41, 성수동",
        eventDate: "Fri, 04",
        soldTicketCount: 25,
      },
    ],
  },
  {
    eventYearMonth: "2025.06",
    events: [
      {
        eventId: 7,
        eventName: "Ceiling service vol.6 - Ksawery Komputery [PL]",
        eventVenue: "TBA - Layer 41, 성수동",
        eventDate: "Fri, 04",
        soldTicketCount: 25,
      },
    ],
  },
  {
    eventYearMonth: "2025.05",
    events: [
      {
        eventId: 8,
        eventName: "Ceiling service vol.6 - Ksawery Komputery [PL]",
        eventVenue: "TBA - Layer 41, 성수동",
        eventDate: "Fri, 04",
        soldTicketCount: 25,
      },
      {
        eventId: 9,
        eventName: "Ceiling service vol.6 - Ksawery Komputery [PL]",
        eventVenue: "TBA - Layer 41, 성수동",
        eventDate: "Fri, 04",
        soldTicketCount: 25,
      },
      {
        eventId: 10,
        eventName: "Ceiling service vol.6 - Ksawery Komputery [PL]",
        eventVenue: "TBA - Layer 41, 성수동",
        eventDate: "Fri, 04",
        soldTicketCount: 25,
      },
      {
        eventId: 11,
        eventName: "Ceiling service vol.6 - Ksawery Komputery [PL]",
        eventVenue: "TBA - Layer 41, 성수동",
        eventDate: "Fri, 04",
        soldTicketCount: 25,
      },
      {
        eventId: 12,
        eventName: "Ceiling service vol.6 - Ksawery Komputery [PL]",
        eventVenue: "TBA - Layer 41, 성수동",
        eventDate: "Fri, 04",
        soldTicketCount: 25,
      },
    ],
  },
];
