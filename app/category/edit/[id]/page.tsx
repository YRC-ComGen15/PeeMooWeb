import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  // รอให้ params ถูกดึงข้อมูลก่อน
  const { id } = params; // ไม่ต้องใช้ await กับ params เพราะ params เป็น property ที่สามารถใช้ได้ทันที

  const supabase = await createClient(); // ใช้ await เพื่อให้ได้ client ที่สามารถใช้ .from() ได้

  // ดึงข้อมูล category โดยใช้ client
  const { data: category, error } = await supabase
    .from("category") // ชื่อ table ที่ต้องการเข้าถึง
    .select("*")
    .eq("id", id) // ค้นหาตาม ID จาก params
    .single(); // ดึงข้อมูลเพียงแค่หนึ่งแถว

  // ถ้ามีข้อผิดพลาด หรือไม่พบข้อมูล category ให้แสดง error
  if (error || !category) {
    console.error("Error fetching category:", error?.message);
    notFound(); // ไปที่หน้าที่ไม่พบ
  }

  // แสดงข้อมูลในหน้าแก้ไข
  return (
    <>
      <Header />
      <div className="pt-[120px] px-4 md:px-9">
        <form
          action={`/category/edit/${id}/action`}
          method="POST"
          className="space-y-4 bg-white p-6 rounded-lg shadow-md"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              ชื่อหมวดหมู่
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={category.name}
              className="mt-1 block w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            บันทึกการแก้ไข
          </button>
        </form>
      </div>
    </>
  );
}
