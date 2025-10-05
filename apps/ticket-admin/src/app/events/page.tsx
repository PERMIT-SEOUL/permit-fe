"use client";

import Link from "next/link";
import classNames from "classnames/bind";

import { Button, Typography } from "@permit/design-system";
import { useEventsListQuery } from "@/data/admin/getEvents/queries";

import styles from "./page.module.scss";

const cx = classNames.bind(styles);

export default function EventsPage() {
  const { data: eventsListData, isLoading } = useEventsListQuery({});

  if (!eventsListData || isLoading) {
    return <div>Loading...</div>;
  }

  const totalEventNumber = eventsListData.reduce((acc, event) => acc + event.events.length, 0);

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
        {eventsListData.map((event) => (
          <section key={event.eventYearMonth} className={cx("month_section")}>
            <Typography type="title20">{event.eventYearMonth}</Typography>

            <div className={cx("events_list")}>
              {event.events.map((event) => (
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
                    <Link href={`/events/${event.eventId}/edit`} className={cx("management_link")}>
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
