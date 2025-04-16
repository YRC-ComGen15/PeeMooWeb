"use client";

import { useEffect, useState } from "react";

type ProductTypeSelectProps = {
  selectedType: string;
};

export default function ProductTypeSelect({
  selectedType,
}: ProductTypeSelectProps) {
  const [productTypes, setProductTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch("/product/types");
        const data = await res.json();
        setProductTypes(data);
      } catch (error) {
        console.error("Failed to fetch product types:", error);
      }
    };

    fetchTypes();
  }, []);

  return (
    <div className="mt-4">
      <label
        htmlFor="p_type"
        className="block text-sm font-medium text-gray-700"
      >
        ประเภทสินค้า
      </label>
      <select
        name="p_type"
        id="p_type"
        defaultValue={selectedType}
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
    </div>
  );
}