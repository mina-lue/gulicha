import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { cookies } from "next/headers";

export async function GET() {
  const snap = await getDocs(collection(db, "listings"));
  const listings = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return NextResponse.json({ listings });
}

export async function POST(req: Request) {
  const token = (await cookies()).get("admin-token")?.value;
  if (token !== process.env.ADMIN_TOKEN)
    return NextResponse.json({ ok: false }, { status: 401 });

  const body = await req.json();
  await addDoc(collection(db, "listings"), {
    ...body,
    createdAt: serverTimestamp(),
  });

  return NextResponse.json({ ok: true });
}
