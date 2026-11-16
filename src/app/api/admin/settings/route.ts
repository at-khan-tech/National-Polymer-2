import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSiteSettings, updateSiteSettings } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load settings.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ message: "Invalid settings payload." }, { status: 400 });
    }

    const payload = body as Record<string, unknown>;
    const partialSettings: Record<string, boolean> = {};

    if ("blogsEnabled" in payload && typeof payload.blogsEnabled === "boolean") {
      partialSettings.blogsEnabled = payload.blogsEnabled;
    }

    const updated = await updateSiteSettings(partialSettings);
    const message =
      typeof partialSettings.blogsEnabled === "boolean"
        ? `Blog module has been ${partialSettings.blogsEnabled ? "enabled and is now visible" : "disabled and hidden from website"}.`
        : "Settings updated successfully.";

    return NextResponse.json({ message, settings: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update settings.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
