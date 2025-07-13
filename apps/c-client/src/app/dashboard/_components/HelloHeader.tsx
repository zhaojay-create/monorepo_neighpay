import { getUser } from "@/lib/auth/dal";
import Image from "next/image";
import { Search, QrCode } from "lucide-react"; // 图标库

export default async function HelloHeader() {
  const user = await getUser();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-blue-50">
      {/* 👤 左侧头像 + 欢迎语 */}
      <div className="flex items-center space-x-3">
        <Image
          src={user?.avatar || "/avatar.jpeg"}
          alt="avatar"
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="text-lg font-semibold text-gray-800">
          👋 欢迎回来，{user?.name || "访客"}
        </div>
      </div>

      {/* 🔍 右侧搜索和扫码 */}
      <div className="flex items-center space-x-2">
        <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
          <Search className="w-5 h-5 text-gray-600" />
        </button>
        <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
          <QrCode className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
