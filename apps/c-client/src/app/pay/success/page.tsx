"use client";

import { Coupon } from "@/prisma/lib/generated/prisma";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("out_trade_no");
  const [cashbackCoupon, setCashbackCoupon] = useState<Coupon>();
  const { title, description, amount, expiredAt } = cashbackCoupon || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    const queryAlipayOrder = async () => {
      try {
        const result = await fetch("/api/order/query?orderId=" + orderId);
        const res = await result.json();
        if (res.success && res.cashbackCoupon) {
          setCashbackCoupon(res.cashbackCoupon);
        }
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    };
    queryAlipayOrder();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f8fa] to-[#e9ebee] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 shadow-inner">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">支付成功</h1>
        <p className="text-gray-500 mb-6">感谢您的支付！</p>

        {loading && <div className="text-gray-400 mb-4">正在获取返利中...</div>}

        {cashbackCoupon && !loading && (
          <div className="w-full bg-gradient-to-r from-[#f9fafc] to-[#f1f3f6] rounded-2xl p-5 mb-4 border border-[#e5e7eb] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-gray-800">
                {title || "返利券"}
              </span>
              <span className="text-green-500 text-xl font-bold">
                ￥{Number(amount)}
              </span>
            </div>
            <div className="text-gray-400 text-sm mb-1">
              {description || "可在下次消费时使用"}
            </div>
            <div className="text-gray-400 text-xs">
              有效期至：
              {expiredAt ? new Date(expiredAt).toLocaleDateString() : "--"}
            </div>
          </div>
        )}

        <button
          className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-[#34c759] to-[#30b158] text-white text-lg font-semibold shadow-md active:scale-95 transition"
          onClick={() => (window.location.href = "/")}
        >
          返回首页
        </button>
      </div>
    </div>
  );
};

export default Page;
