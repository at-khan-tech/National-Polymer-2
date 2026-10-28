import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { createClient } from "@supabase/supabase-js";
import { loadEnvConfig } from "@next/env";

import { BLOGS_DATA, type BlogPost } from "../src/data/blogsData";
import { PRODUCTS_DATA, type ProductDetail } from "../src/data/productsData";
import type { AdminOrder, ContentCategory, OrderStatus } from "../src/lib/content-store";
import type { Database } from "../src/lib/database.types";

type LegacyStore = Partial<{
  products: ProductDetail[];
  blogs: BlogPost[];
  deletedBlogSlugs: string[];
  deletedProductSlugs: string[];
  categories: ContentCategory[];
  orders: AdminOrder[];
}>;

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured.");
  }
  return createClient<Database>(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
  });
}

function throwIfDatabaseError(error: { message: string } | null) {
  if (error) {
    throw new Error(`Supabase request failed: ${error.message}`);
  }
}

async function readLegacyStore(): Promise<LegacyStore> {
  try {
    const raw = await readFile(path.join(process.cwd(), "data", "content-store.json"), "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Legacy content store must contain a JSON object.");
    }
    return parsed as LegacyStore;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return {};
    }
    throw error;
  }
}

function isOrderStatus(value: unknown): value is AdminOrder["status"] {
  return value === "pending" || value === "processing" || value === "shipped" ||
    value === "completed" || value === "cancelled";
}

function mapProduct(product: ProductDetail) {
  return {
    slug: product.slug,
    name: product.name,
    category: product.category,
    tagline: product.tagline,
    description: product.description,
    overview: product.overview,
    specs: product.specs,
    sub_types: product.subTypes,
    applications: product.applications,
    packaging: product.packaging,
    image_url: product.imageUrl,
  };
}

function mapBlog(blog: BlogPost) {
  const parsedDate = Date.parse(blog.date);
  return {
    slug: blog.slug,
    title: blog.title,
    date: blog.date,
    created_at: Number.isNaN(parsedDate) ? new Date().toISOString() : new Date(parsedDate).toISOString(),
    read_time: blog.readTime,
    status: blog.status ?? "published",
    category: blog.category,
    author: blog.author,
    excerpt: blog.excerpt,
    content: blog.content,
    image_url: blog.imageUrl,
    tags: blog.tags,
  };
}

async function ensureCategory(name: string, type: ContentCategory["type"]) {
  const supabase = getSupabaseAdmin();
  const { data: rows, error: selectError } = await supabase
    .from("admin_categories")
    .select("name")
    .eq("type", type);
  throwIfDatabaseError(selectError);

  if (rows?.some((row) => row.name.toLowerCase() === name.toLowerCase())) {
    return;
  }

  const { error } = await supabase.from("admin_categories").insert({ name, type });
  throwIfDatabaseError(error);
}

async function seed() {
  const legacy = await readLegacyStore();
  const deletedProducts = new Set(legacy.deletedProductSlugs ?? []);
  const deletedBlogs = new Set(legacy.deletedBlogSlugs ?? []);
  const products = new Map<string, ProductDetail>();
  const blogs = new Map<string, BlogPost>();

  PRODUCTS_DATA.filter((product) => !deletedProducts.has(product.slug))
    .forEach((product) => products.set(product.slug, product));
  (legacy.products ?? []).filter((product) => !deletedProducts.has(product.slug))
    .forEach((product) => products.set(product.slug, product));
  BLOGS_DATA.filter((blog) => !deletedBlogs.has(blog.slug))
    .forEach((blog) => blogs.set(blog.slug, blog));
  (legacy.blogs ?? []).filter((blog) => !deletedBlogs.has(blog.slug))
    .forEach((blog) => blogs.set(blog.slug, blog));

  const supabase = getSupabaseAdmin();
  const productRows = Array.from(products.values(), mapProduct);
  const blogRows = Array.from(blogs.values(), mapBlog);

  if (productRows.length) {
    const { error } = await supabase
      .from("products")
      .upsert(productRows, { onConflict: "slug", ignoreDuplicates: true });
    throwIfDatabaseError(error);
  }
  if (blogRows.length) {
    const { error } = await supabase
      .from("blogs")
      .upsert(blogRows, { onConflict: "slug", ignoreDuplicates: true });
    throwIfDatabaseError(error);
  }

  const categories = new Map<string, ContentCategory>();
  for (const product of products.values()) {
    categories.set(`product:${product.category.toLowerCase()}`, {
      id: "",
      name: product.category,
      type: "product",
    });
  }
  for (const blog of blogs.values()) {
    categories.set(`blog:${blog.category.toLowerCase()}`, {
      id: "",
      name: blog.category,
      type: "blog",
    });
  }
  for (const category of legacy.categories ?? []) {
    categories.set(`${category.type}:${category.name.toLowerCase()}`, category);
  }
  for (const category of categories.values()) {
    await ensureCategory(category.name, category.type);
  }

  const orderRows = (legacy.orders ?? []).map((order) => ({
    id: order.id || randomUUID(),
    order_number: order.orderNumber || `NP-${randomUUID().slice(0, 12).toUpperCase()}`,
    customer: order.customer,
    email: order.email,
    product: order.product,
    quantity: order.quantity,
    total: order.total,
    status: isOrderStatus(order.status) ? order.status : "pending" as OrderStatus,
    created_at: order.createdAt || new Date().toISOString(),
  }));
  if (orderRows.length) {
    const { error } = await supabase
      .from("admin_orders")
      .upsert(orderRows, { onConflict: "order_number", ignoreDuplicates: true });
    throwIfDatabaseError(error);
  }

  console.log(`Seed complete: ${productRows.length} products, ${blogRows.length} blog posts, ${categories.size} categories, ${orderRows.length} orders.`);
}

loadEnvConfig(process.cwd());
void seed().catch((error: unknown) => {
  console.error("Database seed failed:", error);
  process.exitCode = 1;
});
