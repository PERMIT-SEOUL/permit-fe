"use client";

import classNames from "classnames/bind";

import { useTicketsQuery } from "@/data/admin/getTickets/queries";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: string;
};

export function TicketManagementClient({ eventId }: Props) {
  const { data, isLoading, error } = useTicketsQuery({ eventId });

  if (isLoading) {
    return <div className={cx("container")}>로딩 중...</div>;
  }

  if (error || !data) {
    return <div className={cx("container")}>데이터를 불러올 수 없습니다.</div>;
  }

  const { ticketRoundsWithTypes } = data;

  return (
    <div className={cx("container")}>
      {ticketRoundsWithTypes.map((ticketRound) => (
        <div key={ticketRound.ticketRoundId} className={cx("ticketRound")}>
          {/* 헤더 섹션 */}
          <div className={cx("header")}>
            <div className={cx("titleSection")}>
              <h2 className={cx("title")}>{ticketRound.ticketRoundName}</h2>
              <div className={cx("salesPeriod")}>
                <div className={cx("salesInfo")}>
                  <span className={cx("label")}>sales start</span>
                  <span className={cx("datetime")}>
                    {ticketRound.ticketRoundSalesStartDate} {ticketRound.ticketRoundSalesStartTime}
                  </span>
                </div>
                <div className={cx("salesInfo")}>
                  <span className={cx("label")}>sales end</span>
                  <span className={cx("datetime")}>
                    {ticketRound.ticketRoundSalesEndDate} {ticketRound.ticketRoundSalesEndTime}
                  </span>
                </div>
              </div>
            </div>

            <div className={cx("actionSection")}>
              <button className={cx("editButton")}>edit</button>
            </div>
          </div>

          {/* 티켓 타입들 */}
          <div className={cx("ticketTypes")}>
            {ticketRound.ticketTypes.map((ticketType) => (
              <div key={ticketType.ticketTypeId} className={cx("ticketTypeCard")}>
                <div className={cx("ticketTypeHeader")}>
                  <div className={cx("headerCell")}>Ticket type {ticketType.ticketTypeId}</div>
                  <div className={cx("headerCell")}>Price</div>
                  <div className={cx("headerCell")}>Refund</div>
                  <div className={cx("headerCell")}>Ticket sold</div>
                  <div className={cx("headerCell")}>Ticket used</div>
                  <div className={cx("headerCell")}>Ticket sold amount</div>
                </div>

                <div className={cx("ticketTypeData")}>
                  <div className={cx("dataCell")}>Ticket type {ticketType.ticketTypeId}</div>
                  <div className={cx("dataCell")}>
                    ₩ {ticketType.ticketTypePrice.toLocaleString()}
                  </div>
                  <div className={cx("dataCell")}>{ticketType.ticketTypeRefundCount}</div>
                  <div className={cx("dataCell")}>
                    {ticketType.ticketTypeSoldCount} / {ticketType.ticketTypeTotalCount}
                  </div>
                  <div className={cx("dataCell")}>
                    {ticketType.ticketTypeUsedCount} / {ticketType.ticketTypeSoldCount}
                  </div>
                  <div className={cx("dataCell")}>
                    ₩ {ticketType.ticketTypeSoldAmount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
