import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { addAdminOrder, getAdminOrders } from "@/lib/content-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    return NextResponse.json({ orders: await getAdminOrders() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load orders.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ message: "Invalid order details." }, { status: 400 });
    }
    if (
      !("customer" in body) || typeof body.customer !== "string" ||
      !("email" in body) || typeof body.email !== "string" ||
      !("product" in body) || typeof body.product !== "string" ||
      !("quantity" in body) || typeof body.quantity !== "number" ||
      !("total" in body) || typeof body.total !== "number"
    ) {
      return NextResponse.json({ message: "Customer, email, product, quantity, and total are required." }, { status: 400 });
    }

    const order = await addAdminOrder({
      customer: body.customer,
      email: body.email,
      product: body.product,
      quantity: body.quantity,
      total: body.total,
    });
    return NextResponse.json({ message: "Order created successfully.", order }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create order.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
