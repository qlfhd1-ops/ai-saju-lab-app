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

  const [tab, setTab] = useState<TabKey>("today");

  const [form, setForm] = useState<FormState>({
    name: "",
    birthDate: "",
    birthTime: "",
    gender: "female",
    location: "",
    notes: "",
  });

  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const canSubmit = useMemo(() => {
    return Boolean(form.name.trim() && form.birthDate.trim());
  }, [form.name, form.birthDate]);

  const genderText =
    form.gender === "male" ? "남성" : form.gender === "female" ? "여성" : "기타";

  const onChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const buildDummy = () => {
    const timeText = form.birthTime ? ` / ${form.birthTime}` : "";
    const base =
      `✅ 입력 확인\n` +
      `- 이름: ${form.name}\n` +
      `- 생년월일: ${form.birthDate}${timeText}\n` +
      `- 성별: ${genderText}\n` +
      `- 지역: ${form.location || "(미입력)"}\n` +
      `- 메모: ${form.notes || "(미입력)"}\n\n`;

    if (tab === "today") {
      return (
        base +
        `🌙 오늘의 한 줄 운세(더미)\n` +
        `“기운이 정리될수록 선택이 단순해집니다.”\n\n` +
        `- 오늘 포인트: 불필요한 약속/할 일을 1개만 줄여보세요.\n`
      );
    }
    if (tab === "saju") {
      return (
        base +
        `🧭 사주 해석(더미)\n` +
        `- 성향: ‘정리-실행’ 쪽이 강합니다.\n` +
        `- 주의: 결정을 늦추면 피로가 누적됩니다.\n` +
        `- 추천: 오늘은 “작게 시작 → 바로 마감” 루틴이 좋습니다.\n`
      );
    }
    return (
      base +
      `💞 궁합(베타·더미)\n` +
      `- 현재는 ‘궁합 입력 폼’ 준비 중입니다.\n` +
      `- 다음 단계에서 상대 정보 입력/결과 포맷을 붙입니다.\n`
    );
  };

  const onSubmit = () => {
    setCopied(false);
    setResult(buildDummy());
  };

  const onReset = () => {
    setForm({
      name: "",
      birthDate: "",
      birthTime: "",
      gender: "female",
      location: "",
      notes: "",
    });
    setResult("");
    setCopied(false);
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      alert("복사에 실패했어요. 브라우저 권한을 확인해 주세요.");
    }
  };

  // ---------- styles ----------
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
    top: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      marginBottom: 18,
      flexWrap: "wrap" as const,
    },
    brand: { margin: 0, fontSize: 18, fontWeight: 900, letterSpacing: "-0.02em" },
    badge: {
      fontSize: 12,
      padding: "6px 10px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.14)",
      background: "rgba(255,255,255,0.06)",
      opacity: 0.9,
    },
    layout: {
      display: "grid",
      gridTemplateColumns: "1fr 0.9fr",
      gap: 14,
      alignItems: "start",
    },
    card: {
      borderRadius: 22,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.05)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
      backdropFilter: "blur(10px)",
    },
    pad: { padding: 22 },
    title: { margin: 0, fontSize: 34, fontWeight: 900, letterSpacing: "-0.03em" },
    sub: { marginTop: 10, marginBottom: 0, opacity: 0.78, lineHeight: 1.7, fontSize: 14 },
    tabs: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap" as const,
      marginTop: 16,
    },
    tab: (active: boolean) => ({
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.14)",
      background: active
        ? "linear-gradient(135deg, rgba(120,90,255,0.95) 0%, rgba(40,190,255,0.85) 100%)"
        : "rgba(255,255,255,0.06)",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 800,
    }),
    grid2: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginTop: 14,
    },
    label: { display: "block", fontSize: 12, opacity: 0.8, marginBottom: 6 },
    input: {
      width: "100%",
      padding: "12px 12px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.14)",
      background: "rgba(255,255,255,0.04)",
      color: "#fff",
      outline: "none",
    } as const,
    select: {
      width: "100%",
      padding: "12px 12px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.14)",
      background: "rgba(255,255,255,0.04)",
      color: "#fff",
      outline: "none",
    } as const,
    textarea: {
      width: "100%",
      padding: "12px 12px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.14)",
      background: "rgba(255,255,255,0.04)",
      color: "#fff",
      outline: "none",
      minHeight: 96,
      resize: "vertical" as const,
    },
    row: { display: "flex", gap: 10, flexWrap: "wrap" as const, marginTop: 12 },
    btn: (primary?: boolean) => ({
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.14)",
      background: primary
        ? "linear-gradient(135deg, rgba(120,90,255,0.95) 0%, rgba(40,190,255,0.85) 100%)"
        : "rgba(255,255,255,0.06)",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 800,
      opacity: primary ? 1 : 0.95,
    }),
    hint: { marginTop: 10, opacity: 0.62, fontSize: 12, lineHeight: 1.6 },
    resultBox: {
      whiteSpace: "pre-wrap" as const,
      lineHeight: 1.65,
      fontSize: 13,
      opacity: 0.92,
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(0,0,0,0.25)",
      padding: 16,
      minHeight: 200,
    },
    rightTitle: { margin: 0, fontSize: 16, fontWeight: 900, opacity: 0.95 },
    mini: { marginTop: 10, opacity: 0.72, fontSize: 12, lineHeight: 1.7 },
  };

  // ---------- invite gate ----------
  if (!authorized) {
    return (
      <main style={styles.page}>
        <div style={styles.shell}>
          <div style={styles.top}>
            <p style={styles.brand}>AI Saju Lab</p>
            <span style={styles.badge}>Beta Gate</span>
          </div>

          <section style={{ ...styles.card, ...styles.pad, maxWidth: 520 }}>
            <h1 style={{ ...styles.title, fontSize: 30 }}>초대 코드로 입장</h1>
            <p style={styles.sub}>이 페이지는 초대된 사용자만 접근 가능합니다.</p>

            <div style={{ marginTop: 16 }}>
              <label style={styles.label}>초대 코드</label>
              <input
                value={invite}
                onChange={(e) => setInvite(e.target.value)}
                placeholder={INVITE_CODE}
                style={styles.input}
              />
            </div>

            <div style={styles.row}>
              <button
                style={styles.btn(true)}
                onClick={() => {
                  if (invite.trim() === INVITE_CODE) setAuthorized(true);
                  else alert("초대 코드가 올바르지 않습니다.");
                }}
              >
                입장하기 →
              </button>
              <a
                href="/"
                style={{
                  ...styles.btn(false),
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                메인으로
              </a>
            </div>

            <p style={styles.hint}>
              * 초대 코드는 테스트용입니다. (.env.local의 NEXT_PUBLIC_INVITE_CODE로 바꿀 수 있어요)
            </p>
          </section>
        </div>
      </main>
    );
  }

  // ---------- main beta ----------
  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.top}>
          <p style={styles.brand}>AI Saju Lab</p>
          <span style={styles.badge}>Beta</span>
        </div>

        <section style={{ ...styles.card, ...styles.pad, marginBottom: 14 }}>
          <h1 style={styles.title}>AI Saju Lab · Beta</h1>
          <p style={styles.sub}>
            탭별 결과 톤/길이/구조를 테스트합니다. (지금은 더미 결과 → 다음 단계에서 AI 연결)
          </p>

          <div style={styles.tabs}>
            <button style={styles.tab(tab === "today")} onClick={() => setTab("today")}>
              오늘의 운세
            </button>
            <button style={styles.tab(tab === "saju")} onClick={() => setTab("saju")}>
              사주 해석
            </button>
            <button style={styles.tab(tab === "match")} onClick={() => setTab("match")}>
              궁합(베타)
            </button>
          </div>
        </section>

        <div style={styles.layout}>
          {/* Left: Form */}
          <section style={{ ...styles.card, ...styles.pad }}>
            <p style={styles.rightTitle}>입력</p>
            <p style={styles.mini}>최소 조건: 이름 + 생년월일</p>

            <div style={{ marginTop: 12 }}>
              <label style={styles.label}>이름</label>
              <input
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
                placeholder="예) 홍길동"
                style={styles.input}
              />
            </div>

            <div style={styles.grid2}>
              <div>
                <label style={styles.label}>생년월일 (YYYY-MM-DD)</label>
                <input
                  value={form.birthDate}
                  onChange={(e) => onChange("birthDate", e.target.value)}
                  placeholder="1990-01-01"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>태어난 시간 (HH:MM, 선택)</label>
                <input
                  value={form.birthTime}
                  onChange={(e) => onChange("birthTime", e.target.value)}
                  placeholder="09:30"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.grid2}>
              <div>
                <label style={styles.label}>성별</label>
                <select
                  value={form.gender}
                  onChange={(e) => onChange("gender", e.target.value)}
                  style={styles.select}
                >
                  <option value="female">여성</option>
                  <option value="male">남성</option>
                  <option value="other">기타</option>
                </select>
              </div>
              <div>
                <label style={styles.label}>지역 (선택)</label>
                <input
                  value={form.location}
                  onChange={(e) => onChange("location", e.target.value)}
                  placeholder="예) 부산"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <label style={styles.label}>메모 (선택)</label>
              <textarea
                value={form.notes}
                onChange={(e) => onChange("notes", e.target.value)}
                placeholder="예) 오늘 중요한 결정을 앞두고 있어요"
                style={styles.textarea}
              />
            </div>

            <div style={styles.row}>
              <button
                style={{
                  ...styles.btn(true),
                  opacity: canSubmit ? 1 : 0.5,
                  cursor: canSubmit ? "pointer" : "not-allowed",
                }}
                onClick={() => canSubmit && onSubmit()}
                disabled={!canSubmit}
              >
                결과 생성
              </button>
              <button style={styles.btn(false)} onClick={onReset}>
                초기화
              </button>
              <a
                href="/"
                style={{
                  ...styles.btn(false),
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                메인
              </a>
            </div>

            <p style={styles.hint}>
              * 다음 단계: 이 버튼을 API 호출로 바꾸고, 결과를 “카드형 섹션(요약/조언/주의)”으로 구조화합니다.
            </p>
          </section>

          {/* Right: Result */}
          <section style={{ ...styles.card, ...styles.pad }}>
            <p style={styles.rightTitle}>결과</p>
            <p style={styles.mini}>
              {tab === "today" && "오늘의 한 줄 톤/길이 테스트"}
              {tab === "saju" && "사주 해석 포맷 테스트"}
              {tab === "match" && "궁합 화면 준비(현재는 더미)"}
            </p>

            <div style={{ marginTop: 12, ...styles.resultBox }}>
              {result ? result : "아직 결과가 없습니다. 왼쪽에서 입력 후 ‘결과 생성’을 눌러 주세요."}
            </div>

            <div style={styles.row}>
              <button
                style={{
                  ...styles.btn(false),
                  opacity: result ? 1 : 0.5,
                  cursor: result ? "pointer" : "not-allowed",
                }}
                onClick={() => result && onCopy()}
                disabled={!result}
              >
                {copied ? "복사됨 ✓" : "결과 복사"}
              </button>
              <button
                style={styles.btn(false)}
                onClick={() => {
                  setAuthorized(false);
                  setInvite("");
                  setResult("");
                }}
              >
                로그아웃(게이트)
              </button>
            </div>

            <p style={styles.hint}>
              * 복사는 클립보드 권한이 필요할 수 있어요. 안 되면 브라우저 설정 확인.
            </p>
          </section>
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) {
          main > div > div:nth-child(3) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
