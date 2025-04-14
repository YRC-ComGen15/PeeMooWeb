"use client";

import { useState } from "react";

export default function CategoryForm() {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/category/add", {
      method: "POST",
      body: new URLSearchParams({ name }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 items-center">
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="ชื่อหมวดหมู่"
        className="border px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[10px]"
      />
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-[10px] hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        เพิ่ม
      </button>
    </form>
  );
}
