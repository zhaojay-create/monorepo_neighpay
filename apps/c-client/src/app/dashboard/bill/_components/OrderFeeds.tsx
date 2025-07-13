"use client";

import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";
import { buildUrl, fetcher } from "@/utils";
import { useEffect } from "react";
import OrderCard from "./OrderCard";
import { Order } from "@repo/db";

const PAGE_SIZE = 6;

export default function OrdersFeed({
  keyword = "",
  range = "",
}: {
  keyword?: string;
  range?: string;
}) {
  const { ref, inView } = useInView({ threshold: 0 });

  const getKey = (pageIndex: number, prev: { orders: Order[] }) => {
    if (prev && prev.orders.length === 0) return null;
    return buildUrl(`/api/order/queryFeeds`, {
      page: String(pageIndex + 1),
      keyword,
      range,
    });
  };

  const { data, isLoading, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher
  );

  const orders = data?.flatMap((d) => d.orders) || [];
  const isEmpty = orders.length === 0;
  const isReachingEnd =
    data && data[data.length - 1]?.orders.length < PAGE_SIZE;

  // ⬇ 每次滚动到底自动加载下一页
  useEffect(() => {
    if (inView && !isReachingEnd && !isValidating) {
      setSize(size + 1);
    }
  }, [inView, isReachingEnd, isValidating, setSize, size]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1  gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (isEmpty) {
    return <div className="text-center text-gray-400 py-12">暂无订单</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1  gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {!isReachingEnd && (
        <div ref={ref} className="text-center text-gray-500 py-6">
          加载中...
        </div>
      )}
      {isReachingEnd && (
        <div className="text-center text-gray-400 py-6">没有更多订单了</div>
      )}
    </div>
  );
}
