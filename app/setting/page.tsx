import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { updatePassword, signOutAction } from "@/app/actions";
import { Settings } from "lucide-react";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export default async function Setting(props: {
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
            หน้าการตั้งค่า
          </h1>
        </div>

        {/* ส่วนเนื้อหา */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* โปรไฟล์บอท */}
          <div className="bg-white p-5 rounded-[10px] shadow-xl text-center">
            <h1 className="text-xl md:text-2xl">โปรไฟล์บอท</h1>
          </div>

          {/* เปลี่ยนรหัสผ่าน */}
          <div className="bg-white p-5 rounded-[10px] shadow-xl">
            <form className="flex flex-col">
              <h1 className="text-xl md:text-2xl text-center mb-2">
                เปลี่ยนรหัสผ่าน
              </h1>

              <div className="flex flex-col gap-4">
                <Label
                  htmlFor="n_password"
                  className="text-sm font-medium text-gray-700"
                >
                  รหัสผ่านใหม่
                </Label>
                <Input
                  name="n_password"
                  type="password"
                  required
                  className="border-2 border-gray-300 rounded-[9px] px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                />

                <Label
                  htmlFor="cn_password"
                  className="text-sm font-medium text-gray-700"
                >
                  ยืนยันรหัสผ่าน
                </Label>
                <Input
                  name="cn_password"
                  type="password"
                  required
                  className="border-2 border-gray-300 rounded-[9px] px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                />

                <Label
                  htmlFor="o_password"
                  className="text-sm font-medium text-gray-700"
                >
                  รหัสผ่านเก่า
                </Label>
                <Input
                  name="o_password"
                  type="password"
                  required
                  className="border-2 border-gray-300 rounded-[9px] px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                />

                <SubmitButton
                  pendingText="กำลังเปลี่ยนรหัสผ่าน..."
                  formAction={updatePassword}
                  className="mt-4 text-white bg-black rounded-xl py-2 px-4 shadow-md hover:bg-black/80 transition duration-300"
                >
                  เปลี่ยนรหัสผ่าน
                </SubmitButton>

                <FormMessage message={searchParams} />
              </div>
            </form>

            <Button
              onClick={signOutAction}
              className="mt-4 w-full text-red-600 bg-transparent border-2 border-red-600 rounded-[10px] py-2 px-4 shadow-md hover:bg-red-600 hover:text-white transition duration-300"
            >
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
