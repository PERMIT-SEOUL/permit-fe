import classNames from "classnames/bind";

import { Typography } from "@permit/design-system";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type TabType = "ready" | "not_available";

type Props = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

export const BookingHistoryTabs = ({ activeTab, onTabChange }: Props) => {
  return (
    <div className={cx("tabs_container")}>
      <div className={cx("tabs_header")}>
        <button
          className={cx("tab_button", { active: activeTab === "ready" })}
          onClick={() => onTabChange("ready")}
        >
          <Typography
            type="body16"
            weight={activeTab === "ready" ? "bold" : "regular"}
            color={activeTab === "ready" ? "white" : "gray400"}
          >
            Ready to Use
          </Typography>
        </button>

        <button
          className={cx("tab_button", { active: activeTab === "not_available" })}
          onClick={() => onTabChange("not_available")}
        >
          <Typography
            type="body16"
            weight={activeTab === "not_available" ? "bold" : "regular"}
            color={activeTab === "not_available" ? "white" : "gray400"}
          >
            Not Available
          </Typography>
        </button>
      </div>

      <div className={cx("tabs_indicator")}>
        <div
          className={cx("indicator_bar", "active", {
            not_available: activeTab === "not_available",
          })}
        />
      </div>
    </div>
  );
};
