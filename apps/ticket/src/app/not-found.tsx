import Link from "next/link";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <h1>요청하신 페이지를 찾을 수 없어요</h1>
        <p>
          방문하시려는 페이지의 주소가 잘못되었거나,
          <br />
          삭제되어 찾을 수 없어요.
        </p>
        <Link href="/">
          <button
            style={{
              height: "48px",
              width: "180px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            홈으로
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
