import { randomUUID } from "node:crypto";

import type { BlogPost } from "@/data/blogsData";
import type { ProductDetail } from "@/data/productsData";
import type { CategoryType, OrderStatus } from "@/lib/database.types";
import { getSupabaseAdmin, throwIfDatabaseError } from "@/lib/supabase";

export interface ContentCategory {
  id: string;
  name: string;
  type: CategoryType;
}

export type { OrderStatus };

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  product: string;
  quantity: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

type BlogInput = Omit<Partial<BlogPost>, "content" | "tags"> & {
  title: string;
  category: string;
  author: string;
  excerpt: string;
  content: string | string[];
  imageUrl?: string;
  tags?: string[] | string;
  status?: "draft" | "published";
};

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "item";
}

function normalizeArray(value: string | string[] | undefined) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.filter(Boolean).map((item) => String(item).trim());
  }

  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function toProduct(row: {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  overview: string[];
  specs: ProductDetail["specs"];
  sub_types: ProductDetail["subTypes"];
  applications: string[];
  packaging: string[];
  image_url: string;
}): ProductDetail {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    tagline: row.tagline,
    description: row.description,
    overview: row.overview,
    specs: row.specs,
    subTypes: row.sub_types,
    applications: row.applications,
    packaging: row.packaging,
    imageUrl: row.image_url,
  };
}

function toBlog(row: {
  slug: string;
  title: string;
  date: string;
  read_time: string;
  status: "draft" | "published";
  category: string;
  author: string;
  excerpt: string;
  content: string[];
  image_url: string;
  tags: string[];
}): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    date: row.date,
    readTime: row.read_time,
    status: row.status,
    category: row.category,
    author: row.author,
    excerpt: row.excerpt,
    content: row.content,
    imageUrl: row.image_url,
    tags: row.tags,
  };
}

function toAdminOrder(row: {
  id: string;
  order_number: string;
  customer: string;
  email: string;
  product: string;
  quantity: number;
  total: number;
  status: OrderStatus;
  created_at: string;
}): AdminOrder {
  return {
    id: row.id,
    orderNumber: row.order_number,
    customer: row.customer,
    email: row.email,
    product: row.product,
    quantity: row.quantity,
    total: row.total,
    status: row.status,
    createdAt: row.created_at,
  };
}

async function ensureCategory(name: string, type: CategoryType) {
  const supabase = getSupabaseAdmin();
  const { data: categories, error: selectError } = await supabase
    .from("admin_categories")
    .select("id, name, type")
    .eq("type", type);
  throwIfDatabaseError(selectError);

  const existing = categories?.find((category) => category.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    return existing;
  }

  const { data, error } = await supabase
    .from("admin_categories")
    .insert({ name, type })
    .select("id, name, type")
    .single();
  throwIfDatabaseError(error);
  return data;
}

export async function getAllProducts(): Promise<ProductDetail[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("products")
    .select("*")
    .order("name");
  throwIfDatabaseError(error);
  return (data ?? []).map(toProduct);
}

export async function getAdminCategories(): Promise<ContentCategory[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("admin_categories")
    .select("id, name, type")
    .order("name");
  throwIfDatabaseError(error);
  return data ?? [];
}

export async function addAdminCategory(nameInput: string, type: CategoryType) {
  const name = nameInput.trim();
  if (!name) throw new Error("Category name is required.");
  if (name.length > 60) throw new Error("Category names must be 60 characters or fewer.");
  if (type !== "blog" && type !== "product") throw new Error("Invalid category type.");

  const supabase = getSupabaseAdmin();
  const { data: categories, error: selectError } = await supabase
    .from("admin_categories")
    .select("name")
    .eq("type", type);
  throwIfDatabaseError(selectError);
  if (categories?.some((category) => category.name.toLowerCase() === name.toLowerCase())) {
    throw new Error("A category with this name already exists.");
  }

  const { data, error } = await supabase
    .from("admin_categories")
    .insert({ name, type })
    .select("id, name, type")
    .single();
  throwIfDatabaseError(error);
  return data;
}

export async function deleteAdminCategory(id: string) {
  const { error } = await getSupabaseAdmin().rpc("delete_admin_category", { p_id: id });
  throwIfDatabaseError(error);
}

export async function updateAdminCategory(id: string, nameInput: string) {
  const name = nameInput.trim();
  if (!name) throw new Error("Category name is required.");
  if (name.length > 60) throw new Error("Category names must be 60 characters or fewer.");

  const { data, error } = await getSupabaseAdmin().rpc("rename_admin_category", {
    p_id: id,
    p_name: name,
  });
  throwIfDatabaseError(error);
  if (!data?.length) throw new Error("Category not found.");
  return data[0];
}

