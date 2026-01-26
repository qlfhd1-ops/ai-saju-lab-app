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

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.10)",
  color: "#fff",
  cursor: "pointer",
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

  if (!authorized) {
    return (
      <main style={{ minHeight: "100vh", padding: 40, color: "#fff" }}>
        <h1 style={{ fontSize: 36, marginBottom: 12 }}>AI Saju Lab · Beta</h1>
        <p style={{ opacity: 0.75, marginBottom: 24 }}>
          이 페이지는 초대된 사용자만 접근 가능합니다.
        </p>

        <div
          style={{
            maxWidth: 420,
            padding: 20,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <label style={{ display: "block", marginBottom: 12 }}>
            <div style={{ marginBottom: 6 }}>초대 코드</div>
            <input
              value={invite}
              onChange={(e) => setInvite(e.target.value)}
              placeholder="초대 코드를 입력하세요"
              style={inputStyle}
            />
          </label>

          <button
            onClick={() => {
              if (invite === INVITE_CODE) setAuthorized(true);
              else alert("초대 코드가 올바르지 않습니다.");
            }}
            style={{ ...buttonStyle, width: "100%" }}
          >
            입장하기
          </button>
        </div>
      </main>
    );
  }

  // ✅ authorized = true 화면
  return (
    <main style={{ minHeight: "100vh", padding: 40, color: "#fff", maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>AI 사주 랩 (Beta)</h1>

      <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
        <input
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="이름"
          style={inputStyle}
        />
        <input
          value={form.birthDate}
          onChange={(e) => onChange("birthDate", e.target.value)}
          placeholder="생년월일 (YYYY-MM-DD)"
          style={inputStyle}
        />
        <input
          value={form.birthTime}
          onChange={(e) => onChange("birthTime", e.target.value)}
          placeholder="태어난 시간 (HH:MM) (선택)"
          style={inputStyle}
        />
        <select
          value={form.gender}
          onChange={(e) => onChange("gender", e.target.value as FormState["gender"])}
          style={inputStyle}
        >
          <option value="female">여성</option>
          <option value="male">남성</option>
          <option value="other">기타</option>
        </select>
        <input
          value={form.location}
          onChange={(e) => onChange("location", e.target.value)}
          placeholder="지역 (선택)"
          style={inputStyle}
        />
        <textarea
          value={form.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          placeholder="메모 (선택)"
          rows={4}
          style={inputStyle}
        />
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <button onClick={onSubmit} disabled={!canSubmit} style={{ ...buttonStyle, opacity: canSubmit ? 1 : 0.5 }}>
          운세 생성
        </button>
        <button onClick={onReset} style={buttonStyle}>
          초기화
        </button>
      </div>

      {result && (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            padding: 16,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          {result}
        </pre>
      )}
    </main>
  );
}
