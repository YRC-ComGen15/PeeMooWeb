import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { updatePassword, signOutAction } from "@/app/actions";
import { Settings } from "lucide-react";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export default async function Product(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <Header />

      <div className="pt-[120px] px-4 md:px-9">
        {/* หัวข้อ */}
        <div className="p-5 bg-white w-full md:w-[220px] mb-7 rounded-[15px] shadow-xl flex items-center font-medium">
          <Settings size={30} />
          <h1 className="text-xl md:text-2xl text-center font-medium ml-2">
            จัดการสินค้า
          </h1>
        </div>

        {/* ส่วนเนื้อหา */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full">
          {/* โปรไฟล์บอท */}
          <div className="bg-white p-5 rounded-[10px] shadow-xl text-center">
            
          </div>

          
        </div>
      </div>
    </>
  );
}
