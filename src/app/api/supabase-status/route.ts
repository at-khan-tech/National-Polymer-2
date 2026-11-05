import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const [productsRes, blogsRes, categoriesRes] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("blogs").select("id", { count: "exact", head: true }),
      supabase.from("admin_categories").select("id", { count: "exact", head: true }),
    ]);

    const hasError = productsRes.error || blogsRes.error || categoriesRes.error;

    if (hasError) {
      return NextResponse.json(
        {
          supabaseConnected: false,
          error: productsRes.error?.message || blogsRes.error?.message || categoriesRes.error?.message,
          message: "Supabase reached but database table query failed.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      supabaseConnected: true,
      status: "Online & Ready",
      productsCount: productsRes.count ?? 0,
      blogsCount: blogsRes.count ?? 0,
      categoriesCount: categoriesRes.count ?? 0,
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

