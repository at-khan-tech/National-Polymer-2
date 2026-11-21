import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllExhibitions, createExhibition } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const exhibitions = await getAllExhibitions();
    return NextResponse.json({ ok: true, exhibitions });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load exhibitions.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, year, location, category, description, imageUrl, standNumber, featured } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { message: "Event title and photograph image are required." },
        { status: 400 }
      );
    }

    const created = await createExhibition({
      title: title.trim(),
      year: (year || new Date().getFullYear().toString()).trim(),
      location: (location || "International").trim(),
      category: (category || "Industry Exhibition").trim(),
      description: (description || "").trim(),
      imageUrl: imageUrl.trim(),
      standNumber: standNumber?.trim() || undefined,
      featured: Boolean(featured),
    });

    return NextResponse.json({ ok: true, exhibition: created });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create exhibition entry.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
