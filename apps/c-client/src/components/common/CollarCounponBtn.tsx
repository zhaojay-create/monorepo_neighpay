"use client";

import { FC, useActionState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { sendCoupon } from "@/lib/coupons/send";

const CollarCounponBtn: FC = () => {
  // const [, action, pending] = useActionState(sendCoupon, undefined);
  const router = useRouter();
  const [state, action, pending] = useActionState(async () => {
    const result = await sendCoupon();
    router.refresh(); // 关键：刷新页面，RecentCoupons 会重新获取数据
    return result;
  }, undefined);

  return (
    <form action={action}>
      <Button
        type="submit"
        disabled={pending}
        className="bg-blue-500 text-white rounded-xl py-2 text-sm font-medium transition"
      >
        {pending ? "加速领取中..." : "一键领取"}
      </Button>
      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
    </form>
  );
};

export default CollarCounponBtn;
