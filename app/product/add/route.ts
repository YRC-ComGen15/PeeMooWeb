import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const cookieStore = await cookies();
  const b_code = cookieStore.get("botcode")?.value;
  const supabase = await createClient();

  const { p_title, p_type, p_price, p_status } = body;

  const { error } = await supabase.from("product").insert([
    {
      p_title,
      p_type,
      p_price,
      p_status,
      b_id: b_code,
    },
  ]);

  if (error) {
    console.error("Insert error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}