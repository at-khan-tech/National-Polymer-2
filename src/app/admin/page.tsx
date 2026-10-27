import { cookies } from "next/headers";

import AdminDashboard from "@/app/admin/AdminDashboard";
import AdminLogin from "@/app/admin/AdminLogin";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isValidAdminSession(session)) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
