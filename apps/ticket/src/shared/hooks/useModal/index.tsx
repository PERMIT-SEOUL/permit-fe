import { type JSX, useCallback } from "react";

import { useOverlay } from "@permit/design-system/hooks";

type ModalComponentProps<T> = {
  isOpen: boolean;
  close: () => void;
  resolve: (result: T) => void;
};

export const useModal = <T = boolean, P = Record<string, unknown>>(
  ModalComponent: (props: ModalComponentProps<T> & P) => JSX.Element,
) => {
  const { open } = useOverlay();

  const show = useCallback(
    (props?: P) => {
      return new Promise<T>((resolve) => {
        open(({ isOpen, close }) => (
          <ModalComponent {...(props as P)} isOpen={isOpen} close={close} resolve={resolve} />
        ));
      });
    },
    [open, ModalComponent],
  );

  return {
    show,
  };
};
