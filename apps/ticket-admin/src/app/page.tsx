import Link from "next/link";
import styles from "./page.module.scss";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ticket Admin</h1>
      <p className={styles.description}>
        티켓 관리자 대시보드에 오신 것을 환영합니다.
      </p>
      <div className={styles.links}>
        <Link href="/1/dashboard" className={styles.link}>
          대시보드 1
        </Link>
        <Link href="/2/dashboard" className={styles.link}>
          대시보드 2
        </Link>
      </div>
    </div>
  );
}
