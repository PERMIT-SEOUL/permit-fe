/**
 * BottomSheet 컴포넌트에 주입되는 공통 props
 * @template TResult - BottomSheet가 닫힐 때 반환되는 결과값의 타입
 */
export type BottomSheetComponentProps<TResult = null> = {
  isOpen: boolean;
  close: (result?: TResult) => void;
};

/**
 * BottomSheet 컴포넌트의 props 에서 공통 props 를 제외한 사용자 정의 props 만 추출
 * @template TProps - BottomSheet 컴포넌트의 전체 props 타입
 */
export type ExtractUserProps<TProps> = Omit<TProps, keyof BottomSheetComponentProps<unknown>>;

/**
 * BottomSheet 컴포넌트의 props 에서 결과값 타입을 추출
 * @template TProps - BottomSheet 컴포넌트의 전체 props 타입
 */
export type ExtractResultType<TProps> =
  TProps extends BottomSheetComponentProps<infer T> ? T : never;
