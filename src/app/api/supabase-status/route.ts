import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const [productsRes, blogsRes, categoriesRes] = await Promise.all([
      supabase.from("products").select("slug", { count: "exact", head: true }),
      supabase.from("blogs").select("slug", { count: "exact", head: true }),
      supabase.from("admin_categories").select("id", { count: "exact", head: true }),
    ]);

    const hasError = productsRes.error || blogsRes.error || categoriesRes.error;

    if (hasError) {
      return NextResponse.json(
        {
          supabaseConnected: false,
          errorDetails: {
            products: productsRes.error?.message || "OK",
            blogs: blogsRes.error?.message || "OK",
            categories: categoriesRes.error?.message || "OK",
          },
          message: "Supabase connection reached, but a table query failed.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      supabaseConnected: true,
      status: "Online & Ready",
      database: "Supabase PostgreSQL",
      counts: {
        products: productsRes.count ?? 0,
        blogs: blogsRes.count ?? 0,
        categories: categoriesRes.count ?? 0,
      },
      message: "Congratulations! Your Supabase database is connected and active on Vercel.",
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        supabaseConnected: false,
        status: "Disconnected",
        error: errorMsg,
        hint: "Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel Environment Variables.",
      },
      { status: 500 }
    );
  }
}
