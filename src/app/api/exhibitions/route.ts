import { NextResponse } from "next/server";
import { getAllExhibitions } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const exhibitions = await getAllExhibitions();
    return NextResponse.json({ ok: true, exhibitions });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load exhibitions.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