export async function getAdminOrders(): Promise<AdminOrder[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("admin_orders")
    .select("*")
    .order("created_at", { ascending: false });
  throwIfDatabaseError(error);
  return (data ?? []).map(toAdminOrder);
}

export async function addAdminOrder(input: {
  customer: string;
  email: string;
  product: string;
  quantity: number;
  total: number;
}) {
  const customer = input.customer.trim();
  const email = input.email.trim();
  const product = input.product.trim();
  if (!customer || !email || !product) throw new Error("Customer, email, and product are required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid customer email address.");
  if (!Number.isInteger(input.quantity) || input.quantity < 1) throw new Error("Quantity must be a positive whole number.");
  if (!Number.isFinite(input.total) || input.total < 0) throw new Error("Total must be a valid non-negative amount.");

  const { data, error } = await getSupabaseAdmin()
    .from("admin_orders")
    .insert({
      order_number: `NP-${Date.now().toString().slice(-8)}-${randomUUID().slice(0, 4).toUpperCase()}`,
      customer,
      email,
      product,
      quantity: input.quantity,
      total: input.total,
      status: "pending",
    })
    .select("*")
    .single();
  throwIfDatabaseError(error);
  if (!data) throw new Error("Unable to create the order.");
  return toAdminOrder(data);
}

export async function updateAdminOrderStatus(id: string, status: OrderStatus) {
  const validStatuses: OrderStatus[] = ["pending", "processing", "shipped", "completed", "cancelled"];
  if (!validStatuses.includes(status)) throw new Error("Invalid order status.");

  const { data, error } = await getSupabaseAdmin()
    .from("admin_orders")
    .update({ status })
    .eq("id", id)
    .select("*")
    .maybeSingle();
  throwIfDatabaseError(error);
  if (!data) throw new Error("Order not found.");
  return toAdminOrder(data);
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  throwIfDatabaseError(error);
  return (data ?? []).map(toBlog);
}

export async function getAdminBlogs(): Promise<BlogPost[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
  throwIfDatabaseError(error);
  return (data ?? []).map(toBlog);
}

export async function addProduct(
  productInput: Partial<ProductDetail> & {
    name: string;
    category: string;
    tagline: string;
    description: string;
    imageUrl?: string;
  },
): Promise<ProductDetail> {
  const name = productInput.name?.trim();
  const category = productInput.category?.trim() || "General Polymer";
  const tagline = productInput.tagline?.trim() || "Custom polymer grade supplied by National Polymers.";
  const description = productInput.description?.trim() || "Custom product added via admin panel.";
  if (!name) throw new Error("Product name is required.");

  const product: ProductDetail = {
    slug: toSlug(name),
    name,
    category,
    tagline,
    description,
    overview: productInput.overview?.length ? productInput.overview : [description],
    specs: productInput.specs?.length
      ? productInput.specs
      : [{ property: "Core Grade", value: "Custom specification" }],
    subTypes: productInput.subTypes?.length
      ? productInput.subTypes
      : [{ name: "Custom Grade", mfi: "N/A", density: "N/A", useCase: "Custom processing requirement" }],
    applications: productInput.applications?.length ? productInput.applications : ["Custom application"],
    packaging: productInput.packaging?.length ? productInput.packaging : ["Standard packaging"],
    imageUrl: productInput.imageUrl?.trim() ||
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
  };

  await ensureCategory(category, "product");
  const { data, error } = await getSupabaseAdmin()
    .from("products")
    .insert({
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
    })
    .select("*")
    .single();
  throwIfDatabaseError(error);
  if (!data) throw new Error("Unable to create the product.");
  return toProduct(data);
}

export async function updateProduct(
  slug: string,
  productInput: { name: string; category: string; tagline: string; description: string; imageUrl?: string },
): Promise<ProductDetail> {
  const name = productInput.name.trim();
  const category = productInput.category.trim();
  const tagline = productInput.tagline.trim();
  const description = productInput.description.trim();
  if (!name || !category || !tagline || !description) {
    throw new Error("Name, category, tagline, and description are required.");
  }

  const supabase = getSupabaseAdmin();
  const { data: existing, error: selectError } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  throwIfDatabaseError(selectError);
  if (!existing) throw new Error("Product not found.");

  const nextSlug = toSlug(name);
  if (nextSlug !== slug) {
    const { data: duplicate, error: duplicateError } = await supabase
      .from("products")
      .select("slug")
      .eq("slug", nextSlug)
      .maybeSingle();
    throwIfDatabaseError(duplicateError);
    if (duplicate) throw new Error("A product with this name already exists.");
  }

  await ensureCategory(category, "product");
  const { data, error } = await supabase
    .from("products")
    .update({
      slug: nextSlug,
      name,
      category,
      tagline,
      description,
      overview: existing.overview.length === 1 ? [description] : existing.overview,
      image_url: productInput.imageUrl?.trim() || existing.image_url,
    })
    .eq("slug", slug)
    .select("*")
    .single();
  throwIfDatabaseError(error);
  if (!data) throw new Error("Unable to update the product.");
  return toProduct(data);
}

