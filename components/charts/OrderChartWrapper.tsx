"use client";

import OrderChart from "./OrderChart";

export default function OrderChartWrapper({
  data,
}: {
  data: { timestamp: string; total: number }[];
}) {
  console.log(data); // ตรวจสอบข้อมูลที่ส่งไป
  return <OrderChart data={data} />;
}
