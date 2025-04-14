// app/category/edit/[id]/action/route.ts

"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  // ดึงข้อมูลจาก formData
  const formData = await req.formData();
  const name = formData.get("name") as string;

  const supabase = await createClient(); // สร้าง Supabase client

  // รอให้คำสั่งเสร็จสมบูรณ์
  const { error } = await supabase
    .from("category") // เรียกใช้ table category
    .update({ name }) // อัปเดตชื่อหมวดหมู่
    .eq("id", params.id); // ค้นหาตาม ID ที่ได้รับ

  if (error) {
    console.error("Update error:", error.message);
    return new Response("Failed to update category", { status: 500 });
  }

  // ทำการ redirect หลังการอัปเดตเสร็จ
  redirect("/category");
}
