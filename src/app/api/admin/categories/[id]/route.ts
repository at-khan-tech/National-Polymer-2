import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteAdminCategory, updateAdminCategory } from "@/lib/content-store";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body) || !("name" in body) || typeof body.name !== "string") {
      return NextResponse.json({ message: "A category name is required." }, { status: 400 });
    }

    const { id } = await params;
    const category = await updateAdminCategory(id, body.name);
    return NextResponse.json({ message: "Category updated successfully.", category });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update category.";
    return NextResponse.json({ message }, { status: message === "Category not found." ? 404 : 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteAdminCategory(id);
    return NextResponse.json({ message: "Category deleted successfully." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete category.";
    return NextResponse.json({ message }, { status: message === "Category not found." ? 404 : 400 });
  }
}
