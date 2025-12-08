"use client";

import classNames from "classnames/bind";

import { Button, Typography } from "@permit/design-system";
import { useGuestListQuery } from "@/data/admin/getGuestList/queries";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";
import { useModal } from "@/shared/hooks/useModal";

import { AddGuestModal } from "./_components/AddGuestModal";
import styles from "./page.module.scss";

const cx = classNames.bind(styles);

export default function GuestsPage() {
  const { show: openAddGuestModal } = useModal(AddGuestModal);

  const { data: guestListData, isLoading, refetch } = useGuestListQuery({});

  const handleAddGuest = async () => {
    const result = await openAddGuestModal({});

    if (result) {
      refetch();
    }
  };

  // TODO: 로딩 컴포넌트 변경
  if (!guestListData || isLoading) {
    return <LoadingWithLayout />;
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

          <Button variant="cta" onClick={handleAddGuest}>
            add guest
          </Button>
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
                <tr key={guest.guestId}>
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
