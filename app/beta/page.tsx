"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  gender: "male" | "female" | "other";
  location: string;
  notes: string;
};

export default function BetaPage() {
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
    return form.name.trim() && form.birthDate.trim(); // 최소 조건: 이름 + 생년월일
  }, [form.name, form.birthDate]);

  const onChange = (
    key: keyof FormState,
    value: string | FormState["gender"]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value } as FormState));
  };

  const onSubmit = () => {
    // ✅ 지금은 더미 결과 (다음 단계에서 AI 연결)
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

  return (
    <main style={{ minHeight: "100vh", padding: 40, color: "#fff" }}>
      <h1 style={{ fontSize: 40, marginBottom: 8 }}>AI Saju Lab · Beta</h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>
        베타 입력 폼(테스트). 결과는 아직 더미이며, 다음 단계에서 AI를 연결합니다.
      </p>

      <div
        style={{
          maxWidth: 720,
          padding: 20,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* 이름 */}
        <label style={{ display: "block", marginBottom: 14 }}>
          <div style={{ marginBottom: 6, opacity: 0.9 }}>이름 *</div>
          <input
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="예: 홍길동"
            style={inputStyle}
          />
        </label>

        {/* 생년월일 / 태어난 시간 */}
        <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
          <label style={{ flex: 1 }}>
            <div style={{ marginBottom: 6, opacity: 0.9 }}>생년월일 *</div>
            <input
              value={form.birthDate}
              onChange={(e) => onChange("birthDate", e.target.value)}
              placeholder="YYYY-MM-DD"
              style={inputStyle}
            />
          </label>
          <label style={{ flex: 1 }}>
            <div style={{ marginBottom: 6, opacity: 0.9 }}>태어난 시간(선택)</div>
            <input
              value={form.birthTime}
              onChange={(e) => onChange("birthTime", e.target.value)}
              placeholder="HH:MM"
              style={inputStyle}
            />
          </label>
        </div>

        {/* 성별 */}
        <label style={{ display: "block", marginBottom: 14 }}>
          <div style={{ marginBottom: 6, opacity: 0.9 }}>성별</div>
          <select
            value={form.gender}
            onChange={(e) => onChange("gender", e.target.value as any)}
            style={inputStyle}
          >
            <option value="female">여성</option>
            <option value="male">남성</option>
            <option value="other">기타</option>
          </select>
        </label>

        {/* 지역 */}
        <label style={{ display: "block", marginBottom: 14 }}>
          <div style={{ marginBottom: 6, opacity: 0.9 }}>지역(선택)</div>
          <input
            value={form.location}
            onChange={(e) => onChange("location", e.target.value)}
            placeholder="예: 부산 / 서울 / 창원"
            style={inputStyle}
          />
        </label>

        {/* 메모 */}
        <label style={{ display: "block", marginBottom: 18 }}>
          <div style={{ marginBottom: 6, opacity: 0.9 }}>메모(선택)</div>
          <textarea
            value={form.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="예: 요즘 고민/목표, 알고 싶은 질문 등"
            style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
          />
        </label>

        {/* 버튼 */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            style={{
              ...buttonStyle,
              opacity: canSubmit ? 1 : 0.45,
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
          >
            결과 보기
          </button>
          <button onClick={onReset} style={{ ...buttonStyle, opacity: 0.8 }}>
            초기화
          </button>
        </div>
      </div>

      {/* 결과 */}
      {result && (
        <pre
          style={{
            maxWidth: 720,
            marginTop: 18,
            padding: 18,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(0,0,0,0.35)",
            whiteSpace: "pre-wrap",
            lineHeight: 1.55,
          }}
        >
          {result}
        </pre>
      )}
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
};
