import classNames from "classnames/bind";

import { MyPageClient } from "./_clientBoundary/MyPageClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

/**
 * 마이페이지
 */
const MyPage = () => {
  return (
    <div className={cx("container")}>
      <MyPageClient />
    </div>
  );
};

export default MyPage;
