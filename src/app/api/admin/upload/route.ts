import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// 5 MB maximum file size
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ message: "No image file provided." }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          message: `Unsupported file type (${file.type}). Please upload a JPG, PNG, WEBP, or SVG image.`,
        },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return NextResponse.json(
        {
          message: `File size (${sizeMB} MB) exceeds the 5 MB limit. Please compress or resize your image before uploading.`,
        },
        { status: 400 },
      );
    }

    const folderParam = formData.get("folder");
    const folder = typeof folderParam === "string" && folderParam.trim()
      ? folderParam.trim().replace(/[^a-z0-9_-]/gi, "").toLowerCase()
      : "general";

    const originalName = file.name || "image.webp";
    const extension = originalName.includes(".")
      ? originalName.split(".").pop()?.toLowerCase() || "webp"
      : "webp";

    const sanitizedBase = originalName
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-z0-9_-]/gi, "-")
      .slice(0, 30)
      .toLowerCase();

    const uniquePath = `${folder}/${Date.now()}-${sanitizedBase}-${randomUUID().slice(0, 6)}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const supabase = getSupabaseAdmin();
    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(uniquePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase Storage Upload Error:", uploadError);
      return NextResponse.json(
        { message: `Failed to upload image: ${uploadError.message}` },
        { status: 500 },
      );
    }

    const { data: publicData } = supabase.storage.from("uploads").getPublicUrl(uniquePath);

    return NextResponse.json({
      url: publicData.publicUrl,
      filename: originalName,
      size: file.size,
      path: uniquePath,
      message: "Image uploaded successfully.",
    });
  } catch (error) {
    console.error("Image upload handler error:", error);
    const message = error instanceof Error ? error.message : "Unable to process the image upload.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
