import { prisma } from "@repo/db";
import Link from "next/link";
import React, { FC } from "react";
import { Card, CardContent } from "../ui/card";

const RecommendMerchant: FC = async () => {
  // 1. 查询推荐商户
  // todo: 之后引入商圈的概念
  const merchants = (await prisma.merchant.findMany()).slice(0, 3);

  return (
    <div className="p-4">
      <div className="bg-white rounded-2xl p-4 shadow space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-800">推荐商户</h2>
          <Link href="/merchants" className="text-blue-500 text-sm">
            查看全部
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {merchants.map((item, idx) => (
            <Link href={`/pay/${item.id}`} key={item.id}>
              <Card className="hover:shadow-md transition">
                <CardContent className="p-4 flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-gray-300" />
                  <div className="text-sm font-semibold text-gray-800">
                    商户 {idx + 1}
                  </div>
                  <div className="text-xs text-gray-500 truncate text-center">
                    {item.name}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendMerchant;
