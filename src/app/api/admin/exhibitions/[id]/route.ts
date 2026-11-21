import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { updateExhibition, deleteExhibition } from "@/lib/content-store";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteProps) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updateExhibition(id, body);
    if (!updated) {
      return NextResponse.json({ message: "Exhibition entry not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, exhibition: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update exhibition.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const success = await deleteExhibition(id);
    if (!success) {
      return NextResponse.json({ message: "Exhibition entry not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, message: "Exhibition entry deleted successfully." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete exhibition.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
