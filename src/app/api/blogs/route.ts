import { NextResponse } from "next/server";

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
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
    }

    const blog = await addBlog({
      title: body.title,
      category: body.category,
      author: body.author,
      excerpt: body.excerpt,
      content: body.content,
      imageUrl: body.imageUrl,
      tags: body.tags,
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
