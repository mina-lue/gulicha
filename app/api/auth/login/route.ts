import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();
  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
  });

  return res;
}
