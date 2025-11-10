// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (email === "admin@gulicha.com" && password === "Pw321@G") {
    return NextResponse.json({ token: "gulicha-jwt-token" });
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
