import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { addBlog, getAllBlogs } from "@/lib/content-store";

export async function GET() {
  try {
    const blogs = await getAllBlogs();
    return NextResponse.json({ blogs });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load blogs.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Admin sign-in is required." }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
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

    const blog = await addBlog({
      title: body.title,
      category: body.category,
      author: body.author,
      excerpt: body.excerpt,
      content: body.content,
      imageUrl: body.imageUrl,
      tags: body.tags,
      status: body.status,
    });

    return NextResponse.json({
      message: "Blog added successfully.",
      blog,
    }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to add blog.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
