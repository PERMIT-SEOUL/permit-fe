import classNames from "classnames/bind";

import { LoadingIndicator } from "../LoadingIndicator";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export const LoadingWithLayout = () => {
  return (
    <div className={cx("container")}>
      <LoadingIndicator />
    </div>
  );
};
