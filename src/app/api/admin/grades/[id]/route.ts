import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { updateGrade, deleteGrade } from "@/lib/content-store";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteProps) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateGrade(id, body);
    return NextResponse.json({ grade: updated, message: `Grade ${updated.grade} updated successfully.` });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update grade.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteGrade(id);
    return NextResponse.json({ message: "Polymer grade deleted successfully." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete grade.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
