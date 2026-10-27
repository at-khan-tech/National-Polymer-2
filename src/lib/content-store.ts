import { promises as fs } from "fs";
import path from "path";

import { PRODUCTS_DATA, type ProductDetail } from "@/data/productsData";
import { BLOGS_DATA, type BlogPost } from "@/data/blogsData";

export interface ContentStore {
  products: ProductDetail[];
  blogs: BlogPost[];
}

const STORAGE_PATH = path.join(process.cwd(), "data", "content-store.json");
const EMPTY_STORE: ContentStore = {
  products: [],
  blogs: [],
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

async function ensureStoreFile() {
  await fs.mkdir(path.dirname(STORAGE_PATH), { recursive: true });

  try {
    await fs.access(STORAGE_PATH);
  } catch {
    await fs.writeFile(STORAGE_PATH, JSON.stringify(EMPTY_STORE, null, 2));
  }
}

export async function readStore(): Promise<ContentStore> {
  await ensureStoreFile();

  try {
    const raw = await fs.readFile(STORAGE_PATH, "utf8");
    if (!raw.trim()) {
      return EMPTY_STORE;
    }

    const parsed = JSON.parse(raw) as Partial<ContentStore>;
    return {
      products: Array.isArray(parsed.products) ? parsed.products : [],
      blogs: Array.isArray(parsed.blogs) ? parsed.blogs : [],
    };
  } catch {
    return EMPTY_STORE;
  }
}

export async function writeStore(store: ContentStore) {
  await ensureStoreFile();
  await fs.writeFile(STORAGE_PATH, JSON.stringify(store, null, 2));
}

export async function getAllProducts(): Promise<ProductDetail[]> {
  const stored = await readStore();
  return [...PRODUCTS_DATA, ...stored.products];
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  const stored = await readStore();
  return [...BLOGS_DATA, ...stored.blogs];
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

  if (!name) {
    throw new Error("Product name is required.");
  }

  const nextProduct: ProductDetail = {
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
    applications: productInput.applications?.length
      ? productInput.applications
      : ["Custom application"],
    packaging: productInput.packaging?.length
      ? productInput.packaging
      : ["Standard packaging"],
    imageUrl:
      productInput.imageUrl && productInput.imageUrl.trim()
        ? productInput.imageUrl.trim()
        : "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
  };

  const store = await readStore();
  const existingProduct = store.products.find((item) => item.slug === nextProduct.slug);
  if (existingProduct) {
    throw new Error("A product with this name already exists.");
  }

  store.products = [nextProduct, ...store.products];
  await writeStore(store);
  return nextProduct;
}

export async function addBlog(
  blogInput: Partial<BlogPost> & {
    title: string;
    category: string;
    author: string;
    excerpt: string;
    content: string | string[];
    imageUrl?: string;
    tags?: string[] | string;
  },
): Promise<BlogPost> {
  const title = blogInput.title?.trim();
  const category = blogInput.category?.trim() || "Market Intelligence";
  const author = blogInput.author?.trim() || "National Polymers Trading Desk";
  const excerpt = blogInput.excerpt?.trim() || "New insight added via admin panel.";

  if (!title) {
    throw new Error("Blog title is required.");
  }

  const contentText = Array.isArray(blogInput.content)
    ? blogInput.content
    : normalizeArray(blogInput.content || "");

  const nextBlog: BlogPost = {
    slug: toSlug(title),
    title,
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    readTime: "5 min read",
    category,
    author,
    excerpt,
    content: contentText.length ? contentText : [excerpt],
    imageUrl:
      blogInput.imageUrl && blogInput.imageUrl.trim()
        ? blogInput.imageUrl.trim()
        : "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    tags: normalizeArray(blogInput.tags).length ? normalizeArray(blogInput.tags) : [category],
  };

  const store = await readStore();
  const existingBlog = store.blogs.find((item) => item.slug === nextBlog.slug);
  if (existingBlog) {
    throw new Error("A blog with this title already exists.");
  }

  store.blogs = [nextBlog, ...store.blogs];
  await writeStore(store);
  return nextBlog;
}
