import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllGrades, addGrade } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const grades = await getAllGrades();
    return NextResponse.json({ grades });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load polymer grades.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const created = await addGrade(body);
    return NextResponse.json({ grade: created, message: `Polymer grade ${created.grade} added successfully.` }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create polymer grade.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
