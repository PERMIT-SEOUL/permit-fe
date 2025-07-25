import classNames from "classnames/bind";
import { QRCodeSVG } from "qrcode.react";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const QR_SIZE = 50;

type Props = {
  ticketCode: string;
  onClick?: () => void;
};

/**
 * 행사 참가 시 QR 코드 버튼
 */
export const QRCodeButton = ({ ticketCode, onClick }: Props) => {
  const entryUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/entry/${ticketCode}`;

  return (
    <button className={cx("qr_button")} type="button" onClick={onClick}>
      <QRCodeSVG value={entryUrl} size={QR_SIZE} />
    </button>
  );
};
