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
    return form.name.trim() && form.birthDate.trim();
  }, [form.name, form.birthDate]);

  // 이하 기존 코드 그대로


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

  if (!authorized) {
  return (
    <main style={{ minHeight: "100vh", padding: 40, color: "#fff" }}>
      <h1 style={{ fontSize: 36, marginBottom: 12 }}>
        AI Saju Lab · Beta
      </h1>
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
            if (invite === INVITE_CODE) {
              setAuthorized(true);
            } else {
              alert("초대 코드가 올바르지 않습니다.");
            }
          }}
          style={{ ...buttonStyle, width: "100%" }}
        >
          입장하기
        </button>
      </div>
    </main>
  );
}
