/**
 * 객체의 값들을 Union 타입으로 추출하는 유틸리티 타입
 */
export type ObjectValues<T> = T[keyof T];
