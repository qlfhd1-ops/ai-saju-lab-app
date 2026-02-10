import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API 요청은 그대로 통과
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // beta 페이지는 허용
  if (pathname === "/beta") {
    return NextResponse.next();
  }

  // 나머지는 beta로 이동
  return NextResponse.redirect(new URL("/beta", request.url));
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
