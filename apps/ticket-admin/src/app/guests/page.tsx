"use client";

import { Button, Typography } from "@permit/design-system";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { useGuestListQuery } from "@/data/admin/getGuestList/queries";

const cx = classNames.bind(styles);

export default function GuestsPage() {
  const { data: guestListData, isLoading } = useGuestListQuery({});

  if (!guestListData || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cx("container")}>
      <main className={cx("main")}>
        <header className={cx("header")}>
          <div>
            <Typography type="title32">Guest List Management</Typography>
            <Typography type="body16" color="gray200">
              total number: {guestListData.guests.length}
            </Typography>
          </div>

          <Button variant="cta">add guest</Button>
        </header>

        <div className={cx("table_container")}>
          <table className={cx("guest_table")}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Affiliation</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {guestListData.guests.map((guest) => (
                <tr key={guest.id}>
                  <td>{guest.guestType}</td>
                  <td>{guest.affiliation}</td>
                  <td>{guest.guestName}</td>
                  <td>{guest.phoneNumber}</td>
                  <td>{guest.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

// Mock data
