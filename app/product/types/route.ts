import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const b_code = cookieStore.get("botcode")?.value;

  if (!b_code) {
    return NextResponse.json({ error: "Missing botcode" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("category")
    .select("name")
    .eq("t_ower", b_code);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const ownerNames = data.map((item) => item.name);
  return NextResponse.json(ownerNames);
}