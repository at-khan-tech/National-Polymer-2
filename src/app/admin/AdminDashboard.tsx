"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Check,
  ChevronDown,
  CircleDollarSign,
  FilePlus2,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Pencil,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

import type { BlogPost } from "@/data/blogsData";
import type { ProductDetail } from "@/data/productsData";
import type { AdminOrder, ContentCategory, OrderStatus } from "@/lib/content-store";

type View = "dashboard" | "blogs" | "products" | "categories" | "orders" | "settings";
type Notice = { type: "success" | "error"; message: string } | null;
type BlogEditor = {
  title: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  tags: string;
  imageUrl: string;
  status: "draft" | "published";
};
type NewOrder = {
  customer: string;
  email: string;
  product: string;
  quantity: string;
  total: string;
};

const navigation: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "blogs", label: "Blogs", icon: BookOpen },
  { id: "products", label: "Products", icon: Package },
  { id: "categories", label: "Categories", icon: Boxes },
  { id: "orders", label: "Orders", icon: ShoppingBag },
];
const statuses: OrderStatus[] = ["pending", "processing", "shipped", "completed", "cancelled"];
const inputClass = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50";
const labelClass = "mb-1.5 block text-xs font-semibold text-slate-600";
const initialProduct = {
  name: "",
  category: "",
  tagline: "",
  description: "",
  imageUrl: "",
};
const emptyBlog: BlogEditor = {
  title: "",
  category: "",
  author: "National Polymers Trading Desk",
  excerpt: "",
  content: "",
  tags: "",
  imageUrl: "",
  status: "draft",
};
const emptyOrder: NewOrder = { customer: "", email: "", product: "", quantity: "1", total: "" };

async function readResponse(response: Response, fallback: string) {
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(typeof result.message === "string" ? result.message : fallback);
  return result;
}

