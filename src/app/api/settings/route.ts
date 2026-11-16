import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load settings.";
    return NextResponse.json({ message, settings: { blogsEnabled: false } }, { status: 500 });
  }
}
