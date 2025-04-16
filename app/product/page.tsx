import { createClient } from "@/utils/supabase/server";
import { FormMessage, Message } from "@/components/form-message";
import { Settings, Pencil, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import ProductForm from "@/components/product/ProductForm"; // เพิ่มที่ด้านบน
import Header from "@/components/Header";
import DeleteProductForm from "@/components/product/DeleteProductForm";

export default async function Product(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  const cookieStore = await cookies(); // ไม่ต้อง await
  const userBotCode = cookieStore.get("botcode")?.value;

  // ดึงข้อมูล category ตาม botcode
  const { data: categories, error } = await supabase
    .from("product") // ← ชื่อ table ของคุณ
    .select("*")
    .eq("b_id", userBotCode);

  if (error) {
    console.log("Error fetching categories:", error.message);
  }

  return (
    <>
      <Header />
      <div className="pt-[120px] px-4 md:px-9">
        <div className="flex w-full">
          <div className="p-5 bg-white w-full md:w-[220px] mb-7 rounded-[15px] shadow-xl flex items-center font-medium">
            <Settings size={30} />
            <h1 className="text-xl md:text-2xl text-center font-medium ml-2">
              จัดการสินค้า
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full">
          <div className="bg-white p-5 rounded-[10px] shadow-xl text-center">
            <div className="flex justify-end">
              {/* ✅ ปุ่มเพิ่มหมวดหมู่ */}
              <ProductForm />
            </div>

            <div className="relative overflow-x-auto mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">ชื่อสินค้า</th>
                    <th className="px-6 py-3">ประเภทสินค้า</th>
                    <th className="px-6 py-3">ราคา</th>
                    <th className="px-6 py-3">สถานะ</th>

                    <th className="px-6 py-3">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <tr key={category.id} className="bg-white border-b">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {category.p_title}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {category.p_type}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {category.p_price}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {category.p_status}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/product/edit/${category.id}`}
                            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-[7px] text-sm"
                          >
                            <Pencil size={18} />
                            แก้ไข
                          </Link>
                          <DeleteProductForm id={category.id} />
                        </div>
                      </td>
                    </tr>
                  ))}

                  {categories?.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-5">
                        ไม่พบหมวดหมู่
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
