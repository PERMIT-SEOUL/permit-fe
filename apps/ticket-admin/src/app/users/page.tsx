import classNames from "classnames/bind";

import { UserManagementClient } from "./_clientBoundary/UserManagementClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const UsersPage = () => {
  return (
    <div className={cx("container")}>
      <UserManagementClient />
    </div>
  );
};

export default UsersPage;
