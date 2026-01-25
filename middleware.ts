import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // 베타입장 페이지는 통과
  if (url.pathname.startsWith("/beta")) return NextResponse.next();

  // 쿠키에 beta_ok 있으면 통과
  const ok = req.cookies.get("beta_ok")?.value === "1";
  if (ok) return NextResponse.next();

  // 그 외는 /beta로 보내기
  url.pathname = "/beta";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|public).*)"],
};

