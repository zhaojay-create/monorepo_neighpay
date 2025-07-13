import { type Coupon } from "@repo/db";

export function serializeCoupon(coupon: Coupon) {
  return {
    ...coupon,
    amount: coupon.amount.toNumber(),
    expiredAt: coupon.expiredAt.toISOString(),
    issuedAt: coupon.issuedAt.toISOString(),
  };
}
