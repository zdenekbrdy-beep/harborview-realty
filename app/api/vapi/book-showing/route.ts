import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const schema = z.object({
  slot_id: z.string().uuid(),
  lead_id: z.string().uuid(),
  property_address: z.string().optional().nullable(),
});

function verifySecret(req: NextRequest): boolean {
  const fromHeader = req.headers.get("x-vapi-secret");
  const fromQuery = req.nextUrl.searchParams.get("secret");
  const expected = process.env.VAPI_WEBHOOK_SECRET;
  return fromHeader === expected || fromQuery === expected;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: "America/New_York",
  });
}

export async function POST(req: NextRequest) {
  if (!verifySecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { slot_id, lead_id, property_address } = parsed.data;
  const supabase = createServiceClient();

  // Read slot + verify available
  const { data: slot, error: slotErr } = await supabase
    .from("showing_slots")
    .select("id, slot_at, is_booked")
    .eq("id", slot_id)
    .single();

  if (slotErr || !slot) {
    return NextResponse.json({ error: "Slot not found" }, { status: 404 });
  }
  if (slot.is_booked) {
    return NextResponse.json({ error: "Slot already booked" }, { status: 409 });
  }

  // Mark slot booked
  const { error: updateErr } = await supabase
    .from("showing_slots")
    .update({ is_booked: true })
    .eq("id", slot_id);

  if (updateErr) {
    return NextResponse.json({ error: updateErr.message }, { status: 500 });
  }

  // Insert showing
  const { data: showing, error: showingErr } = await supabase
    .from("showings")
    .insert({
      lead_id,
      slot_at: slot.slot_at,
      property_address: property_address ?? null,
      status: "booked",
      agent_name: "Margaret Holloway",
    })
    .select("id")
    .single();

  if (showingErr) {
    return NextResponse.json({ error: showingErr.message }, { status: 500 });
  }

  // Fetch lead email
  const { data: lead } = await supabase
    .from("leads")
    .select("name, email")
    .eq("id", lead_id)
    .single();

  // Send confirmation email if email available
  if (lead?.email) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Harborview Realty <onboarding@resend.dev>",
      to: lead.email,
      subject: "Your tour with Harborview Realty is confirmed",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1F2A33">
          <h2 style="font-size:22px;margin-bottom:8px">Your showing is booked.</h2>
          <p>Hi ${lead.name},</p>
          <p>Your property tour has been confirmed:</p>
          <div style="background:#F7F3EC;border-radius:12px;padding:20px;margin:20px 0">
            <strong>When:</strong> ${formatDate(slot.slot_at)}<br/>
            ${property_address ? `<strong>Property:</strong> ${property_address}<br/>` : ""}
            <strong>Agent:</strong> Margaret Holloway, Harborview Realty
          </div>
          <p>Questions? Reply to this email or call us at (603) 555-0142.</p>
          <p style="color:#6B7682;font-size:12px;margin-top:32px">Harborview Realty &middot; 88 Market Street, Portsmouth NH 03801</p>
        </div>
      `,
    });
  }

  return NextResponse.json({ showing_id: showing.id });
}
