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
              {mockGuests.map((guest) => (
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
const mockGuests = [
  {
    id: 1,
    guestName: "이름",
    guestType: "VIP",
    affiliation: "퍼밋소속",
    phoneNumber: "010-8775-4618",
    email: "seongjoonkw@naver.com",
  },
  {
    id: 2,
    guestName: "이름",
    guestType: "VIP",
    affiliation: "솝트소속",
    phoneNumber: "010-1234-4618",
    email: "aase@naver.com",
  },
  {
    id: 3,
    guestName: "이름",
    guestType: "VIP",
    affiliation: "퍼밋소속",
    phoneNumber: "010-8775-4618",
    email: "seongjoonkw@naver.com",
  },
  {
    id: 4,
    guestName: "이름",
    guestType: "VIP",
    affiliation: "솝트소속",
    phoneNumber: "010-1234-4618",
    email: "aase@naver.com",
  },
  {
    id: 5,
    guestName: "이름",
    guestType: "VIP",
    affiliation: "퍼밋소속",
    phoneNumber: "010-8775-4618",
    email: "seongjoonkw@naver.com",
  },
];
