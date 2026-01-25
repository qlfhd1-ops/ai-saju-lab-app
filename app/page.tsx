export default function Page() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ maxWidth: 720, width: "100%" }}>
        <h1 style={{ fontSize: 36, margin: 0 }}>AI 사주 랩 (AI Saju Lab.)</h1>
        <p style={{ marginTop: 10, fontSize: 18, opacity: 0.85 }}>
          오늘을 살아가는 당신을 응원합니다.
        </p>

        <div style={{ marginTop: 24, padding: 16, border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12 }}>
          <p style={{ margin: 0, lineHeight: 1.7, opacity: 0.9 }}>
            <b>팁</b> : 사주(四柱)란 사람이 태어난 연(年), 월(月), 일(日), 시(時)의 네 가지 기둥을 현실과 함께 해석하는 도구입니다.
            좋은 기운일 때는 거만하지 않고 기운을 받을 그릇을 크게 키우고, 나쁜 기운일 때는 위험을 대비해 더욱 조심하여
            위기를 기회로 만드는 시간을 가져야 합니다. 노력과 행동이 운을 만듭니다.
          </p>
        </div>

        <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
          <label style={{ display: "grid", gap: 6 }}>
            Birth date (YYYY-MM-DD)
            <input
              placeholder="1990-01-01"
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent",
                color: "inherit",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            Gender
            <select
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent",
                color: "inherit",
              }}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </label>

          <button style={{ padding: 12, borderRadius: 10, border: 0, cursor: "pointer" }}>
            Get Today&apos;s Fortune
          </button>

          <p style={{ marginTop: 6, opacity: 0.7 }}>
            입력된 정보는 해석이 끝나면 별이 되어 우주로 사라집니다.
          </p>
        </div>
      </div>
    </main>
  );
}
