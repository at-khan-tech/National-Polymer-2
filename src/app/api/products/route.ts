import { NextResponse } from "next/server";

import { addProduct, getAllProducts } from "@/lib/content-store";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ products });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load products.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
    }

    const product = await addProduct({
      name: body.name,
      category: body.category,
      tagline: body.tagline,
      description: body.description,
      imageUrl: body.imageUrl,
    });

    return NextResponse.json({
      message: "Product added successfully.",
      product,
    }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to add product.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
