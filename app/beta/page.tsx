"use client";

import { useMemo, useState } from "react";

const INVITE_CODE = "AI-SAJU-BETA";

type FormState = {
  name: string;
  birthDate: string;
  birthTime: string;
  gender: "male" | "female" | "other";
  location: string;
  notes: string;
};

const styles = {
  page: {
    minHeight: "100vh",
    color: "#EDEDED",
    background:
      "radial-gradient(1200px 600px at 20% 10%, rgba(120, 90, 255, 0.25), transparent 60%)," +
      "radial-gradient(1000px 600px at 80% 30%, rgba(40, 190, 255, 0.18), transparent 55%)," +
      "linear-gradient(180deg, #07070B 0%, #0B0B12 100%)",
    padding: "48px 20px",
  } as React.CSSProperties,

  shell: {
    maxWidth: 760,
    margin: "0 auto",
  } as React.CSSProperties,

  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 18,
  } as React.CSSProperties,

  brand: {
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    margin: 0,
  } as React.CSSProperties,

  sub: {
    opacity: 0.78,
    marginTop: 8,
    marginBottom: 0,
    lineHeight: 1.6,
  } as React.CSSProperties,

  badge: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.85)",
    whiteSpace: "nowrap",
  } as React.CSSProperties,

  card: {
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
    backdropFilter: "blur(10px)",
  } as React.CSSProperties,

  cardPad: {
    padding: 22,
  } as React.CSSProperties,

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 14,
  } as React.CSSProperties,

  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  } as React.CSSProperties,

  label: {
    fontSize: 13,
    opacity: 0.8,
    marginBottom: 6,
  } as React.CSSProperties,

  input: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(10,10,16,0.35)",
    color: "#fff",
    outline: "none",
  } as React.CSSProperties,

  hint: {
    marginTop: 6,
    fontSize: 12,
    opacity: 0.6,
    lineHeight: 1.4,
  } as React.CSSProperties,

  row: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 14,
  } as React.CSSProperties,

  btn: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  } as React.CSSProperties,

  btnPrimary: {
    background:
      "linear-gradient(135deg, rgba(120,90,255,0.95) 0%, rgba(40,190,255,0.85) 100%)",
    border: "1px solid rgba(255,255,255,0.16)",
  } as React.CSSProperties,

  btnGhost: {
    background: "transparent",
  } as React.CSSProperties,

  divider: {
    height: 1,
    background: "rgba(255,255,255,0.10)",
    margin: "18px 0",
  } as React.CSSProperties,

  resultBox: {
    whiteSpace: "pre-wrap",
    padding: 16,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    lineHeight: 1.65,
  } as React.CSSProperties,

  footerNote: {
    marginTop: 14,
    fontSize: 12,
    opacity: 0.55,
  } as React.CSSProperties,
};

