"use server";

// 实现发券的逻辑
import { redirect } from "next/navigation";
import { getUser } from "../auth/dal";
import { CouponStatus, CouponType, prisma } from "@repo/db";
import { serializeCoupon } from "@/utils/coupon";

export async function sendCoupon() {
  const user = await getUser();
  if (!user) return redirect("/login");

  let amount = 10;
  // 1. 查找到用户，之前券到所有记录
  const history = await prisma.coupon.findMany({
    where: { userId: user.id },
  });
  const unused = history.filter((c) => c.status === CouponStatus.unused);
  // 历史券(未使用的) 必然存在
  // 2. 如果数量小于10，就是新用户，金额为历史券(未使用的)的平均值
  if (history.length <= 10 && history.length > 0) {
    const sum = unused.reduce((acc, cur) => acc + Number(cur.amount), 0);
    amount = Math.min(sum / history.length, amount);
  }
  // 3. 如果数量大于10，就是老用户，金额为历史券(未使用的)的平均值的一半
  if (history.length > 10) {
    const sum = unused.reduce((acc, cur) => acc + Number(cur.amount), 0);
    amount = Math.min(sum / history.length / 2, amount);
  }

  try {
    const suffix = new Date().toLocaleTimeString("zh-CN");
    const coupon = await prisma.coupon.create({
      data: {
        userId: user?.id,
        fromMerchantId: "9edca091-7ff0-4540-953c-b538fd3cb549",
        amount: Math.max(1, amount),
        status: "unused",
        couponType: CouponType.gift,
        title: `福利券-${suffix}`,
        description: `come from 福利 ${suffix}`,
        sourceOrderId: null,
        expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    return { ...serializeCoupon(coupon), error: null };
  } catch (error) {
    console.error("error: ", error);
    return { error: "发券失败" };
  }
}
