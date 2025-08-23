import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type IconProps = React.HTMLAttributes<SVGElement> & {
  className?: string;
  size?: number;
  fill: string;
};

export const Icon = {
  Calendar: ({ size = 20, fill, className }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cx("icon", fill, className)}
      width={size}
      height="auto"
      viewBox="0 0 16 18"
      fill="none"
    >
      <path d="M13.8333 2.49992H13V0.833252H11.3333V2.49992H4.66667V0.833252H3V2.49992H2.16667C1.72464 2.49992 1.30072 2.67551 0.988155 2.98807C0.675595 3.30063 0.5 3.72456 0.5 4.16659V15.8333C0.5 16.2753 0.675595 16.6992 0.988155 17.0118C1.30072 17.3243 1.72464 17.4999 2.16667 17.4999H13.8333C14.7583 17.4999 15.5 16.7583 15.5 15.8333V4.16659C15.5 3.72456 15.3244 3.30063 15.0118 2.98807C14.6993 2.67551 14.2754 2.49992 13.8333 2.49992ZM13.8333 15.8333H2.16667V7.49992H13.8333V15.8333ZM13.8333 5.83325H2.16667V4.16659H13.8333V5.83325Z" />
    </svg>
  ),
  Down: ({ size = 20, fill, className }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cx("icon", fill, className)}
      width={size}
      height="auto"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="#A3A3A3"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Up: ({ size = 20, fill, className }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cx("icon", fill, className)}
      width={size}
      height="auto"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5 12.5L10 7.5L15 12.5"
        stroke="#A3A3A3"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Upload: ({ size = 20, fill, className }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cx("icon", fill, className)}
      width={size}
      height="auto"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M11.6663 1.66675L16.6663 6.66675V16.6667C16.6663 17.1088 16.4907 17.5327 16.1782 17.8453C15.8656 18.1578 15.4417 18.3334 14.9997 18.3334H4.99967C4.55765 18.3334 4.13372 18.1578 3.82116 17.8453C3.5086 17.5327 3.33301 17.1088 3.33301 16.6667V3.33341C3.33301 2.89139 3.5086 2.46746 3.82116 2.1549C4.13372 1.84234 4.55765 1.66675 4.99967 1.66675H11.6663ZM14.9997 16.6667V7.50008H10.833V3.33341H4.99967V16.6667H14.9997ZM9.99967 10.0001L13.333 13.3334H11.2497V15.8334H8.74967V13.3334H6.66634L9.99967 10.0001Z" />
    </svg>
  ),
  Close: ({ size = 20, fill, className }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cx("icon", fill, className)}
      width={size}
      height="auto"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M15.8337 5.34175L14.6587 4.16675L10.0003 8.82508L5.34199 4.16675L4.16699 5.34175L8.82533 10.0001L4.16699 14.6584L5.34199 15.8334L10.0003 11.1751L14.6587 15.8334L15.8337 14.6584L11.1753 10.0001L15.8337 5.34175Z" />
    </svg>
  ),
  Plus: ({ size = 20, fill, className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 1.875C5.52 1.875 1.875 5.52 1.875 10C1.875 14.48 5.52 18.125 10 18.125C14.48 18.125 18.125 14.48 18.125 10C18.125 5.52 14.48 1.875 10 1.875ZM10 3.125C13.8044 3.125 16.875 6.19563 16.875 10C16.875 13.8044 13.8044 16.875 10 16.875C6.19563 16.875 3.125 13.8044 3.125 10C3.125 6.19563 6.19563 3.125 10 3.125ZM9.375 6.25V9.375H6.25V10.625H9.375V13.75H10.625V10.625H13.75V9.375H10.625V6.25H9.375Z"
        fill="#8A8A8A"
      />
    </svg>
  ),
  Minus: ({ size = 20, fill, className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 1.875C5.52 1.875 1.875 5.52 1.875 10C1.875 14.48 5.52 18.125 10 18.125C14.48 18.125 18.125 14.48 18.125 10C18.125 5.52 14.48 1.875 10 1.875ZM10 3.125C13.8044 3.125 16.875 6.19563 16.875 10C16.875 13.8044 13.8044 16.875 10 16.875C6.19563 16.875 3.125 13.8044 3.125 10C3.125 6.19563 6.19563 3.125 10 3.125Z"
        fill="#8A8A8A"
      />
      <path d="M6.25 9.375H10.625H13.75V10.625H10.625H6.25V9.375Z" fill="#8A8A8A" />
    </svg>
  ),
};
