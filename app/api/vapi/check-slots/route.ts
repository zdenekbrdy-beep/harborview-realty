import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

function verifySecret(req: NextRequest): boolean {
  return req.headers.get("x-vapi-secret") === process.env.VAPI_WEBHOOK_SECRET;
}

function toFriendlyLabel(slotAt: string): string {
  const date = new Date(slotAt);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[date.getDay()];
  const hours = date.getHours();
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  const timeOfDay = hours < 12 ? "morning" : hours < 17 ? "afternoon" : "evening";
  return `${day} ${timeOfDay} at ${displayHour} ${period}`;
}

export async function POST(req: NextRequest) {
  if (!verifySecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const limit = Math.min(Number(body?.limit) || 3, 5);

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("showing_slots")
    .select("id, slot_at")
    .eq("is_booked", false)
    .gt("slot_at", new Date().toISOString())
    .order("slot_at", { ascending: true })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const slots = (data || []).map((row: { id: string; slot_at: string }) => ({
    id: row.id,
    slot_at: row.slot_at,
    friendly_label: toFriendlyLabel(row.slot_at),
  }));

  return NextResponse.json({ slots });
}
