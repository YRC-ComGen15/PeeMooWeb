// app/product/edit/[id]/action/route.ts

"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function POST(req: Request, context: { params: { id: string } }) {
  const id = context.params.id;

  const formData = await req.formData();

  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("p_price") as string);
  const type = formData.get("p_type") as string;
  const status = formData.get("p_status") as string; // ตรวจสอบว่า column นี้มีใน Supabase จริงไหม

  const supabase = await createClient();

  const { error } = await supabase
    .from("product")
    .update({
      p_title: name,
      p_price: price,
      p_type: type,
      // 👇 เปลี่ยนตรงนี้ถ้าฟิลด์ใน DB ไม่ใช่ชื่อว่า 'status'
      p_status: status, // ✅ สมมุติว่าในฐานข้อมูลใช้ชื่อนี้
    })
    .eq("id", id);

  if (error) {
    console.error("Update error:", error.message);
    return new Response("Failed to update product", { status: 500 });
  }

  redirect("/product");
}