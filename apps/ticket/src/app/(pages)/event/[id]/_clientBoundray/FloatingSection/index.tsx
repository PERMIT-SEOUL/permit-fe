import classNames from "classnames/bind";

import { Button } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const FloatingSection = () => {
  return (
    <div className={cx("floating")}>
      <Button className={cx("button")} variant="primary" size="md">
        Buy Ticket
      </Button>
    </div>
  );
};