export async function deleteProduct(slug: string): Promise<void> {
  const { data, error } = await getSupabaseAdmin()
    .from("products")
    .delete()
    .eq("slug", slug)
    .select("slug")
    .maybeSingle();
  throwIfDatabaseError(error);
  if (!data) throw new Error("Product not found.");
}

export async function addBlog(blogInput: BlogInput): Promise<BlogPost> {
  const title = blogInput.title.trim();
  const category = blogInput.category.trim() || "Market Intelligence";
  const author = blogInput.author.trim() || "National Polymers Trading Desk";
  const excerpt = blogInput.excerpt.trim() || "New insight added via admin panel.";
  if (!title) throw new Error("Blog title is required.");

  const content = Array.isArray(blogInput.content)
    ? blogInput.content.map((paragraph) => paragraph.trim()).filter(Boolean)
    : normalizeArray(blogInput.content);
  const blog: BlogPost = {
    slug: toSlug(title),
    title,
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    readTime: "5 min read",
    status: blogInput.status === "draft" ? "draft" : "published",
    category,
    author,
    excerpt,
    content: content.length ? content : [excerpt],
    imageUrl: blogInput.imageUrl?.trim() ||
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    tags: normalizeArray(blogInput.tags).length ? normalizeArray(blogInput.tags) : [category],
  };

  await ensureCategory(category, "blog");
  const { data, error } = await getSupabaseAdmin()
    .from("blogs")
    .insert({
      slug: blog.slug,
      title: blog.title,
      date: blog.date,
      read_time: blog.readTime,
      status: blog.status ?? "published",
      category: blog.category,
      author: blog.author,
      excerpt: blog.excerpt,
      content: blog.content,
      image_url: blog.imageUrl,
      tags: blog.tags,
    })
    .select("*")
    .single();
  throwIfDatabaseError(error);
  if (!data) throw new Error("Unable to create the blog post.");
  return toBlog(data);
}

export async function updateBlog(slug: string, blogInput: BlogInput): Promise<BlogPost> {
  const supabase = getSupabaseAdmin();
  const { data: existing, error: selectError } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  throwIfDatabaseError(selectError);
  if (!existing) throw new Error("Blog post not found.");

  const title = blogInput.title.trim();
  if (!title) throw new Error("Blog title is required.");
  const content = Array.isArray(blogInput.content)
    ? blogInput.content.map((paragraph) => paragraph.trim()).filter(Boolean)
    : normalizeArray(blogInput.content);
  if (!content.length) throw new Error("Blog content is required.");

  const updated: BlogPost = {
    ...toBlog(existing),
    title,
    category: blogInput.category.trim() || existing.category,
    author: blogInput.author.trim() || existing.author,
    excerpt: blogInput.excerpt.trim(),
    content,
    imageUrl: blogInput.imageUrl?.trim() || existing.image_url,
    tags: normalizeArray(blogInput.tags),
    status: blogInput.status === "draft" ? "draft" : "published",
  };
  if (!updated.excerpt) throw new Error("Blog excerpt is required.");

  await ensureCategory(updated.category, "blog");
  const { data, error } = await supabase
    .from("blogs")
    .update({
      title: updated.title,
      category: updated.category,
      author: updated.author,
      excerpt: updated.excerpt,
      content: updated.content,
      image_url: updated.imageUrl,
      tags: updated.tags,
      status: updated.status ?? "published",
    })
    .eq("slug", slug)
    .select("*")
    .single();
  throwIfDatabaseError(error);
  if (!data) throw new Error("Unable to update the blog post.");
  return toBlog(data);
}

export async function deleteBlog(slug: string): Promise<void> {
  const { data, error } = await getSupabaseAdmin()
    .from("blogs")
    .delete()
    .eq("slug", slug)
    .select("slug")
    .maybeSingle();
  throwIfDatabaseError(error);
  if (!data) throw new Error("Blog post not found.");
}
