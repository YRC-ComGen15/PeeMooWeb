import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductTypeSelect from "@/components/product/ProductTypeSelect";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  // รอให้ params ถูกดึงข้อมูลก่อน
  const { id } = params; // ไม่ต้องใช้ await กับ params เพราะ params เป็น property ที่สามารถใช้ได้ทันที

  const supabase = await createClient(); // ใช้ await เพื่อให้ได้ client ที่สามารถใช้ .from() ได้

  // ดึงข้อมูล category โดยใช้ client
  const { data: category, error } = await supabase
    .from("product") // ชื่อ table ที่ต้องการเข้าถึง
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
          action={`/product/edit/${id}/action`}
          method="POST"
          className="space-y-4 bg-white p-6 rounded-lg shadow-md"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              ชื่อสินค้า
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={category.p_title}
              className="mt-1 block w-full border px-3 py-2 rounded-md"
              required
            />

            <label
              htmlFor="p_price"
              className="block text-sm font-medium text-gray-700"
            >
              ราคา
            </label>
            <input
              type="number"
              id="p_price"
              name="p_price"
              defaultValue={category.p_price}
              className="mt-1 block w-full border px-3 py-2 rounded-md"
              required
            />

            <ProductTypeSelect selectedType={category.p_type} />

            <label
              htmlFor="p_price"
              className="block text-sm font-medium text-gray-700"
            >
              สถานะ
            </label>
            <select
              defaultValue={category.status}
              name="p_status"
              className="border rounded px-3 py-1 text-sm"
              required
            >
              <option value="">เลือกสถานะ</option>
              <option value="พร้อมขาย">พร้อมขาย</option>
              <option value="ไม่พร้อมขาย">ไม่พร้อมขาย</option>
              <option value="หมดสต๊อก">หมดสต๊อก</option>
            </select>
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
