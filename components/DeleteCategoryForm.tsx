// components/DeleteCategoryForm.tsx
"use client";

import { useState } from "react";

export default function DeleteCategoryForm({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirmDelete = confirm("คุณแน่ใจหรือว่าต้องการลบหมวดหมู่นี้?");
    if (!confirmDelete) return;

    setLoading(true);

    const res = await fetch(`/category/delete/${id}`, {
      method: "POST",
    });

    if (res.ok) {
      location.reload();
    } else {
      alert("เกิดข้อผิดพลาดในการลบ");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-[7px] text-sm"
      >
        ลบ
      </button>
    </form>
  );
}
