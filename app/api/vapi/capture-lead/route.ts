import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";

const schema = z.object({
  lead_id: z.string().uuid().optional(),
  name: z.string().min(1),
  phone: z.string().min(7),
  email: z.string().email().optional().nullable(),
  budget_min: z.number().int().positive().optional().nullable(),
  budget_max: z.number().int().positive().optional().nullable(),
  bedrooms: z.number().int().positive().optional().nullable(),
  timeline: z.enum(["asap", "1-3-months", "3-6-months", "just-looking"]).optional().nullable(),
  pre_approved: z.boolean().optional().nullable(),
  location_preference: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

function verifySecret(req: NextRequest): boolean {
  const secret = req.headers.get("x-vapi-secret");
  return secret === process.env.VAPI_WEBHOOK_SECRET;
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

  const { lead_id, ...data } = parsed.data;
  const supabase = createServiceClient();

  if (lead_id) {
    const { data: updated, error } = await supabase
      .from("leads")
      .update({ ...data, source: "voice-agent" })
      .eq("id", lead_id)
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ lead_id: updated.id });
  }

  const { data: inserted, error } = await supabase
    .from("leads")
    .insert({ ...data, source: "voice-agent" })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ lead_id: inserted.id });
}
