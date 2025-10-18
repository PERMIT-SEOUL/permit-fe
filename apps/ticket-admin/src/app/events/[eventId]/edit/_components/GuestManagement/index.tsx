"use client";

import { useState } from "react";
import classNames from "classnames/bind";

import { Button, Typography } from "@permit/design-system";
import { useGuestListQuery } from "@/data/admin/getGuestList/queries";
import { usePostGuestTicketsMutation } from "@/data/admin/postGuestTickets/mutation";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: number;
};

export function GuestManagement({ eventId }: Props) {
  const { data: guestListData, isLoading } = useGuestListQuery({});
  const [selectedGuests, setSelectedGuests] = useState<Set<number>>(new Set());
  const [ticketCounts, setTicketCounts] = useState<{ [key: number]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: createGuestTickets } = usePostGuestTicketsMutation({});

  const handleSendEmail = async () => {
    if (selectedGuests.size === 0) {
      alert("게스트를 선택해주세요.");

      return;
    }

    setIsSubmitting(true);

    try {
      // 선택된 게스트들의 티켓 정보 구성
      const guestTicketList = Array.from(selectedGuests).map((guestId) => ({
        guestId,
        ticketCount: ticketCounts[guestId] || 1,
      }));

      await createGuestTickets({
        eventId: Number(eventId),
        guestTicketList,
      });

      alert("게스트 티켓이 성공적으로 생성되었습니다.");

      // 성공 후 상태 초기화
      setSelectedGuests(new Set());
      setTicketCounts({});
    } catch (error) {
      console.error("Error creating guest tickets:", error);
      alert("게스트 티켓 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTicketCountChange = (guestId: number, delta: number) => {
    setTicketCounts((prev) => ({
      ...prev,
      [guestId]: Math.max(0, (prev[guestId] || 1) + delta),
    }));
  };

  const handleGuestSelection = (guestId: number) => {
    setSelectedGuests((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(guestId)) {
        newSet.delete(guestId);
      } else {
        newSet.add(guestId);
      }

      return newSet;
    });
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
            <Typography type="title24">Guest List Management</Typography>
          </div>
        </header>

        <div className={cx("table_container")}>
          <table className={cx("guest_table")}>
            <thead>
              <tr>
                <th>Affiliation</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Tickets</th>
              </tr>
            </thead>
            <tbody>
              {guestListData.guests.map((guest) => (
                <tr key={guest.guestId}>
                  <td className={cx("affiliation_cell")}>
                    <label className={cx("checkbox_label")}>
                      <input
                        type="checkbox"
                        checked={selectedGuests.has(guest.guestId)}
                        onChange={() => handleGuestSelection(guest.guestId)}
                        className={cx("checkbox")}
                      />
                      <span>{guest.affiliation}</span>
                    </label>
                  </td>
                  <td>{guest.guestName}</td>
                  <td>{guest.phoneNumber}</td>
                  <td>{guest.email}</td>
                  <td className={cx("tickets_cell")}>
                    <button
                      type="button"
                      onClick={() => handleTicketCountChange(guest.guestId, -1)}
                      className={cx("ticket_button", "minus")}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={ticketCounts[guest.guestId] || 1}
                      onChange={(e) =>
                        setTicketCounts((prev) => ({
                          ...prev,
                          [guest.guestId]: Math.max(0, parseInt(e.target.value) || 1),
                        }))
                      }
                      className={cx("ticket_input")}
                      min="0"
                    />
                    <button
                      type="button"
                      onClick={() => handleTicketCountChange(guest.guestId, 1)}
                      className={cx("ticket_button", "plus")}
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <div className={cx("floating")}>
        <div className={cx("floating_content")}>
          <Button
            className={cx("button")}
            size="md"
            onClick={handleSendEmail}
            variant={selectedGuests.size > 0 ? "cta" : "primary"}
            disabled={isSubmitting || selectedGuests.size === 0}
          >
            {isSubmitting
              ? "Creating tickets..."
              : selectedGuests.size > 0
                ? `(${selectedGuests.size} selected) create tickets`
                : "select guest to create tickets"}
          </Button>
        </div>
      </div>
    </div>
  );
}
