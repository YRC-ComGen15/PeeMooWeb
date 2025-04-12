import Link from "next/link";
import { Bell, Sun, ShoppingCart, LayoutDashboard, User, Shapes } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/sign-in");
  }

  const displayName = user.user_metadata?.username || user.email;

  return (
    <header className="fixed top-4 left-4 right-4 z-50 bg-white rounded-xl shadow-xl px-4 py-3 flex flex-wrap md:flex-nowrap items-center justify-between border gap-4 md:gap-0">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl text-gray-700 font-semibold">
          ยินดีต้อนรับ, {displayName}!
        </h1>
      </div>

      <div className="flex flex-wrap gap-3 md:gap-4 items-center justify-end w-full md:w-auto">
        {/* ปุ่มแก้ไขสินค้า */}
        <Link
          href="/product"
          className="flex items-center gap-2 bg-transparent hover:bg-black text-[#000000b9] hover:text-white border-2 border-[#00000083] duration-300 font-medium px-4 py-2 transition rounded-[7px] text-sm md:text-base"
        >
          <ShoppingCart size={18} />
          แก้ไขรายการสินค้า
        </Link>

        {/* ปุ่มแก้ไขสินค้า */}
        <Link
          href="/product"
          className="flex items-center gap-2 bg-transparent hover:bg-black text-[#000000b9] hover:text-white border-2 border-[#00000083] duration-300 font-medium px-4 py-2 transition rounded-[7px] text-sm md:text-base"
        >
          <Shapes size={18} />
          แก้ไขหมวดหมู่
        </Link>

        {/* ปุ่มแดชบอร์ด */}
        <Link
          href="/"
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 transition rounded-[7px] duration-300 text-sm md:text-base"
        >
          <LayoutDashboard size={18} />
          แดชบอร์ด
        </Link>

        {/* โปรไฟล์ */}
        <Link href="/setting">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-400 flex items-center justify-center bg-gray-100">
            {user.user_metadata?.avatar_url ? (
              <Image
                src={user.user_metadata.avatar_url}
                alt="avatar"
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <User size={20} className="text-gray-500" />
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
