import { createClient } from "@/utils/supabase/server";
import { Message } from "@/components/form-message";
import { Settings } from "lucide-react";
import { cookies } from "next/headers";
import Header from "@/components/Header";

export default async function OrdersPage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  const cookieStore = await cookies(); // ไม่ต้อง await
  const userBotCode = cookieStore.get("botcode")?.value;

  // ดึงข้อมูล orders จาก Supabase ตาม botcode
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("b_id", userBotCode)
    .order("timestamp", { ascending: false });

  if (error) {
    console.log("Error fetching orders:", error.message);
  }

  return (
    <>
      <Header />
      <div className="pt-[120px] px-4 md:px-9">
        <div className="flex w-full">
          <div className="p-5 bg-white w-full md:w-[300px] mb-7 rounded-[15px] shadow-xl flex items-center font-medium">
            <Settings size={30} />
            <h1 className="text-xl md:text-2xl text-center font-medium ml-2">
              จัดการออเดอร์ทั้งหมด
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full">
          <div className="bg-white p-5 rounded-[10px] shadow-xl text-center">
            <div className="relative overflow-x-auto mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">สินค้า</th>
                    <th className="px-6 py-3">อีเมลลูกค้า</th>
                    <th className="px-6 py-3">ราคา</th>
                    <th className="px-6 py-3">สถานะ</th>
                    <th className="px-6 py-3">ผู้สั่งซื้อ</th>
                    <th className="px-6 py-3">เวลา</th>
                    <th className="px-6 py-3">ตัวเลือก</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order.id} className="bg-white border-b">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {order.product}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {order.email}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {order.price} บาท
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {order.status ? "✅ สำเร็จ" : "⏳ รอดำเนินการ"}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {order.username}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {new Date(order.timestamp).toLocaleString("th-TH")}
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-900">
                        {order.status === true ? (
                          "✅ สำเร็จ"
                        ) : order.status === false ? (
                          <div className="space-y-1">
                            <button
                              onClick={async () => {
                                "use server";
                                const supabase = await createClient();
                                await supabase
                                  .from("orders")
                                  .update({ status: true })
                                  .eq("id", order.id);
                              }}
                              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                            >
                              สำเร็จ
                            </button>
                            <br />
                            <button
                              onClick={async () => {
                                "use server";
                                const supabase = await createClient();
                                await supabase
                                  .from("orders")
                                  .update({ status: null })
                                  .eq("id", order.id);
                              }}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              ล้มเหลว
                            </button>
                          </div>
                        ) : (
                          "❌ ล้มเหลว"
                        )}
                      </td>
                    </tr>
                  ))}

                  {orders?.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-5">
                        ไม่พบออเดอร์
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
