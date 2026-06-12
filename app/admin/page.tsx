import { createServiceClient } from "@/lib/supabase/server";
import AdminDashboard from "./_components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createServiceClient();

  const [{ data: leads }, { data: showings }] = await Promise.all([
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("showings")
      .select("*, leads(name, phone)")
      .order("slot_at", { ascending: true })
      .limit(50),
  ]);

  return <AdminDashboard initialLeads={leads ?? []} initialShowings={showings ?? []} />;
}
