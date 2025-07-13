import { type JSX, useCallback } from "react";

import { useOverlay } from "@permit/design-system/hooks";

import { ExtractResultType, ExtractUserProps, ModalComponentProps } from "./types";

/**
 * Modal 을 쉽게 사용할 수 있는 hook
 *
 * @example
 * ```tsx
 * // 모달 컴포넌트 정의
 * type MyModalProps = {
 *   title: string;
 * } & ModalComponentProps<boolean>;
 *
 * const MyModal = ({ isOpen, close, title }: MyModalProps) => {
 *   return (
 *     <Dialog open={isOpen} onClose={() => close(false)}>
 *       <h1>{title}</h1>
 *       <button onClick={() => close(true)}>확인</button>
 *     </Dialog>
 *   );
 * };
 *
 * // 모달 사용
 * const { show } = useModal(MyModal);
 * const result = await show({ title: '제목' }); // result: boolean
 * ```
 *
 * @param ModalComponent - 보여줄 모달 컴포넌트
 * @returns show 함수를 포함한 객체. show 함수는 모달을 열고 Promise 를 반환
 */
export const useModal = <
  TProps extends ModalComponentProps<TResult>,
  TResult = ExtractResultType<TProps>,
>(
  ModalComponent: (props: TProps) => JSX.Element,
) => {
  const { open } = useOverlay();

  const show = useCallback(
    (props: ExtractUserProps<TProps>): Promise<TResult> => {
      return new Promise((resolve) => {
        open(({ isOpen, close }) => (
          <ModalComponent
            {...(props as TProps)}
            isOpen={isOpen}
            close={(result?: TResult) => {
              resolve(result ?? (false as TResult));
              close();
            }}
          />
        ));
      });
    },
    [open, ModalComponent],
  );

  return { show };
};