function dateLabel(date: string) {
  return new Date(date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" });
}

function NoticeBanner({ notice }: { notice: Notice }) {
  if (!notice) return null;
  return (
    <div role={notice.type === "error" ? "alert" : "status"} className={`rounded-lg border px-3 py-2.5 text-sm ${notice.type === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
      {notice.message}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
        {description ? <p className="mt-1.5 text-sm text-slate-500">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

function MetricCard({ title, value, note, icon: Icon, trend }: { title: string; value: string | number; note: string; icon: typeof Boxes; trend?: "up" | "down" }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
        </div>
        <span className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600"><Icon size={19} /></span>
      </div>
      <p className="mt-3 flex items-center gap-1 text-xs text-slate-500">
        {trend === "up" ? <ArrowUpRight size={14} className="text-emerald-600" /> : null}
        {trend === "down" ? <ArrowDownRight size={14} className="text-amber-600" /> : null}
        {note}
      </p>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    published: "bg-emerald-50 text-emerald-700",
    completed: "bg-emerald-50 text-emerald-700",
    shipped: "bg-blue-50 text-blue-700",
    processing: "bg-indigo-50 text-indigo-700",
    draft: "bg-amber-50 text-amber-700",
    pending: "bg-amber-50 text-amber-700",
    cancelled: "bg-slate-100 text-slate-600",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${styles[status] ?? "bg-slate-100 text-slate-600"}`}>{status}</span>;
}

export default function AdminPanelPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [blogEditorOpen, setBlogEditorOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [blogEditor, setBlogEditor] = useState<BlogEditor>(emptyBlog);
  const [blogNotice, setBlogNotice] = useState<Notice>(null);
  const [isSavingBlog, setIsSavingBlog] = useState(false);
  const [productForm, setProductForm] = useState(initialProduct);
  const [editingProductSlug, setEditingProductSlug] = useState<string | null>(null);
  const [productNotice, setProductNotice] = useState<Notice>(null);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState<"blog" | "product">("blog");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [categoryNotice, setCategoryNotice] = useState<Notice>(null);
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [orderForm, setOrderForm] = useState<NewOrder>(emptyOrder);
  const [orderNotice, setOrderNotice] = useState<Notice>(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const loadData = useCallback(async () => {
    setLoadError("");
    try {
      const [blogResult, productResult, categoryResult, orderResult] = await Promise.all([
        fetch("/api/admin/blogs", { cache: "no-store" }).then((response) => readResponse(response, "Unable to load posts.")),
        fetch("/api/products", { cache: "no-store" }).then((response) => readResponse(response, "Unable to load products.")),
        fetch("/api/admin/categories", { cache: "no-store" }).then((response) => readResponse(response, "Unable to load categories.")),
        fetch("/api/admin/orders", { cache: "no-store" }).then((response) => readResponse(response, "Unable to load orders.")),
      ]);
      setPosts(blogResult.blogs as BlogPost[]);
      setProducts(productResult.products as ProductDetail[]);
      setCategories(categoryResult.categories as ContentCategory[]);
      setOrders(orderResult.orders as AdminOrder[]);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Unable to load admin data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { void loadData(); }, [loadData]);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return posts.filter((post) => !query || [post.title, post.category, post.author, ...post.tags].some((value) => value.toLowerCase().includes(query)));
  }, [posts, search]);
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => !query || [product.name, product.category, product.tagline].some((value) => value.toLowerCase().includes(query)));
  }, [products, search]);
  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => !query || [order.orderNumber, order.customer, order.email, order.product].some((value) => value.toLowerCase().includes(query)));
  }, [orders, search]);

  const setView = (view: View) => {
    setActiveView(view);
    setMobileSidebarOpen(false);
    setSearch("");
  };

  const handleLogout = async () => {
    setLogoutError("");
    try {
      const response = await fetch("/api/admin/login", { method: "DELETE" });
      await readResponse(response, "Unable to log out. Please try again.");
      router.refresh();
    } catch (error) {
      setLogoutError(error instanceof Error ? error.message : "Unable to log out.");
    }
  };

  const openNewBlog = () => {
    setEditingSlug(null);
    setBlogEditor({ ...emptyBlog, category: categories.find((category) => category.type === "blog")?.name ?? "" });
    setBlogNotice(null);
    setBlogEditorOpen(true);
  };

  const editBlog = (post: BlogPost) => {
    setEditingSlug(post.slug);
    setBlogEditor({
      title: post.title,
      category: post.category,
      author: post.author,
      excerpt: post.excerpt,
      content: post.content.join("\n\n"),
      tags: post.tags.join(", "),
      imageUrl: post.imageUrl,
      status: post.status === "draft" ? "draft" : "published",
    });
    setBlogNotice(null);
    setBlogEditorOpen(true);
  };

  const saveBlog = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSavingBlog(true);
    setBlogNotice(null);
    const editing = editingSlug !== null;
    try {
      const response = await fetch(editing ? `/api/admin/blogs/${encodeURIComponent(editingSlug)}` : "/api/blogs", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...blogEditor,
          content: blogEditor.content.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean),
          tags: blogEditor.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        }),
      });
      const result = await readResponse(response, "Unable to save post.");
      setBlogNotice({ type: "success", message: result.message ?? "Post saved." });
      await loadData();
      if (!editing) {
        setBlogEditor({ ...emptyBlog, category: categories.find((category) => category.type === "blog")?.name ?? "" });
      }
    } catch (error) {
      setBlogNotice({ type: "error", message: error instanceof Error ? error.message : "Unable to save post." });
    } finally {
      setIsSavingBlog(false);
    }
  };

  const deleteBlog = async (post: BlogPost) => {
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;
    try {
      await readResponse(await fetch(`/api/admin/blogs/${encodeURIComponent(post.slug)}`, { method: "DELETE" }), "Unable to delete post.");
      setPosts((current) => current.filter((item) => item.slug !== post.slug));
      if (editingSlug === post.slug) setBlogEditorOpen(false);
    } catch (error) {
      setBlogNotice({ type: "error", message: error instanceof Error ? error.message : "Unable to delete post." });
    }
  };

  const saveProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSavingProduct(true);
    setProductNotice(null);
    try {
      const response = await fetch(
        editingProductSlug ? `/api/products/${encodeURIComponent(editingProductSlug)}` : "/api/products",
        {
        method: editingProductSlug ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productForm),
      });
      const result = await readResponse(response, "Unable to save product.");
      setProductNotice({ type: "success", message: result.message ?? "Product saved." });
      setProductForm(initialProduct);
      setEditingProductSlug(null);
      await loadData();
    } catch (error) {
      setProductNotice({ type: "error", message: error instanceof Error ? error.message : "Unable to save product." });
    } finally {
      setIsSavingProduct(false);
    }
  };

  const editProduct = (product: ProductDetail) => {
    setEditingProductSlug(product.slug);
    setProductForm({
      name: product.name,
      category: product.category,
      tagline: product.tagline,
      description: product.description,
      imageUrl: product.imageUrl,
    });
    setProductNotice(null);
  };

  const deleteProduct = async (product: ProductDetail) => {
    if (!window.confirm(`Delete “${product.name}”? This will remove it from the public catalog.`)) return;
    setProductNotice(null);
    try {
      await readResponse(
        await fetch(`/api/products/${encodeURIComponent(product.slug)}`, { method: "DELETE" }),
        "Unable to delete product.",
      );
      setProducts((current) => current.filter((item) => item.slug !== product.slug));
      if (editingProductSlug === product.slug) {
        setEditingProductSlug(null);
        setProductForm(initialProduct);
      }
      setProductNotice({ type: "success", message: "Product deleted." });
    } catch (error) {
      setProductNotice({ type: "error", message: error instanceof Error ? error.message : "Unable to delete product." });
    }
  };

  const saveCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSavingCategory(true);
    setCategoryNotice(null);
    try {
      const result = await readResponse(await fetch(
        editingCategoryId
          ? `/api/admin/categories/${encodeURIComponent(editingCategoryId)}`
          : "/api/admin/categories",
        {
        method: editingCategoryId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName, type: categoryType }),
      }), "Unable to save category.");
      setCategoryName("");
      setEditingCategoryId(null);
      setCategoryNotice({ type: "success", message: result.message ?? "Category saved." });
      await loadData();
    } catch (error) {
      setCategoryNotice({ type: "error", message: error instanceof Error ? error.message : "Unable to save category." });
    } finally {
      setIsSavingCategory(false);
    }
  };

  const editCategory = (category: ContentCategory) => {
    setEditingCategoryId(category.id);
    setCategoryName(category.name);
    setCategoryType(category.type);
    setCategoryNotice(null);
  };

  const deleteCategory = async (category: ContentCategory) => {
    if (!window.confirm(`Delete the ${category.name} category?`)) return;
    setCategoryNotice(null);
    try {
      await readResponse(await fetch(`/api/admin/categories/${encodeURIComponent(category.id)}`, { method: "DELETE" }), "Unable to delete category.");
      setCategories((current) => current.filter((item) => item.id !== category.id));
      setCategoryNotice({ type: "success", message: "Category deleted." });
      if (editingCategoryId === category.id) {
        setEditingCategoryId(null);
        setCategoryName("");
      }
    } catch (error) {
      setCategoryNotice({ type: "error", message: error instanceof Error ? error.message : "Unable to delete category." });
    }
  };

  const saveOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSavingOrder(true);
    setOrderNotice(null);
    try {
      const result = await readResponse(await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...orderForm,
          quantity: Number(orderForm.quantity),
          total: Number(orderForm.total),
        }),
      }), "Unable to create order.");
      setOrders((current) => [result.order as AdminOrder, ...current]);
      setOrderNotice({ type: "success", message: result.message ?? "Order created." });
      setOrderForm(emptyOrder);
      setOrderFormOpen(false);
    } catch (error) {
      setOrderNotice({ type: "error", message: error instanceof Error ? error.message : "Unable to create order." });
    } finally {
      setIsSavingOrder(false);
    }
  };

  const updateOrder = async (order: AdminOrder, status: OrderStatus) => {
    try {
      const result = await readResponse(await fetch(`/api/admin/orders/${encodeURIComponent(order.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }), "Unable to update order.");
      setOrders((current) => current.map((item) => item.id === order.id ? result.order as AdminOrder : item));
    } catch (error) {
      setOrderNotice({ type: "error", message: error instanceof Error ? error.message : "Unable to update order." });
    }
  };

  const pageTitle = navigation.find((item) => item.id === activeView)?.label ?? "Settings";
  const searchPlaceholder = activeView === "blogs" ? "Search posts..." : activeView === "products" ? "Search products..." : activeView === "orders" ? "Search orders..." : "";
  const sidebar = (
    <div className="flex h-full flex-col border-r border-slate-200 bg-white">
      <Link href="/" className="flex h-[76px] items-center border-b border-slate-100 px-6" aria-label="National Polymers home">
        <Image src="/images/logo_header.png" alt="National Polymers" width={188} height={54} priority className="h-11 w-auto object-contain" />
      </Link>
      <div className="px-4 pt-6">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
        <nav aria-label="Admin navigation" className="space-y-1">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" onClick={() => setView(id)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${activeView === id ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
              {id === "orders" && orders.filter((order) => order.status === "pending").length > 0 ? <span className="ml-auto rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">{orders.filter((order) => order.status === "pending").length}</span> : null}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-auto space-y-1 border-t border-slate-100 p-4">
        <button type="button" onClick={() => setView("settings")} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${activeView === "settings" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}>
          <Settings size={18} strokeWidth={1.8} /> Settings
        </button>
        <button type="button" onClick={() => void handleLogout()} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600">
          <LogOut size={18} strokeWidth={1.8} /> Log out
        </button>
        <div className="mt-3 flex items-center gap-3 rounded-lg bg-slate-50 p-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">NP</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-semibold text-slate-800">Administrator</span>
            <span className="block text-[10px] text-slate-500">Content manager</span>
          </span>
          <ChevronDown size={15} className="text-slate-400" />
        </div>
      </div>
    </div>
  );

  const blogForm = (
    <form onSubmit={saveBlog} className="space-y-4">
      <div><label className={labelClass} htmlFor="blog-title">Post title</label><input id="blog-title" className={inputClass} value={blogEditor.title} onChange={(event) => setBlogEditor((current) => ({ ...current, title: event.target.value }))} required /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className={labelClass} htmlFor="blog-category">Category</label><select id="blog-category" className={inputClass} value={blogEditor.category} onChange={(event) => setBlogEditor((current) => ({ ...current, category: event.target.value }))} required><option value="" disabled>Select a category</option>{categories.filter((category) => category.type === "blog").map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}</select></div>
        <div><label className={labelClass} htmlFor="blog-status">Visibility</label><select id="blog-status" className={inputClass} value={blogEditor.status} onChange={(event) => setBlogEditor((current) => ({ ...current, status: event.target.value as "draft" | "published" }))}><option value="draft">Draft</option><option value="published">Published</option></select></div>
      </div>
      <div><label className={labelClass} htmlFor="blog-author">Author</label><input id="blog-author" className={inputClass} value={blogEditor.author} onChange={(event) => setBlogEditor((current) => ({ ...current, author: event.target.value }))} required /></div>
      <div><label className={labelClass} htmlFor="blog-excerpt">Summary</label><textarea id="blog-excerpt" className={`${inputClass} min-h-20`} value={blogEditor.excerpt} onChange={(event) => setBlogEditor((current) => ({ ...current, excerpt: event.target.value }))} required /></div>
      <div><label className={labelClass} htmlFor="blog-content">Article</label><textarea id="blog-content" className={`${inputClass} min-h-40`} placeholder="Separate paragraphs with a blank line." value={blogEditor.content} onChange={(event) => setBlogEditor((current) => ({ ...current, content: event.target.value }))} required /></div>
      <div><label className={labelClass} htmlFor="blog-tags">Tags</label><input id="blog-tags" className={inputClass} placeholder="Market outlook, Polyolefins" value={blogEditor.tags} onChange={(event) => setBlogEditor((current) => ({ ...current, tags: event.target.value }))} /></div>
      <div><label className={labelClass} htmlFor="blog-image">Cover image URL</label><input id="blog-image" type="url" className={inputClass} placeholder="https://..." value={blogEditor.imageUrl} onChange={(event) => setBlogEditor((current) => ({ ...current, imageUrl: event.target.value }))} /></div>
      <NoticeBanner notice={blogNotice} />
      <div className="flex gap-3 pt-1">
        <button type="button" onClick={() => setBlogEditorOpen(false)} className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
        <button disabled={isSavingBlog} className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">{isSavingBlog ? "Saving..." : editingSlug ? "Save changes" : blogEditor.status === "draft" ? "Save draft" : "Publish post"}</button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">{sidebar}</aside>
      {mobileSidebarOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close navigation" onClick={() => setMobileSidebarOpen(false)} className="absolute inset-0 bg-slate-950/40" />
          <aside className="relative h-full w-[min(82vw,300px)] shadow-2xl">{sidebar}</aside>
        </div>
      ) : null}
      <div className="lg:ml-64">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-7">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setMobileSidebarOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Open navigation"><Menu size={20} /></button>
            <div>
              <p className="text-[11px] font-medium text-slate-400">National Polymers <span className="px-1">/</span> Admin</p>
              <p className="text-sm font-semibold text-slate-800">{pageTitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {searchPlaceholder ? <label className="relative hidden sm:block"><span className="sr-only">Search</span><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={searchPlaceholder} className="w-52 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs outline-none focus:border-indigo-400" /></label> : null}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">NP</span>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] p-4 sm:p-7">
          {logoutError ? <div className="mb-5"><NoticeBanner notice={{ type: "error", message: logoutError }} /></div> : null}
          {loadError ? <div className="mb-5 flex items-center justify-between gap-4"><NoticeBanner notice={{ type: "error", message: loadError }} /><button onClick={() => void loadData()} className="shrink-0 text-sm font-semibold text-indigo-600">Retry</button></div> : null}
          {isLoading ? <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">Loading workspace…</div> : null}

          {!isLoading && activeView === "dashboard" ? (
            <div>
              <SectionHeading eyebrow="Workspace overview" title="Good day, Administrator" description="Here’s what’s happening across your store and content." action={<button onClick={() => { setView("blogs"); openNewBlog(); }} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"><Plus size={17} /> Create post</button>} />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard title="Total products" value={products.length} note="Across your product catalog" icon={Package} trend="up" />
                <MetricCard title="Published articles" value={posts.filter((post) => post.status !== "draft").length} note={`${posts.filter((post) => post.status === "draft").length} drafts waiting`} icon={BookOpen} trend="up" />
                <MetricCard title="Open orders" value={orders.filter((order) => !["completed", "cancelled"].includes(order.status)).length} note={`${orders.filter((order) => order.status === "pending").length} need attention`} icon={ShoppingBag} />
                <MetricCard title="Order value" value={orders.filter((order) => order.status !== "cancelled").reduce((sum, order) => sum + order.total, 0).toLocaleString("en-US", { minimumFractionDigits: 2 })} note="Total recorded order amount" icon={CircleDollarSign} trend="up" />
              </div>
              <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.6fr)]">
                <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="text-sm font-semibold">Recent orders</h2><p className="mt-1 text-xs text-slate-500">Latest activity in your order book</p></div><button onClick={() => setView("orders")} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">View all</button></div>
                  {orders.length ? <div className="divide-y divide-slate-100">{orders.slice(0, 5).map((order) => <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div><p className="text-sm font-semibold text-slate-800">{order.orderNumber} <span className="font-normal text-slate-400">· {order.customer}</span></p><p className="mt-1 text-xs text-slate-500">{order.product} · {dateLabel(order.createdAt)}</p></div><div className="flex items-center gap-3"><StatusPill status={order.status} /><span className="text-sm font-semibold text-slate-800">{order.total.toLocaleString()}</span></div></div>)}</div> : <div className="p-10 text-center"><ShoppingBag className="mx-auto text-slate-300" size={25} /><p className="mt-3 text-sm font-medium text-slate-700">No orders yet</p><p className="mt-1 text-xs text-slate-500">Create a manual order to get started.</p><button onClick={() => { setView("orders"); setOrderFormOpen(true); }} className="mt-4 text-xs font-semibold text-indigo-600">Add first order</button></div>}
                </section>
                <section className="rounded-xl border border-slate-200 bg-white p-5">
                  <h2 className="text-sm font-semibold">Quick actions</h2><p className="mt-1 text-xs text-slate-500">Common tasks, all in one place.</p>
                  <div className="mt-4 space-y-2">
                    {[{ label: "Write a new blog post", icon: BookOpen, view: "blogs" as View }, { label: "Add a product", icon: Package, view: "products" as View }, { label: "Manage categories", icon: Boxes, view: "categories" as View }, { label: "Create an order", icon: ShoppingBag, view: "orders" as View }].map(({ label, icon: Icon, view }) => <button key={label} onClick={() => { setView(view); if (view === "blogs") openNewBlog(); if (view === "orders") setOrderFormOpen(true); }} className="flex w-full items-center gap-3 rounded-lg border border-slate-100 p-3 text-left text-sm font-medium text-slate-700 transition hover:border-indigo-100 hover:bg-indigo-50/60"><span className="rounded-md bg-slate-100 p-2 text-slate-600"><Icon size={16} /></span>{label}<ArrowUpRight className="ml-auto text-slate-400" size={15} /></button>)}
                  </div>
                </section>
              </div>
            </div>
          ) : null}

          {!isLoading && activeView === "blogs" ? (
            <div>
              <SectionHeading eyebrow="Content management" title="Blogs & articles" description="Create, edit, and publish the insights on your website." action={<button onClick={openNewBlog} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"><Plus size={17} /> New article</button>} />
              <NoticeBanner notice={blogNotice && !blogEditorOpen ? blogNotice : null} />
              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4"><div><h2 className="text-sm font-semibold">All articles</h2><p className="mt-1 text-xs text-slate-500">{filteredPosts.length} articles · {posts.filter((post) => post.status === "draft").length} drafts</p></div><label className="relative sm:hidden"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search posts" className="w-44 rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-xs outline-none focus:border-indigo-400" /></label></div>
                {filteredPosts.length ? <div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left"><thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-3">Article</th><th className="px-5 py-3">Category</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Date</th><th className="px-5 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredPosts.map((post) => <tr key={post.slug} className="hover:bg-slate-50/70"><td className="max-w-[360px] px-5 py-4"><p className="truncate text-sm font-semibold text-slate-800">{post.title}</p><p className="mt-1 truncate text-xs text-slate-500">{post.author}</p></td><td className="px-5 py-4 text-sm text-slate-600">{post.category}</td><td className="px-5 py-4"><StatusPill status={post.status === "draft" ? "draft" : "published"} /></td><td className="px-5 py-4 text-xs text-slate-500">{post.date}</td><td className="px-5 py-4"><div className="flex justify-end gap-1"><button onClick={() => editBlog(post)} aria-label={`Edit ${post.title}`} className="rounded-md p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"><Pencil size={15} /></button>{post.status !== "draft" ? <Link href={`/blogs/${post.slug}`} target="_blank" aria-label={`Preview ${post.title}`} className="rounded-md p-2 text-slate-500 hover:bg-slate-100"><ArrowUpRight size={15} /></Link> : null}<button onClick={() => void deleteBlog(post)} aria-label={`Delete ${post.title}`} className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"><Trash2 size={15} /></button></div></td></tr>)}</tbody></table></div> : <div className="p-12 text-center"><BookOpen className="mx-auto text-slate-300" size={25} /><p className="mt-3 text-sm font-medium">No articles found</p><p className="mt-1 text-xs text-slate-500">Create your first article to share an insight.</p></div>}
              </div>
              {blogEditorOpen ? <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40"><button aria-label="Close editor" onClick={() => setBlogEditorOpen(false)} className="absolute inset-0" /><section className="relative h-full w-full max-w-xl overflow-y-auto bg-white p-5 shadow-2xl sm:p-7"><div className="mb-6 flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">{editingSlug ? "Edit article" : "Content studio"}</p><h2 className="mt-1 text-xl font-semibold">{editingSlug ? "Update article" : "Create article"}</h2></div><button onClick={() => setBlogEditorOpen(false)} aria-label="Close editor" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={19} /></button></div>{blogForm}</section></div> : null}
            </div>
          ) : null}

          {!isLoading && activeView === "products" ? (
            <div>
              <SectionHeading eyebrow="Catalog management" title="Products" description="Manage the materials shown in your public product catalog." />
              <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="text-sm font-semibold">Product catalog</h2><p className="mt-1 text-xs text-slate-500">{filteredProducts.length} products</p></div><label className="relative sm:hidden"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" className="w-36 rounded-lg border border-slate-200 py-2 pl-9 pr-2 text-xs" /></label></div>
                  <div className="divide-y divide-slate-100">{filteredProducts.map((product) => <article key={product.slug} className="flex items-center gap-4 p-5"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600"><Package size={19} /></span><div className="min-w-0 flex-1"><h3 className="truncate text-sm font-semibold text-slate-800">{product.name}</h3><p className="mt-1 truncate text-xs text-slate-500">{product.category} · {product.tagline}</p></div><div className="flex shrink-0 items-center gap-1"><Link href={`/products/${product.slug}`} target="_blank" className="rounded-md px-2 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50">View <ArrowUpRight className="ml-1 inline" size={13} /></Link><button type="button" onClick={() => editProduct(product)} aria-label={`Edit ${product.name}`} className="rounded-md p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"><Pencil size={15} /></button><button type="button" onClick={() => void deleteProduct(product)} aria-label={`Delete ${product.name}`} className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"><Trash2 size={15} /></button></div></article>)}</div>
                </section>
                <section className="rounded-xl border border-slate-200 bg-white p-5"><div className="mb-5"><p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">{editingProductSlug ? "Edit catalog item" : "Add to catalog"}</p><h2 className="mt-1 text-lg font-semibold">{editingProductSlug ? "Update product" : "New product"}</h2><p className="mt-1 text-xs text-slate-500">{editingProductSlug ? "Save changes to this product." : "Add a product to your public website."}</p></div><form onSubmit={saveProduct} className="space-y-4"><div><label className={labelClass} htmlFor="product-name">Product name</label><input id="product-name" className={inputClass} value={productForm.name} onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))} required /></div><div><label className={labelClass} htmlFor="product-category">Category</label><select id="product-category" className={inputClass} value={productForm.category} onChange={(event) => setProductForm((current) => ({ ...current, category: event.target.value }))} required><option value="" disabled>Select a category</option>{categories.filter((category) => category.type === "product").map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}</select>{!categories.some((category) => category.type === "product") ? <p className="mt-1 text-xs text-amber-700">Add a product category first.</p> : null}</div><div><label className={labelClass} htmlFor="product-tagline">Tagline</label><input id="product-tagline" className={inputClass} value={productForm.tagline} onChange={(event) => setProductForm((current) => ({ ...current, tagline: event.target.value }))} required /></div><div><label className={labelClass} htmlFor="product-description">Description</label><textarea id="product-description" className={`${inputClass} min-h-24`} value={productForm.description} onChange={(event) => setProductForm((current) => ({ ...current, description: event.target.value }))} required /></div><div><label className={labelClass} htmlFor="product-image">Image URL</label><input id="product-image" type="url" className={inputClass} value={productForm.imageUrl} onChange={(event) => setProductForm((current) => ({ ...current, imageUrl: event.target.value }))} placeholder="https://..." /></div><NoticeBanner notice={productNotice} /><div className="flex gap-2">{editingProductSlug ? <button type="button" onClick={() => { setEditingProductSlug(null); setProductForm(initialProduct); setProductNotice(null); }} className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button> : null}<button disabled={isSavingProduct || !categories.some((category) => category.type === "product")} className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">{isSavingProduct ? "Saving..." : editingProductSlug ? "Save changes" : "Add product"}</button></div></form></section>
              </div>
            </div>
          ) : null}

          {!isLoading && activeView === "categories" ? (
            <div>
              <SectionHeading eyebrow="Catalog structure" title="Categories" description="Organize products and articles into useful groups." />
              <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                <section className="rounded-xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-100 px-5 py-4"><h2 className="text-sm font-semibold">All categories</h2><p className="mt-1 text-xs text-slate-500">{categories.length} categories across content and catalog</p></div>
                  <div className="divide-y divide-slate-100">{categories.map((category) => <div key={category.id} className="flex items-center gap-3 px-5 py-4"><span className={`rounded-lg p-2 ${category.type === "blog" ? "bg-violet-50 text-violet-600" : "bg-blue-50 text-blue-600"}`}>{category.type === "blog" ? <BookOpen size={17} /> : <Package size={17} />}</span><div className="flex-1"><p className="text-sm font-semibold text-slate-800">{category.name}</p><p className="mt-0.5 text-xs capitalize text-slate-500">{category.type} category</p></div><button type="button" onClick={() => editCategory(category)} aria-label={`Edit ${category.name}`} className="rounded-md p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"><Pencil size={15} /></button><button type="button" onClick={() => void deleteCategory(category)} aria-label={`Delete ${category.name}`} className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"><Trash2 size={15} /></button></div>)}</div>
                </section>
                <section className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">{editingCategoryId ? "Edit category" : "Organization"}</p><h2 className="mt-1 text-lg font-semibold">{editingCategoryId ? "Rename category" : "Create a category"}</h2><p className="mt-1 text-xs leading-5 text-slate-500">{editingCategoryId ? "Renaming a category updates all products or articles currently assigned to it." : "Categories are available in the blog and product editors. A category in use cannot be deleted."}</p><form onSubmit={saveCategory} className="mt-5 space-y-4"><div><label className={labelClass} htmlFor="category-type">Category for</label><select id="category-type" className={inputClass} value={categoryType} disabled={Boolean(editingCategoryId)} onChange={(event) => setCategoryType(event.target.value as "blog" | "product")}><option value="blog">Blog articles</option><option value="product">Products</option></select></div><div><label className={labelClass} htmlFor="category-name">Category name</label><input id="category-name" className={inputClass} value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder="e.g. Technical Guides" required /></div><NoticeBanner notice={categoryNotice} /><div className="flex gap-2">{editingCategoryId ? <button type="button" onClick={() => { setEditingCategoryId(null); setCategoryName(""); setCategoryNotice(null); }} className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button> : null}<button disabled={isSavingCategory} className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">{isSavingCategory ? "Saving..." : editingCategoryId ? "Save changes" : "Add category"}</button></div></form></section>
              </div>
            </div>
          ) : null}

          {!isLoading && activeView === "orders" ? (
            <div>
              <SectionHeading eyebrow="Sales operations" title="Orders" description="Create manual orders and track fulfillment status." action={<button onClick={() => { setOrderFormOpen((open) => !open); setOrderNotice(null); }} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"><Plus size={17} /> New order</button>} />
              <NoticeBanner notice={orderNotice && !orderFormOpen ? orderNotice : null} />
              <div className="mt-5 grid gap-4 sm:grid-cols-3"><MetricCard title="All orders" value={orders.length} note="Recorded in the order book" icon={ShoppingBag} /><MetricCard title="Awaiting action" value={orders.filter((order) => order.status === "pending").length} note="Pending orders" icon={CircleDollarSign} /><MetricCard title="Fulfilled" value={orders.filter((order) => order.status === "completed").length} note="Completed orders" icon={Check} /></div>
              {orderFormOpen ? <section className="mt-6 rounded-xl border border-indigo-100 bg-white p-5 shadow-sm"><div className="mb-5 flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Manual entry</p><h2 className="mt-1 text-lg font-semibold">Create an order</h2></div><button onClick={() => setOrderFormOpen(false)} aria-label="Close order form" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={18} /></button></div><form onSubmit={saveOrder} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"><div><label className={labelClass} htmlFor="order-customer">Customer</label><input id="order-customer" className={inputClass} value={orderForm.customer} onChange={(event) => setOrderForm((current) => ({ ...current, customer: event.target.value }))} required /></div><div><label className={labelClass} htmlFor="order-email">Email</label><input id="order-email" type="email" className={inputClass} value={orderForm.email} onChange={(event) => setOrderForm((current) => ({ ...current, email: event.target.value }))} required /></div><div><label className={labelClass} htmlFor="order-product">Product</label><select id="order-product" className={inputClass} value={orderForm.product} onChange={(event) => setOrderForm((current) => ({ ...current, product: event.target.value }))} required><option value="">Select product</option>{products.map((product) => <option key={product.slug} value={product.name}>{product.name}</option>)}</select></div><div><label className={labelClass} htmlFor="order-quantity">Quantity</label><input id="order-quantity" type="number" min="1" step="1" className={inputClass} value={orderForm.quantity} onChange={(event) => setOrderForm((current) => ({ ...current, quantity: event.target.value }))} required /></div><div><label className={labelClass} htmlFor="order-total">Total amount</label><input id="order-total" type="number" min="0" step="0.01" className={inputClass} value={orderForm.total} onChange={(event) => setOrderForm((current) => ({ ...current, total: event.target.value }))} required /></div><div className="sm:col-span-2 xl:col-span-5"><NoticeBanner notice={orderNotice} /><button disabled={isSavingOrder} className="mt-3 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">{isSavingOrder ? "Creating..." : "Create order"}</button></div></form></section> : null}
              <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4"><div><h2 className="text-sm font-semibold">Order book</h2><p className="mt-1 text-xs text-slate-500">{filteredOrders.length} orders · status updates save automatically</p></div><label className="relative sm:hidden"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search orders" className="w-40 rounded-lg border border-slate-200 py-2 pl-9 pr-2 text-xs" /></label></div>{filteredOrders.length ? <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left"><thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-3">Order</th><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Product</th><th className="px-5 py-3">Qty</th><th className="px-5 py-3">Total</th><th className="px-5 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredOrders.map((order) => <tr key={order.id}><td className="px-5 py-4"><p className="text-sm font-semibold text-slate-800">{order.orderNumber}</p><p className="mt-1 text-xs text-slate-500">{dateLabel(order.createdAt)}</p></td><td className="px-5 py-4"><p className="text-sm text-slate-700">{order.customer}</p><p className="mt-1 text-xs text-slate-500">{order.email}</p></td><td className="px-5 py-4 text-sm text-slate-600">{order.product}</td><td className="px-5 py-4 text-sm text-slate-600">{order.quantity}</td><td className="px-5 py-4 text-sm font-semibold text-slate-800">{order.total.toLocaleString()}</td><td className="px-5 py-4"><select aria-label={`Update status for ${order.orderNumber}`} value={order.status} onChange={(event) => void updateOrder(order, event.target.value as OrderStatus)} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium capitalize text-slate-700 outline-none focus:border-indigo-400">{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></td></tr>)}</tbody></table></div> : <div className="p-12 text-center"><ShoppingBag className="mx-auto text-slate-300" size={25} /><p className="mt-3 text-sm font-medium">No orders found</p><p className="mt-1 text-xs text-slate-500">Orders you create will be tracked here.</p></div>}</section>
            </div>
          ) : null}

          {!isLoading && activeView === "settings" ? (
            <div><SectionHeading eyebrow="Workspace preferences" title="Settings" description="Manage workspace details and content storage." /><div className="max-w-3xl space-y-5"><section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6"><div className="flex items-center gap-3"><span className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600"><Settings size={19} /></span><div><h2 className="text-sm font-semibold">Admin workspace</h2><p className="mt-1 text-xs text-slate-500">National Polymers content management</p></div></div><div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2"><div><p className="text-xs text-slate-500">Authentication</p><p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-emerald-700"><Check size={15} /> Protected admin session</p></div><div><p className="text-xs text-slate-500">Session duration</p><p className="mt-1 text-sm font-medium text-slate-800">8 hours</p></div></div></section><section className="rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6"><h2 className="text-sm font-semibold text-amber-900">Content storage</h2><p className="mt-2 text-sm leading-6 text-amber-800">The admin workspace stores content in a local JSON file. Production deployments need a persistent writable filesystem, or content changes may not survive restarts or be shared across multiple server instances.</p></section>{logoutError ? <NoticeBanner notice={{ type: "error", message: logoutError }} /> : null}<button onClick={() => void handleLogout()} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-red-200 hover:text-red-600"><LogOut size={16} /> Log out of admin</button></div></div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
