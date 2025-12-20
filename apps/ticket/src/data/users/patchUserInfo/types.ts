export type PatchUserInfoRequest = {
  /** 회원 이름 */
  name: string;
  /** 회원 성별 */
  gender: string;
  /** 회원 이메일 */
  email?: string;
};
