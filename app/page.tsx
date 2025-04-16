import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import OrderChartWrapper from "@/components/charts/OrderChartWrapper";

export default async function Home() {
  const supabase = await createClient();
  const cookieStore = cookies();
  const b_id = cookieStore.get("botcode")?.value;

  if (!b_id) {
    return <p>ไม่พบข้อมูลผู้ใช้งาน</p>;
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select("timestamp, price, product")
    .eq("b_id", b_id)
    .order("timestamp", { ascending: true });

  if (error || !orders) {
    console.error("Error loading orders:", error?.message);
    return <p>โหลดข้อมูลไม่สำเร็จ</p>;
  }

  // 📊 คำนวณสถิติ
  const totalSales = orders.reduce((sum, order) => sum + (order.price || 0), 0);
  const totalOrders = orders.length;

  const productCount: Record<string, number> = {};
  for (const order of orders) {
    if (order.product) {
      productCount[order.product] = (productCount[order.product] || 0) + 1;
    }
  }

  const bestSeller =
    Object.entries(productCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  const grouped = orders.reduce((acc: Record<string, number>, order) => {
    const date = new Date(order.timestamp).toLocaleDateString("th-TH");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const graphData = Object.entries(grouped).map(([timestamp, total]) => ({
    timestamp,
    total,
  }));

  // Convert totalSales to remove leading zero and format it
  const formattedTotalSales = parseFloat(totalSales.toString()).toLocaleString();

  return (
    <>
      <Header />
      <div className="pt-16 md:pt-[120px] px-4 md:px-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <StatCard title="ยอดขายรวม" value={`${formattedTotalSales} บาท`} />
          <StatCard title="จำนวนออเดอร์ทั้งหมด" value={`${totalOrders} ออเดอร์`} />
          <StatCard title="สินค้ายอดนิยม" value={bestSeller} />
        </div>

        <div className="bg-white rounded-xl shadow-xl p-5">
          <h2 className="text-xl font-semibold mb-4">จำนวนออเดอร์รายวัน</h2>
          <OrderChartWrapper data={graphData} />
        </div>
      </div>
    </>
  );
}

// 📦 StatCard: แสดงกล่องสถิติ
function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-xl text-center">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-xl sm:text-2xl font-bold text-black">{value}</p>
    </div>
  );
}
