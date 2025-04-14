import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const form = await req.formData(); // ✅ ใช้อ่านข้อมูลจาก <form>
  const name = form.get("name") as string;

  const supabase = await createClient();
  const cookieStore = cookies();
  const botcode = cookieStore.get("botcode")?.value;

  const { error } = await supabase.from("category").insert([
    {
      name,
      t_ower: botcode,
    },
  ]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(null, {
    status: 302,
    headers: { Location: "/category" }, // ✅ redirect ไปหน้า /category
  });
}
