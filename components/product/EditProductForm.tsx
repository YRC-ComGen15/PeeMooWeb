"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductForm({ category }: { category: any }) {
  const [name, setName] = useState(category.name);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/category/edit/${category.id}`, {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      router.push("/category");
    } else {
      alert("มีบางอย่างผิดพลาด");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-4 py-2 w-full rounded mb-4"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        บันทึก
      </button>
    </form>
  );
}
