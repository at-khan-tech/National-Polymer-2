import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteBlog, updateBlog } from "@/lib/content-store";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function PATCH(request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid blog post payload." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ message: "Invalid blog post payload." }, { status: 400 });
  }

  if (
    typeof body.title !== "string" ||
    typeof body.category !== "string" ||
    typeof body.author !== "string" ||
    typeof body.excerpt !== "string" ||
    !(typeof body.content === "string" ||
      (Array.isArray(body.content) && body.content.every((paragraph: unknown) => typeof paragraph === "string"))) ||
    !(body.tags === undefined ||
      typeof body.tags === "string" ||
      (Array.isArray(body.tags) && body.tags.every((tag: unknown) => typeof tag === "string"))) ||
    !(body.imageUrl === undefined || typeof body.imageUrl === "string") ||
    !(body.status === undefined || body.status === "draft" || body.status === "published")
  ) {
    return NextResponse.json({ message: "Invalid blog post fields." }, { status: 400 });
  }

  try {
    const { slug } = await params;
    const blog = await updateBlog(slug, {
      title: typeof body.title === "string" ? body.title : "",
      category: typeof body.category === "string" ? body.category : "",
      author: typeof body.author === "string" ? body.author : "",
      excerpt: typeof body.excerpt === "string" ? body.excerpt : "",
      content: body.content as string | string[],
      imageUrl: typeof body.imageUrl === "string" ? body.imageUrl : "",
      tags: body.tags as string[] | string | undefined,
      status: body.status === "draft" ? "draft" : "published",
    });

    return NextResponse.json({ message: "Blog post updated successfully.", blog });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update blog post.";
    return NextResponse.json({ message }, { status: message === "Blog post not found." ? 404 : 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const { slug } = await params;
    await deleteBlog(slug);
    return NextResponse.json({ message: "Blog post deleted successfully." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete blog post.";
    return NextResponse.json({ message }, { status: message === "Blog post not found." ? 404 : 500 });
  }
}
