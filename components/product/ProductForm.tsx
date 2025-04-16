"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

export default function ProductForm() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [productTypes, setProductTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await fetch("/product/types");
      const data = await res.json();
      setProductTypes(data);
    };
    fetchTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_title: title,
        p_type: type,
        p_price: parseFloat(price),
        p_status: status,
      }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert("เพิ่มสินค้าล้มเหลว");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center flex-wrap">
      <input
        type="text"
        placeholder="ชื่อสินค้า"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-3 py-1 text-sm"
        required
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border rounded px-3 py-1 text-sm"
        required
      >
        <option value="">เลือกประเภท</option>
        {productTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="ราคา"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border rounded px-3 py-1 text-sm"
        required
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded px-3 py-1 text-sm"
        required
      >
        <option value="">เลือกสถานะ</option>
        <option value="พร้อมขาย">พร้อมขาย</option>
        <option value="ไม่พร้อมขาย">ไม่พร้อมขาย</option>
        <option value="หมดสต๊อก">หมดสต๊อก</option>
      </select>

      <button
        type="submit"
        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
      >
        <Plus size={16} />
        เพิ่ม
      </button>
    </form>
  );
}