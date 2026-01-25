"use client";
import { useMemo, useState } from "react";

function sixLineFortune(date: string, gender: string) {
  // ✅ 임시 엔진(규칙 기반): 나중에 AI로 교체하면 됨
  const d = new Date(date);
  const seed = isNaN(d.getTime()) ? 7 : (d.getFullYear() + d.getMonth() + d.getDate());
  const zodiacs = ["쥐","소","호랑이","토끼","용","뱀","말","양","원숭이","닭","개","돼지"];
  const zodiac = zodiacs[(seed % 12 + 12) % 12];
  const topicsByAge = [
    "관계의 온도 조절", "업무 리듬", "돈의 흐름", "건강 루틴", "배움/성장", "가정의 균형"
  ];
  const focus = topicsByAge[(seed % topicsByAge.length)];
  const star = ["물병자리","물고기자리","양자리","황소자리","쌍둥이자리","게자리","사자자리","처녀자리","천칭자리","전갈자리","사수자리","염소자리"][(seed % 12 + 12) % 12];
  const n = (seed * 1103515245 + 12345) >>> 0;
  const tone = n % 3;

  const shinnaerim = tone === 0
    ? "신내림 AI 한마디: 오늘은 ‘한 번 더 확인’이 복을 부릅니다."
    : tone === 1
    ? "신내림 AI 한마디: 서두르지 말고, 한 호흡 느리게 가세요."
    : "신내림 AI 한마디: 작은 친절이 크게 돌아옵니다.";

  return [
    `오늘의 중심 키워드: ${focus}`,
    `띠 운세: ${zodiac}띠 기운이 ‘정리’에 유리합니다.`,
    `별자리 운세: ${star}는 ‘선택과 집중’이 운을 만듭니다.`,
    `성별(${gender}) 흐름: 감정의 파도를 읽으면 판단이 선명해집니다.`,
    `오늘의 행동 팁: 1가지만 끝까지 마무리하세요.`,
    shinnaerim,
  ];
}

export default function Page() {
  const [birth, setBirth] = useState("1990-01-01");
  const [gender, setGender] = useState("Female");
  const [result, setResult] = useState<string[] | null>(null);

  const lines = useMemo(() => sixLineFortune(birth, gender), [birth, gender]);

  return (
    <main className="cosmicWrap">
      <section className="card">
        <h1 className="h1">AI 사주 랩 (AI Saju Lab.)</h1>
        <p className="sub">오늘을 살아가는 당신을 응원합니다.</p>

        <div className="pill">
          <b>팁</b> : 사주(四柱)란 사람이 태어난 연(年), 월(月), 일(日), 시(時)의 네 가지 기둥을
          현실과 함께 해석하는 도구입니다. 좋은 기운일 때는 거만하지 않고 기운을 받을 그릇을
          크게 키우고, 나쁜 기운일 때는 위험을 대비해 더욱 조심하여 위기를 기회로 만드는 시간을
          가져야 합니다. 노력과 행동이 운을 만듭니다.
        </div>

        <div className="grid">
          <label className="label">
            Birth date (YYYY-MM-DD)
            <input className="input" value={birth} onChange={(e) => setBirth(e.target.value)} />
          </label>

          <label className="label">
            Gender
            <select className="select" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option>Male</option>
              <option>Female</option>
            </select>
          </label>

          <button className="btn" onClick={() => setResult(lines)}>
            Get Today&apos;s Fortune
          </button>

          <p className="small">입력된 정보는 해석이 끝나면 별이 되어 우주로 사라집니다.</p>

          {result && (
            <div className="pill">
              {result.map((t, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  {t}
                </div>
              ))}
              <div className="small" style={{ marginTop: 10 }}>
                다음: 2026년 운세는 “미리보기 60%” 후 Invite/결제 단계로 연결합니다.
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
