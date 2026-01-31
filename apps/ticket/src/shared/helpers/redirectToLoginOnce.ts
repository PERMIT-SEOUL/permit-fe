import { safeSessionStorage } from "@/lib/storage";
import { PATH } from "@/shared/constants/path";
import { IS_LOGINED } from "@/shared/constants/storage";

let isLoginAlertShown = false;

/**
 * 클라이언트 인증 만료/필요시 공통 로그인 리다이렉션 함수 (alert + 세션스토리지 + redirectUrl)
 */
export function redirectToLoginOnce() {
  if (isLoginAlertShown) return;

  isLoginAlertShown = true;

  alert("로그인 후 이용해 주세요.");
  safeSessionStorage.remove(IS_LOGINED);

  const redirectUrl = window.location.pathname + window.location.search;
  const loginUrl = `${PATH.LOGIN}?redirectUrl=${encodeURIComponent(redirectUrl)}`;

  window.location.href = loginUrl;
}
