"use client";

import classNames from "classnames/bind";

import { Button, Typography } from "@permit/design-system";
import { useTicketsQuery } from "@/data/admin/getTickets/queries";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: number;
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

  // 전체 티켓 통계 계산
  const totalStats = ticketRoundsWithTypes.reduce(
    (acc, ticketRound) => {
      const roundStats = ticketRound.ticketTypes.reduce(
        (roundAcc, ticketType) => ({
          totalSold: roundAcc.totalSold + ticketType.ticketTypeSoldCount,
          totalCount: roundAcc.totalCount + ticketType.ticketTypeTotalCount,
          totalAmount: roundAcc.totalAmount + ticketType.ticketTypeSoldAmount,
        }),
        { totalSold: 0, totalCount: 0, totalAmount: 0 },
      );

      return {
        totalSold: acc.totalSold + roundStats.totalSold,
        totalCount: acc.totalCount + roundStats.totalCount,
        totalAmount: acc.totalAmount + roundStats.totalAmount,
      };
    },
    { totalSold: 0, totalCount: 0, totalAmount: 0 },
  );

  return (
    <div className={cx("container")}>
      <div className={cx("headerSection")}>
        <Typography type="title24">Your tickets</Typography>

        <div className={cx("statsSection")}>
          <div className={cx("statsGrid")}>
            <div className={cx("statColumn")}>
              <Typography type="body14" className={cx("statLabel")}>
                Total ticket sold / Total ticket count
              </Typography>
              <Typography type="title18" className={cx("statValue")}>
                {totalStats.totalSold} / {totalStats.totalCount}
              </Typography>
            </div>

            <div className={cx("statColumn")}>
              <Typography type="body14" className={cx("statLabel")}>
                Total sold amount
              </Typography>
              <Typography type="title18" className={cx("statValue")}>
                ₩ {totalStats.totalAmount.toLocaleString()}
              </Typography>
            </div>
          </div>

          <Button
            variant="cta"
            size="sm"
            onClick={() => {
              console.log("add ticket");
            }}
          >
            Add round
          </Button>
        </div>
      </div>

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
