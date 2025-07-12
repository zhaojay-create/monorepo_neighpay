// app/not-found.tsx
"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-gray-600 text-sm mb-6">
        抱歉，您访问的页面不存在或已被删除。
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-600 transition"
      >
        返回首页
      </button>
    </div>
  );
}
