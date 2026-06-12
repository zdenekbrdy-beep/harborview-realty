"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email?: string | null;
  budget_min?: number | null;
  budget_max?: number | null;
  bedrooms?: number | null;
  timeline?: string | null;
  pre_approved?: boolean | null;
  location_preference?: string | null;
};

type Showing = {
  id: string;
  created_at: string;
  slot_at: string;
  property_address?: string | null;
  status: string;
  agent_name?: string | null;
  leads?: { name: string; phone: string } | null;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
}

function formatBudget(min?: number | null, max?: number | null) {
  if (!min && !max) return "-";
  const fmt = (n: number) => (n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1000)}k`);
  if (min && max) return `${fmt(min)} - ${fmt(max)}`;
  if (max) return `up to ${fmt(max)}`;
  return `from ${fmt(min!)}`;
}

export default function AdminDashboard({
  initialLeads,
  initialShowings,
}: {
  initialLeads: Lead[];
  initialShowings: Showing[];
}) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [showings, setShowings] = useState<Showing[]>(initialShowings);
  const [tab, setTab] = useState<"leads" | "showings">("leads");
  const [cancelling, setCancelling] = useState<string | null>(null);
  const supabase = createClient();

  async function cancelShowing(showing: Showing) {
    if (!confirm(`Cancel showing for ${showing.leads?.name ?? "this lead"}?`)) return;
    setCancelling(showing.id);
    await supabase.from("showings").update({ status: "cancelled" }).eq("id", showing.id);
    await supabase.from("showing_slots").update({ is_booked: false }).eq("slot_at", showing.slot_at);
    setShowings((prev) => prev.map((s) => s.id === showing.id ? { ...s, status: "cancelled" } : s));
    setCancelling(null);
  }

  useEffect(() => {
    const leadsChannel = supabase
      .channel("admin-leads")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "leads" }, (payload) => {
        setLeads((prev) => [payload.new as Lead, ...prev]);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "leads" }, (payload) => {
        setLeads((prev) => prev.map((l) => (l.id === (payload.new as Lead).id ? (payload.new as Lead) : l)));
      })
      .subscribe();

    const showingsChannel = supabase
      .channel("admin-showings")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "showings" }, async (payload) => {
        const { data } = await supabase
          .from("showings")
          .select("*, leads(name, phone)")
          .eq("id", (payload.new as Showing).id)
          .single();
        if (data) setShowings((prev) => [data as Showing, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(leadsChannel);
      supabase.removeChannel(showingsChannel);
    };
  }, [supabase]);

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <header className="bg-navy px-6 md:px-12 py-5 flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-bold text-ivory"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Harborview Admin
          </h1>
          <p className="text-mist text-xs mt-0.5">Realtime lead + showing tracker</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-mist">Live</span>
        </div>
      </header>

      {/* Stats bar */}
      <div className="bg-card border-b border-ink/8 px-6 md:px-12 py-4 flex gap-8">
        <div>
          <p className="text-2xl font-bold text-ink">{leads.length}</p>
          <p className="text-xs text-mist">Total leads</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-ink">{showings.length}</p>
          <p className="text-xs text-mist">Showings booked</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-ink">
            {showings.filter((s) => s.status === "booked").length}
          </p>
          <p className="text-xs text-mist">Upcoming</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 md:px-12 pt-8 pb-4 flex gap-6 border-b border-ink/8">
        <button
          onClick={() => setTab("leads")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors duration-150 ${
            tab === "leads" ? "border-harbor text-harbor" : "border-transparent text-mist hover:text-ink"
          }`}
        >
          Leads ({leads.length})
        </button>
        <button
          onClick={() => setTab("showings")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors duration-150 ${
            tab === "showings" ? "border-harbor text-harbor" : "border-transparent text-mist hover:text-ink"
          }`}
        >
          Showings ({showings.length})
        </button>
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 py-8">
        {tab === "leads" && (
          <div className="overflow-x-auto">
            {leads.length === 0 ? (
              <p className="text-mist text-sm py-12 text-center">No leads yet. Make a test call!</p>
            ) : (
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-xs text-mist tracking-wide uppercase">
                    <th className="pb-3 pr-6 font-medium">Name</th>
                    <th className="pb-3 pr-6 font-medium">Phone</th>
                    <th className="pb-3 pr-6 font-medium">Budget</th>
                    <th className="pb-3 pr-6 font-medium">Beds</th>
                    <th className="pb-3 pr-6 font-medium">Timeline</th>
                    <th className="pb-3 pr-6 font-medium">Pre-approved</th>
                    <th className="pb-3 font-medium">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-t border-ink/6 hover:bg-ink/3 transition-colors duration-100"
                    >
                      <td className="py-3 pr-6 font-medium text-ink">{lead.name}</td>
                      <td className="py-3 pr-6 text-mist">{lead.phone}</td>
                      <td className="py-3 pr-6 text-mist">{formatBudget(lead.budget_min, lead.budget_max)}</td>
                      <td className="py-3 pr-6 text-mist">{lead.bedrooms ?? "-"}</td>
                      <td className="py-3 pr-6 text-mist">{lead.timeline?.replace(/-/g, " ") ?? "-"}</td>
                      <td className="py-3 pr-6">
                        {lead.pre_approved === true ? (
                          <span className="text-xs text-green-700 bg-green-100 rounded-full px-2 py-0.5">Yes</span>
                        ) : lead.pre_approved === false ? (
                          <span className="text-xs text-red-700 bg-red-100 rounded-full px-2 py-0.5">No</span>
                        ) : (
                          <span className="text-mist">-</span>
                        )}
                      </td>
                      <td className="py-3 text-mist text-xs">{formatDate(lead.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === "showings" && (
          <div className="overflow-x-auto">
            {showings.length === 0 ? (
              <p className="text-mist text-sm py-12 text-center">No showings yet. Book one via Sarah!</p>
            ) : (
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-xs text-mist tracking-wide uppercase">
                    <th className="pb-3 pr-6 font-medium">Lead</th>
                    <th className="pb-3 pr-6 font-medium">When</th>
                    <th className="pb-3 pr-6 font-medium">Property</th>
                    <th className="pb-3 pr-6 font-medium">Agent</th>
                    <th className="pb-3 pr-6 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {showings.map((s) => (
                    <tr
                      key={s.id}
                      className="border-t border-ink/6 hover:bg-ink/3 transition-colors duration-100"
                    >
                      <td className="py-3 pr-6 font-medium text-ink">
                        {s.leads?.name ?? "-"}
                        {s.leads?.phone && (
                          <p className="text-xs text-mist font-normal">{s.leads.phone}</p>
                        )}
                      </td>
                      <td className="py-3 pr-6 text-mist">{formatDate(s.slot_at)}</td>
                      <td className="py-3 pr-6 text-mist">{s.property_address ?? "TBD"}</td>
                      <td className="py-3 pr-6 text-mist">{s.agent_name ?? "-"}</td>
                      <td className="py-3 pr-6">
                        <span
                          className={`text-xs rounded-full px-2 py-0.5 ${
                            s.status === "booked"
                              ? "text-blue-700 bg-blue-100"
                              : s.status === "completed"
                              ? "text-green-700 bg-green-100"
                              : "text-red-700 bg-red-100"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3">
                        {s.status === "booked" && (
                          <button
                            onClick={() => cancelShowing(s)}
                            disabled={cancelling === s.id}
                            className="text-xs text-red-600 hover:text-red-800 hover:underline disabled:opacity-40 transition-colors"
                          >
                            {cancelling === s.id ? "Cancelling..." : "Cancel"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
