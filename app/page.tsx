export default function Home() {
  const styles = {
    page: {
      minHeight: "100vh",
      color: "#EDEDED",
      background:
        "radial-gradient(1200px 600px at 20% 10%, rgba(120, 90, 255, 0.25), transparent 60%)," +
        "radial-gradient(1000px 600px at 80% 30%, rgba(40, 190, 255, 0.18), transparent 55%)," +
        "linear-gradient(180deg, #07070B 0%, #0B0B12 100%)",
      padding: "56px 20px",
    },
    shell: { maxWidth: 980, margin: "0 auto" },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      marginBottom: 36,
    },
    brand: {
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: "-0.02em",
      margin: 0,
      opacity: 0.95,
    },
    nav: { display: "flex", gap: 10, flexWrap: "wrap" as const },
    btn: {
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.14)",
      background: "rgba(255,255,255,0.06)",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 700,
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
    },
    btnPrimary: {
      background:
        "linear-gradient(135deg, rgba(120,90,255,0.95) 0%, rgba(40,190,255,0.85) 100%)",
      border: "1px solid rgba(255,255,255,0.16)",
    },
    hero: {
      display: "grid",
      gridTemplateColumns: "1.2fr 0.8fr",
      gap: 18,
      alignItems: "stretch",
    },
    heroLeft: {
      padding: 28,
      borderRadius: 22,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.05)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
      backdropFilter: "blur(10px)",
    },
    heroTitle: {
      fontSize: 44,
      lineHeight: 1.08,
      letterSpacing: "-0.03em",
      margin: 0,
      fontWeight: 900,
    },
    heroSub: {
      marginTop: 14,
      marginBottom: 0,
      opacity: 0.8,
      lineHeight: 1.7,
      fontSize: 15,
      maxWidth: 620,
    },
    pills: {
      display: "flex",
      flexWrap: "wrap" as const,
      gap: 8,
      marginTop: 18,
    },
    pill: {
      fontSize: 12,
      padding: "7px 10px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.14)",
      background: "rgba(255,255,255,0.06)",
      color: "rgba(255,255,255,0.85)",
    },
    ctaRow: { display: "flex", gap: 10, flexWrap: "wrap" as const, marginTop: 18 },
    side: {
      padding: 22,
      borderRadius: 22,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.04)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
      backdropFilter: "blur(10px)",
    },
    sideTitle: { margin: 0, fontSize: 16, fontWeight: 800, opacity: 0.95 },
    sideText: { marginTop: 10, marginBottom: 0, opacity: 0.75, lineHeight: 1.6, fontSize: 13 },
    grid3: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 14,
      marginTop: 16,
    },
    card: {
      padding: 18,
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.04)",
    },
    cardTitle: { margin: 0, fontSize: 14, fontWeight: 800 },
    cardDesc: { marginTop: 8, marginBottom: 0, opacity: 0.75, lineHeight: 1.6, fontSize: 13 },
    footer: { marginTop: 28, opacity: 0.55, fontSize: 12, lineHeight: 1.6 },
    hr: { height: 1, background: "rgba(255,255,255,0.10)", margin: "22px 0" },
  };

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        {/* Top */}
        <div style={styles.header}>
          <p style={styles.brand}>AI Saju Lab</p>
          <div style={styles.nav}>
            <a href="/beta" style={{ ...styles.btn, ...styles.btnPrimary }}>
              베타 입장 →
            </a>
            <a href="https://vercel.com" style={styles.btn} target="_blank" rel="noreferrer">
              운영 상태
            </a>
          </div>
        </div>

        {/* Hero */}
        <div style={styles.hero}>
          <section style={styles.heroLeft}>
            <h1 style={styles.heroTitle}>
              오늘을 정리하는
              <br />
              AI 사주 실험실
            </h1>
            <p style={styles.heroSub}>
              지금은 베타 테스트 단계입니다. 최소 입력(이름/생년월일)으로 결과 포맷을 확인하고,
              다음 단계에서 AI 연결(프롬프트/모델/결과 톤)을 개선합니다.
            </p>

            <div style={styles.pills}>
              <span style={styles.pill}>오늘의 한 줄</span>
              <span style={styles.pill}>사주 해석(베타)</span>
              <span style={styles.pill}>궁합(예정)</span>
              <span style={styles.pill}>저장 없음(현재)</span>
            </div>

            <div style={styles.ctaRow}>
              <a href="/beta" style={{ ...styles.btn, ...styles.btnPrimary }}>
                베타 테스트 시작
              </a>
              <a href="#features" style={styles.btn}>
                기능 보기
              </a>
            </div>

            <div style={styles.hr} />

            <div style={styles.grid3} id="features">
              <div style={styles.card}>
                <p style={styles.cardTitle}>① 입력 UX</p>
                <p style={styles.cardDesc}>
                  입력폼(생년월일/시간/성별/지역/메모)을 정리하고, 결과 화면을 “복사/공유”하기 쉽게 설계합니다.
                </p>
              </div>
              <div style={styles.card}>
                <p style={styles.cardTitle}>② 결과 톤</p>
                <p style={styles.cardDesc}>
                  너무 무겁지 않게, 하지만 의미는 남게. 문장 길이/구조/이모지 사용을 테스트합니다.
                </p>
              </div>
              <div style={styles.card}>
                <p style={styles.cardTitle}>③ AI 연결</p>
                <p style={styles.cardDesc}>
                  다음 단계에서 API 연결로 “더미 결과”를 실제 생성 결과로 교체합니다.
                </p>
              </div>
            </div>

            <p style={styles.footer}>
              * 현재는 베타 실험용으로, 개인정보 저장/로그 수집은 최소화하는 방향으로 진행 중입니다.
            </p>
          </section>

          {/* Side */}
          <aside style={styles.side}>
            <p style={styles.sideTitle}>베타 안내</p>
            <p style={styles.sideText}>
              /beta는 초대코드로 진입합니다. 공유할 때는 “코드”와 함께 전달하세요.
            </p>

            <div style={styles.hr} />

            <p style={styles.sideTitle}>다음 작업</p>
            <p style={styles.sideText}>
              1) 베타 결과 포맷 확정<br />
              2) AI 연결(API Route)<br />
              3) 결과 저장/히스토리(옵션)
            </p>

            <div style={styles.hr} />

            <a href="/beta" style={{ ...styles.btn, ...styles.btnPrimary, width: "100%", justifyContent: "center" }}>
              베타로 이동 →
            </a>
          </aside>
        </div>
      </div>

      {/* Simple responsive tweak */}
      <style>{`
        @media (max-width: 920px) {
          .__ignore {}
        }
        @media (max-width: 920px) {
          main > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 520px) {
          h1 {
            font-size: 36px !important;
          }
        }
      `}</style>
    </main>
  );
}
