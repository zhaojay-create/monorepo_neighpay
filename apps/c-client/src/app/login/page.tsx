"use client";

import { signup } from "@/lib/auth/auth";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, action, pending] = useActionState(signup, undefined);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl") ?? "";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center">手机登录</h1>

        <form action={action} className="space-y-4">
          <input type="hidden" name="redirectUrl" value={redirectUrl} />
          <div>
            <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">
              手机号
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入手机号"
              defaultValue={17735118191}
              required
            />
          </div>
          {state?.errors?.phone && <p>{state.errors.phone}</p>}

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-600 mb-1"
            >
              密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入密码"
              defaultValue="123456"
              required
            />
          </div>
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-500 text-white rounded py-2 text-sm font-medium hover:bg-blue-600 transition"
          >
            {pending ? "登录中..." : "登录 / 注册"}
          </button>
        </form>
      </div>
    </div>
  );
}
