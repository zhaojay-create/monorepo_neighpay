import { type Order } from "@repo/db";

export default function OrderCard({ order }: { order: Order }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-2">
      <div className="text-sm text-gray-500">订单号：{order.id}</div>
      <div className="font-semibold">{order.merchant?.name}</div>
      <div className="text-green-600 font-bold">
        ￥{Number(order.amount).toFixed(2)}
      </div>
      <div className="text-xs text-gray-400">
        创建时间：{new Date(order.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
