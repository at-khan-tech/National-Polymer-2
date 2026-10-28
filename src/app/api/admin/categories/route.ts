import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { addAdminCategory, getAdminCategories } from "@/lib/content-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    return NextResponse.json({ categories: await getAdminCategories() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load categories.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body) ||
      !("name" in body) ||
      typeof body.name !== "string" ||
      !("type" in body) ||
      (body.type !== "blog" && body.type !== "product")
    ) {
      return NextResponse.json({ message: "A category name and type are required." }, { status: 400 });
    }

    const category = await addAdminCategory(body.name, body.type);
    return NextResponse.json({ message: "Category added successfully.", category }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to add category.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
