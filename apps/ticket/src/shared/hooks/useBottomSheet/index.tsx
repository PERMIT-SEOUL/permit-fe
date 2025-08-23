import { type JSX, useCallback } from "react";

import { useOverlay } from "@permit/design-system/hooks";

import { BottomSheetComponentProps, ExtractResultType, ExtractUserProps } from "./types";

/**
 * BottomSheet를 쉽게 사용할 수 있는 hook
 *
 * @example
 * ```tsx
 * // BottomSheet 컴포넌트 정의
 * type MyBottomSheetProps = {
 *   title: string;
 * } & BottomSheetComponentProps<boolean>;
 *
 * const MyBottomSheet = ({ isOpen, close, title }: MyBottomSheetProps) => {
 *   return (
 *     <BottomSheet open={isOpen} onClose={() => close(false)} title={title}>
 *       <BottomSheet.Content>
 *         <p>BottomSheet 내용</p>
 *       </BottomSheet.Content>
 *       <BottomSheet.Bottom>
 *         <button onClick={() => close(true)}>확인</button>
 *       </BottomSheet.Bottom>
 *     </BottomSheet>
 *   );
 * };
 *
 * // BottomSheet 사용
 * const { show } = useBottomSheet(MyBottomSheet);
 * const result = await show({ title: '제목' }); // result: boolean
 * ```
 *
 * @param BottomSheetComponent - 보여줄 BottomSheet 컴포넌트
 * @returns show 함수를 포함한 객체. show 함수는 BottomSheet를 열고 Promise를 반환
 */
export const useBottomSheet = <
  TProps extends BottomSheetComponentProps<TResult>,
  TResult = ExtractResultType<TProps>,
>(
  BottomSheetComponent: (props: TProps) => JSX.Element,
) => {
  const { open } = useOverlay();

  const show = useCallback(
    (props: ExtractUserProps<TProps>): Promise<TResult> => {
      return new Promise((resolve) => {
        let isResolved = false;

        open(({ isOpen, close }) => (
          <BottomSheetComponent
            {...(props as TProps)}
            isOpen={isOpen}
            close={(result?: TResult) => {
              if (isResolved) return;

              isResolved = true;
              resolve(result ?? (false as TResult));
              close();
            }}
          />
        ));
      });
    },
    [open, BottomSheetComponent],
  );

  return { show };
};
