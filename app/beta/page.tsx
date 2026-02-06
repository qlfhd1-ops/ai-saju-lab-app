"use client";

import { useMemo, useState } from "react";

type TabKey = "today" | "saju" | "match";

type FormState = {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM (optional)
  gender: "male" | "female" | "other";
  location: string;
  notes: string;
};

export default function BetaPage() {
  const [invite, setInvite] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(false);
  const [tab, setTab] = useState<TabKey>("today");

  const [form, setForm] = useState<FormState>({
    name: "",
    birthDate: "",
    birthTime: "",
    gender: "other",
    location: "",
    notes: "",
  });

  const canSubmit = useMemo(() => {
    // 간단 조건 (원하시면 더 촘촘하게)
    return form.birthDate.trim().length >= 8;
  }, [form.birthDate]);

const verifyInvite = async () => {
  setInviteError("");
  setChecking(true);

  try {
    const res = await fetch("/api/invite/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: invite }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data?.ok) {
      setAuthorized(true);
      return;
    }

    setInviteError("초대 코드가 올바르지 않습니다.");
  } catch {
    setInviteError("서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.");
  } finally {
    setChecking(false);
  }
};

  const onSubmit = async () => {
    if (!canSubmit) {
      alert("생년월일을 먼저 입력해주세요.");
      return;
    }
    alert("다음 단계(사주 분석 API 연결)는 내일 이어서 붙이겠습니다 🙂");
  };

  // ===== 스타일(간단) =====
  const styles: Record<string, any> = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      background:
        "radial-gradient(1000px 600px at 50% 20%, rgba(120,80,255,0.25), rgba(0,0,0,0.95))",
      color: "white",
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Noto Sans KR", sans-serif',
    },
    card: {
      width: "min(900px, 100%)",
      borderRadius: 24,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(20,20,30,0.72)",
      backdropFilter: "blur(12px)",
      padding: 24,
      boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
    },
    title: { fontSize: 22, fontWeight: 700, marginBottom: 8 },
    sub: { opacity: 0.8, marginBottom: 18, lineHeight: 1.5 },
    row: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 },
    label: { display: "block", marginBottom: 8, opacity: 0.9 },
    input: {
      width: "100%",
      padding: "12px 14px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(0,0,0,0.25)",
      color: "white",
      outline: "none",
    },
    btn: (primary: boolean) => ({
      padding: "12px 14px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.18)",
      background: primary ? "rgba(120,80,255,0.85)" : "rgba(255,255,255,0.08)",
      color: "white",
      cursor: "pointer",
      minWidth: 120,
      fontWeight: 700,
      opacity: checking ? 0.7 : 1,
    }),
    tabs: { display: "flex", gap: 8, marginTop: 18, flexWrap: "wrap" },
    tab: (active: boolean) => ({
      padding: "10px 12px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.18)",
      background: active ? "rgba(255,255,255,0.14)" : "transparent",
      cursor: "pointer",
      fontWeight: 700,
    }),
    hr: { border: "none", borderTop: "1px solid rgba(255,255,255,0.12)", margin: "18px 0" },
  };

  // ===== 화면 =====
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.title}>AI Saju Lab (Beta)</div>
        <div style={styles.sub}>
          {authorized
            ? "✅ 입장 완료. 이제 사주 입력 → 분석으로 이어집니다."
            : "초대 코드로 먼저 입장해주세요. (코드는 서버에서만 검증됩니다.)"}
        </div>

        {!authorized ? (
          <>
            <label style={styles.label}>초대 코드</label>
            <input
              value={invite}
              onChange={(e) => setInvite(e.target.value)}
              placeholder="초대 코드를 입력하세요"
              style={styles.input}
            />

            <div style={styles.row}>
              <button style={styles.btn(true)} onClick={verifyInvite} disabled={checking}>
                {checking ? "확인 중..." : "입장하기 →"}
              </button>
              <a href="/" style={{ ...styles.btn(false), textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                메인으로
              </a>
            </div>
          </>
        ) : (
          <>
            <div style={styles.tabs}>
              <button style={styles.tab(tab === "today")} onClick={() => setTab("today")}>
                오늘 운세
              </button>
              <button style={styles.tab(tab === "saju")} onClick={() => setTab("saju")}>
                사주
              </button>
              <button style={styles.tab(tab === "match")} onClick={() => setTab("match")}>
                궁합
              </button>
            </div>

            <hr style={styles.hr} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={styles.label}>이름</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="이름"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>성별</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value as FormState["gender"] })}
                  style={styles.input}
                >
                  <option value="other">기타</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </select>
              </div>

              <div>
                <label style={styles.label}>생년월일</label>
                <input
                  value={form.birthDate}
                  onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                  placeholder="YYYY-MM-DD"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>태어난 시간(선택)</label>
                <input
                  value={form.birthTime}
                  onChange={(e) => setForm({ ...form, birthTime: e.target.value })}
                  placeholder="HH:MM"
                  style={styles.input}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={styles.label}>지역/도시(선택)</label>
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="예: Seoul"
                  style={styles.input}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={styles.label}>메모(선택)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="원하는 질문/관심사"
                  style={{ ...styles.input, minHeight: 90 }}
                />
              </div>
            </div>

            <div style={styles.row}>
              <button style={styles.btn(true)} onClick={onSubmit} disabled={!canSubmit}>
                {tab === "match" ? "궁합 보기" : tab === "saju" ? "사주 보기" : "오늘 운세 보기"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
