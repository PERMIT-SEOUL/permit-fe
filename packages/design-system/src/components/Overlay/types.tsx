import { ReactElement } from "react";

export type CreateOverlayElement = (props: {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
}) => ReactElement;
