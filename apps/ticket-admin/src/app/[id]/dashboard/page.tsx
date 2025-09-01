import Link from "next/link";
import styles from "./page.module.scss";

type DashboardPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { id } = await params;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>대시보드 {id}</h1>
        <Link href="/" className={styles.backLink}>
          홈으로 돌아가기
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <h2>통계</h2>
          <p>ID: {id}에 대한 통계 정보가 여기에 표시됩니다.</p>
        </div>

        <div className={styles.card}>
          <h2>최근 활동</h2>
          <p>최근 활동 내역이 여기에 표시됩니다.</p>
        </div>

        <div className={styles.card}>
          <h2>설정</h2>
          <p>관리 설정이 여기에 표시됩니다.</p>
        </div>
      </main>
    </div>
  );
}
