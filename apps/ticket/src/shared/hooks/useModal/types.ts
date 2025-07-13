/**
 * 모달 컴포넌트에 주입되는 공통 props
 * @template TResult - 모달이 닫힐 때 반환되는 결과값의 타입
 */
export type ModalComponentProps<TResult> = {
  isOpen: boolean;
  close: (result?: TResult) => void;
};

/**
 * 모달 컴포넌트의 props 에서 공통 props 를 제외한 사용자 정의 props 만 추출
 * @template TProps - 모달 컴포넌트의 전체 props 타입
 */
export type ExtractUserProps<TProps> = Omit<TProps, keyof ModalComponentProps<unknown>>;

/**
 * 모달 컴포넌트의 props 에서 결과값 타입을 추출
 * @template TProps - 모달 컴포넌트의 전체 props 타입
 */
export type ExtractResultType<TProps> = TProps extends ModalComponentProps<infer T> ? T : never;
