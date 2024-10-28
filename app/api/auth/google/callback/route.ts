// app/api/auth/google/callback/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const error = url.searchParams.get("error");
  if (error) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  const code = url.searchParams.get("code");
  // const state = url.searchParams.get("state"); // CSRF 방지를 위한 state 파라미터 (추가 권장)

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code not provided" },
      { status: 400 }
    );
  }

  try {
    // 서버로 코드 전달
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/auth/google/signin?code=${code}&redirectUri=${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/google/callback`,
      { method: "GET" }
    );
    const data = await response.json();
    console.log(response.status, data);
    if (response.status === 200) {
      // 인증 성공 시 로그인화면으로 토큰 반환
      return NextResponse.redirect(
        new URL("/sign-in?result=success&token=" + data.jwtToken, request.url)
      );
    } else if (response.status === 201) {
      // 회원가입 필요
      return NextResponse.redirect(
        new URL("/sign-in?result=new&token=" + data.refreshToken, request.url)
      );
    } else {
      return NextResponse.redirect(
        new URL("/sign-in?error=auth_failed", request.url)
      );
    }
  } catch (error) {
    console.error("Error during Google OAuth callback:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
