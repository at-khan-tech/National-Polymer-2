import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteProduct, updateProduct } from "@/lib/content-store";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function PATCH(request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    if (
      !body || typeof body !== "object" || Array.isArray(body) ||
      !("name" in body) || typeof body.name !== "string" ||
      !("category" in body) || typeof body.category !== "string" ||
      !("tagline" in body) || typeof body.tagline !== "string" ||
      !("description" in body) || typeof body.description !== "string" ||
      !("imageUrl" in body) || typeof body.imageUrl !== "string"
    ) {
      return NextResponse.json({ message: "Valid product details are required." }, { status: 400 });
    }

    const { slug } = await params;
    const product = await updateProduct(slug, {
      name: body.name,
      category: body.category,
      tagline: body.tagline,
      description: body.description,
      imageUrl: body.imageUrl,
    });
    return NextResponse.json({ message: "Product updated successfully.", product });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update product.";
    return NextResponse.json({ message }, { status: message === "Product not found." ? 404 : 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const { slug } = await params;
    await deleteProduct(slug);
    return NextResponse.json({ message: "Product deleted successfully." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete product.";
    return NextResponse.json({ message }, { status: message === "Product not found." ? 404 : 500 });
  }
}
