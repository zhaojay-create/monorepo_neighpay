import Link from "next/link";
import { redirect } from "next/navigation";

// import prisma from "@/lib/prisma";
// import { CouponStatus } from "@/prisma/lib/generated/prisma";
import { prisma, CouponStatus } from "@repo/db";
import { getUser } from "@/lib/auth/dal";
import CollarCounponBtn from "./CollarCounponBtn";

async function RecentCoupons() {
  // 1. 获取用户
  const user = await getUser();
  if (!user) redirect("/login");
  // 2. 获取用户的优惠券, 过滤掉已经过期的
  const coupons = await prisma.coupon.findMany({
    where: {
      userId: user.id,
      status: CouponStatus.unused,
      expiredAt: {
        gt: new Date(), // ✅ 过滤掉过期的
      },
    },
    orderBy: {
      issuedAt: "desc",
    },
    include: {
      fromMerchant: {
        select: {
          name: true, // ✅ 顺便查商家名
        },
      },
    },
  });

  // 3. 如果没有优惠券, 就展示去领取优惠券
  if (coupons.length === 0) {
    return (
      <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow">
        <div>暂无可用优惠券哦~</div>
        <CollarCounponBtn />
      </div>
    );
  }

  // 4. 找到最近的优惠券, 找到优惠金额最大的优惠券
  // 最近的优惠券 == 金额最大的优惠券 就只展示一个
  const recentCoupon = coupons[0];
  const maxAmountCoupon = coupons
    .slice()
    .sort((a, b) => Number(b.amount) - Number(a.amount))[0];

  const showCoupons =
    recentCoupon.id === maxAmountCoupon.id
      ? [recentCoupon]
      : [recentCoupon, maxAmountCoupon];

  // 5. 如果有优惠券, 就展示优惠券
  return (
    <div className="bg-blue-50 p-4  space-y-3">
      <div className="shadow bg-white rounded-2xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-800">
            最近获得的返利券
          </h2>
          <Link href="/profile/coupons" className="text-blue-500 text-sm">
            查看全部
          </Link>
        </div>

        {showCoupons.map((coupon) => (
          <div key={coupon.id} className="bg-muted/50 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-green-600 text-lg">
                ￥{Number(coupon.amount).toFixed(2)}
              </span>
              <span className="text-sm text-gray-500">
                来自：{coupon.fromMerchant?.name || "未知商户"}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              有效期至：{new Date(coupon.expiredAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentCoupons;
