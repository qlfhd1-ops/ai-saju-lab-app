export default function BetaPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "40px", color: "#fff" }}>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>AI Saju Lab · Beta</h1>
      <p style={{ opacity: 0.7, marginBottom: 24 }}>
        초대된 사용자만 접근 가능한 베타 테스트 페이지입니다.
      </p>

      <div
        style={{
          padding: 20,
          borderRadius: 12,
          background: "rgba(255,255,255,0.05)",
          maxWidth: 520,
        }}
      >
        <p>✅ 현재 테스트 중인 기능</p>
        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
          <li>AI 사주 해석</li>
          <li>오늘의 운세</li>
          <li>궁합(베타)</li>
        </ul>
      </div>
    </main>
  );
}

