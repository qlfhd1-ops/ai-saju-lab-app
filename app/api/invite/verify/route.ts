import { NextResponse } from "next/server";

export const runtime = "nodejs"; // (선택) 기본은 nodejs지만 명시해두면 안전

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const code = typeof body?.code === "string" ? body.code.trim() : "";

    const expected = (process.env.INVITE_CODE ?? "").trim();

    // 환경변수가 없으면 서버 설정 문제로 판단
    if (!expected) {
      return NextResponse.json(
        { ok: false, error: "INVITE_CODE is not set" },
        { status: 500 }
      );
    }

    // 코드가 비어있거나 불일치하면 거절
    if (!code || code !== expected) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "server error" },
      { status: 500 }
    );
  }
}