export default function BetaPage() {
  const [invite, setInvite] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    birthDate: "",
    birthTime: "",
    gender: "female",
    location: "",
    notes: "",
  });

  const [result, setResult] = useState<string>("");

  const canSubmit = useMemo(() => {
    return !!(form.name.trim() && form.birthDate.trim());
  }, [form.name, form.birthDate]);

  const onChange = (key: keyof FormState, value: string | FormState["gender"]) => {
    setForm((prev) => ({ ...prev, [key]: value } as FormState));
  };

  const onSubmit = () => {
    const timeText = form.birthTime ? ` / ${form.birthTime}` : "";
    const genderText =
      form.gender === "male" ? "남성" : form.gender === "female" ? "여성" : "기타";

    setResult(
      `✅ 입력 확인\n` +
        `- 이름: ${form.name}\n` +
        `- 생년월일: ${form.birthDate}${timeText}\n` +
        `- 성별: ${genderText}\n` +
        `- 지역: ${form.location || "(미입력)"}\n` +
        `- 메모: ${form.notes || "(미입력)"}\n\n` +
        `🌙 (더미) 오늘의 한 줄 운세:\n` +
        `“기운이 정리될수록 선택이 단순해집니다.”`
    );
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
  };

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      alert("결과를 복사했습니다.");
    } catch {
      alert("복사에 실패했습니다.");
    }
  };

  if (!authorized) {
    return (
      <main style={styles.page}>
        <div style={styles.shell}>
          <div style={styles.header}>
            <div>
              <h1 style={styles.brand}>AI Saju Lab</h1>
              <p style={styles.sub}>초대된 사용자만 접근 가능한 베타 테스트 페이지입니다.</p>
            </div>
            <span style={styles.badge}>BETA ACCESS</span>
          </div>

          <div style={{ ...styles.card, ...styles.cardPad, maxWidth: 520 }}>
            <div style={styles.grid}>
              <div>
                <div style={styles.label}>초대 코드</div>
                <input
                  value={invite}
                  onChange={(e) => setInvite(e.target.value)}
                  placeholder="예: AI-SAJU-BETA"
                  style={styles.input}
                />
                <div style={styles.hint}>코드를 입력하면 베타 폼을 사용할 수 있습니다.</div>
              </div>

              <button
                onClick={() => {
                  if (invite === INVITE_CODE) setAuthorized(true);
                  else alert("초대 코드가 올바르지 않습니다.");
                }}
                style={{ ...styles.btn, ...styles.btnPrimary, width: "100%" }}
              >
                입장하기
              </button>

              <div style={styles.footerNote}>
                * 베타 테스트는 기능/문구가 수시로 변경될 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.brand}>AI Saju Lab · Beta</h1>
            <p style={styles.sub}>
              최소 입력(이름, 생년월일)만으로 테스트 가능합니다. (추후 AI 연결 예정)
            </p>
          </div>
          <button
            onClick={() => setAuthorized(false)}
            style={{ ...styles.btn, ...styles.btnGhost }}
            title="초대코드 화면으로"
          >
            나가기
          </button>
        </div>

        <div style={{ ...styles.card, ...styles.cardPad }}>
          <div style={styles.grid}>
            <div>
              <div style={styles.label}>이름 *</div>
              <input
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
                placeholder="예: 홍길동"
                style={styles.input}
              />
            </div>

            <div style={styles.twoCol}>
              <div>
                <div style={styles.label}>생년월일 *</div>
                <input
                  value={form.birthDate}
                  onChange={(e) => onChange("birthDate", e.target.value)}
                  placeholder="YYYY-MM-DD"
                  style={styles.input}
                />
                <div style={styles.hint}>예: 1990-01-01</div>
              </div>
              <div>
                <div style={styles.label}>태어난 시간 (선택)</div>
                <input
                  value={form.birthTime}
                  onChange={(e) => onChange("birthTime", e.target.value)}
                  placeholder="HH:MM"
                  style={styles.input}
                />
                <div style={styles.hint}>예: 09:30</div>
              </div>
            </div>

            <div style={styles.twoCol}>
              <div>
                <div style={styles.label}>성별</div>
                <select
                  value={form.gender}
                  onChange={(e) => onChange("gender", e.target.value as FormState["gender"])}
                  style={styles.input}
                >
                  <option value="female">여성</option>
                  <option value="male">남성</option>
                  <option value="other">기타</option>
                </select>
              </div>
              <div>
                <div style={styles.label}>지역 (선택)</div>
                <input
                  value={form.location}
                  onChange={(e) => onChange("location", e.target.value)}
                  placeholder="예: 부산 / 서울"
                  style={styles.input}
                />
              </div>
            </div>

            <div>
              <div style={styles.label}>메모 (선택)</div>
              <textarea
                value={form.notes}
                onChange={(e) => onChange("notes", e.target.value)}
                placeholder="예: 요즘 일/관계가 복잡해서 방향이 필요해요."
                rows={4}
                style={styles.input}
              />
            </div>

            <div style={styles.row}>
              <button
                onClick={onSubmit}
                disabled={!canSubmit}
                style={{
                  ...styles.btn,
                  ...styles.btnPrimary,
                  opacity: canSubmit ? 1 : 0.45,
                  cursor: canSubmit ? "pointer" : "not-allowed",
                }}
              >
                운세 생성
              </button>
              <button onClick={onReset} style={styles.btn}>
                초기화
              </button>
              <button onClick={copyResult} style={styles.btn} disabled={!result}>
                결과 복사
              </button>
            </div>

            <div style={styles.divider} />

            {result ? (
              <div style={styles.resultBox}>{result}</div>
            ) : (
              <div style={{ opacity: 0.65, lineHeight: 1.6 }}>
                결과는 여기에 표시됩니다. 먼저 입력 후 <b>운세 생성</b>을 눌러보세요.
              </div>
            )}

            <div style={styles.footerNote}>
              * 개인정보는 현재 저장하지 않는 형태(프론트 단 더미)로 테스트 중입니다.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
