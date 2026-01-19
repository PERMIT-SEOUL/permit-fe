import classNames from "classnames/bind";

import { Flex, Typography } from "@permit/design-system";

import { CtaButtonClient } from "./_clientBoundary/CtaButtonClient";
import { EventInfoClient } from "./_clientBoundary/EventInfoClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  params: Promise<{ bookingId: string }>;
};

/**
 * 이벤트 예매 확정 페이지
 * @deprecated
 */
const ConfirmedPage = async ({ params }: Props) => {
  const { bookingId } = await params;

  return (
    <Flex className={cx("wrap")} direction="column" align="center">
      <Typography type="title24">Booking Confirmed</Typography>
      <EventInfoClient />
      <CtaButtonClient />
    </Flex>
  );
};

export default ConfirmedPage;
