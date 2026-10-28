import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { updateAdminOrderStatus, type OrderStatus } from "@/lib/content-store";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body) || !("status" in body) || typeof body.status !== "string") {
      return NextResponse.json({ message: "A valid order status is required." }, { status: 400 });
    }
    const { id } = await params;
    const order = await updateAdminOrderStatus(id, body.status as OrderStatus);
    return NextResponse.json({ message: "Order status updated.", order });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update order.";
    return NextResponse.json({ message }, { status: message === "Order not found." ? 404 : 400 });
  }
}
