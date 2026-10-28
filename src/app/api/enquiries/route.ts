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
    !requiredText(body.phone, 40) ||
    !requiredText(body.destinationPort, 120) ||
    !requiredText(body.country, 100) ||
    !requiredText(body.productSlug, 100) ||
    !requiredText(body.grade, 160) ||
    !requiredText(body.volume, 80) ||
    !requiredText(body.packaging, 100) ||
    !(body.notes === undefined || (typeof body.notes === "string" && body.notes.length <= 2000))
  ) {
    return NextResponse.json({ message: "Please provide valid enquiry details." }, { status: 400 });
  }

  try {
    const productSlug = body.productSlug.trim();
    const product = (await getAllProducts()).find((item) => item.slug === productSlug);
    if (!product) {
      return NextResponse.json({ message: "Please select a valid product." }, { status: 400 });
    }

    const { error } = await getSupabaseAdmin().from("enquiries").insert({
      full_name: body.fullName.trim(),
      company_name: body.companyName.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      destination_port: body.destinationPort.trim(),
      country: body.country.trim(),
      product_slug: product.slug,
      product_name: product.name,
      grade: body.grade.trim(),
      volume: body.volume.trim(),
      packaging: body.packaging.trim(),
      notes: typeof body.notes === "string" ? body.notes.trim() : "",
    });
    throwIfDatabaseError(error);

    return NextResponse.json({ message: "Enquiry submitted successfully." }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit enquiry.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
