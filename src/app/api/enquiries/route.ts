import { NextResponse } from "next/server";

import { getAllProducts } from "@/lib/content-store";
import { getSupabaseAdmin, throwIfDatabaseError } from "@/lib/supabase";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredText(value: unknown, maximumLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= maximumLength;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid enquiry details." }, { status: 400 });
  }

  if (
    !isRecord(body) ||
    !requiredText(body.fullName, 120) ||
    !requiredText(body.companyName, 160) ||
    !requiredText(body.email, 254) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email).trim()) ||
    !requiredText(body.phone, 40)
  ) {
    return NextResponse.json({ message: "Please provide valid contact details (Name, Company, Email, Phone)." }, { status: 400 });
  }

  try {
    const rawSlug = typeof body.productSlug === "string" ? body.productSlug.trim() : "";
    const allProducts = await getAllProducts();
    const product = allProducts.find((item) => item.slug === rawSlug);

    const productSlug = product ? product.slug : "general-inquiry";
    const productName = product ? product.name : "General Commercial Inquiry";

    const destinationPort =
      typeof body.destinationPort === "string" && body.destinationPort.trim()
        ? body.destinationPort.trim()
        : "Dubai Trading Desk / Direct";

    const country =
      typeof body.country === "string" && body.country.trim()
        ? body.country.trim()
        : "UAE / International";

    const grade =
      typeof body.grade === "string" && body.grade.trim()
        ? body.grade.trim()
        : "Standard Grade / Inquire";

    const volume =
      typeof body.volume === "string" && body.volume.trim()
        ? body.volume.trim()
        : "Direct Consultation";

    const packaging =
      typeof body.packaging === "string" && body.packaging.trim()
        ? body.packaging.trim()
        : "Standard Export Bags / Bulk";

    const notes = typeof body.notes === "string" ? body.notes.trim() : "";

    const { error } = await getSupabaseAdmin().from("enquiries").insert({
      full_name: body.fullName.trim(),
      company_name: body.companyName.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      destination_port: destinationPort,
      country: country,
      product_slug: productSlug,
      product_name: productName,
      grade: grade,
      volume: volume,
      packaging: packaging,
      notes: notes,
      status: "new",
    });
    throwIfDatabaseError(error);

    return NextResponse.json({ message: "Enquiry submitted successfully." }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit enquiry.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
