import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdminEnquiries } from "@/lib/content-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const enquiries = await getAdminEnquiries();
    return NextResponse.json({ enquiries });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load enquiries.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
