import classNames from "classnames/bind";

import { Flex, Typography } from "@permit/design-system";

import { CtaButtonClient } from "./_clientBoundary/CtaButtonClient";
import { EventInfoClient } from "./_clientBoundary/EventInfoClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

/**
 * 이벤트 예매 확정 페이지
 */
const ConfirmedPage = () => {
  return (
    <Flex className={cx("wrap")} direction="column" align="center">
      <Typography type="title24">Booking Confirmed</Typography>
      <EventInfoClient />
      <CtaButtonClient />
    </Flex>
  );
};

export default ConfirmedPage;
