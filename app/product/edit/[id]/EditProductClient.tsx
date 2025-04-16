// app/product/edit/[id]/EditProductClient.tsx
'use client';

import { useEffect, useState } from "react";
import Header from "@/components/Header";

export default function EditProductClient({ category }: { category: any }) {
  const [productTypes, setProductTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await fetch("/product/types");
      const data = await res.json();
      setProductTypes(data);
    };
    fetchTypes();
  }, []);

  return (
    <>
      <Header />
      <div className="pt-[120px] px-4 md:px-9">
        <form
          action={`/product/edit/${category.id}/action`}
          method="POST"
          className="space-y-4 bg-white p-6 rounded-lg shadow-md"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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

            <label htmlFor="p_price" className="block text-sm font-medium text-gray-700">
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

            <label htmlFor="p_type" className="block text-sm font-medium text-gray-700">
              ประเภทสินค้า
            </label>
            <select
              name="p_type"
              defaultValue={category.p_type}
              className="mt-1 block w-full border px-3 py-2 rounded-md"
              required
            >
              <option value="">เลือกประเภท</option>
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              สถานะ
            </label>
            <select
              name="status"
              defaultValue={category.status}
              className="mt-1 block w-full border px-3 py-2 rounded-md"
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