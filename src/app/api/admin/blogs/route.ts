import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdminBlogs } from "@/lib/content-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    return NextResponse.json({ blogs: await getAdminBlogs() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load blog posts.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
