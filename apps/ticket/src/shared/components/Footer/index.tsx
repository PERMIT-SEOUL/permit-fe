import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const Footer = () => {
  return (
    <footer className={cx("container")}>
      <div className={cx("links")}>
        <Typography type="body12" color="gray400">
          Copyright © 2024 PERMIT
        </Typography>
        <Typography type="body12" color="gray400">
          Instagram_Permit
        </Typography>
        <Typography type="body12" color="gray400">
          Instagram_ceiling
        </Typography>
        <Typography type="body12" color="gray400">
          hello@permitseoul.com
        </Typography>
      </div>
      <Typography type="body12" color="gray400">
        상호명, 사업자등록번호, 대표자명, 사업장 주소, 유선번호
      </Typography>
    </footer>
  );
};
