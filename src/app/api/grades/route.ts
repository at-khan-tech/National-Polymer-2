import { NextResponse } from "next/server";
import { getAllGrades } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const grades = await getAllGrades();
    return NextResponse.json({ grades });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load polymer grades.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
