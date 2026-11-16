import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  deleteAdminEnquiry,
  updateAdminEnquiryStatus,
  type EnquiryStatus,
} from "@/lib/content-store";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body) ||
      !("status" in body) ||
      typeof body.status !== "string"
    ) {
      return NextResponse.json({ message: "A valid enquiry status is required." }, { status: 400 });
    }

    const { id } = await params;
    const enquiry = await updateAdminEnquiryStatus(id, body.status as EnquiryStatus);
    return NextResponse.json({ message: "Enquiry status updated.", enquiry });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update enquiry.";
    return NextResponse.json({ message }, { status: message === "Enquiry not found." ? 404 : 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteAdminEnquiry(id);
    return NextResponse.json({ message: "Enquiry deleted successfully." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete enquiry.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
