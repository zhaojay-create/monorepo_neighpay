import React, { FC } from "react";
import { NavLink } from "./NavLink";
import { Home, ReceiptText, User } from "lucide-react";

const FooterNavLink: FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t flex justify-around items-center shadow-sm z-50">
      <NavLink
        href="/dashboard"
        className="text-gray-500 flex flex-col items-center"
      >
        <Home className="w-5 h-5" />
        <span className="text-xs">首页</span>
      </NavLink>
      <NavLink
        href="/dashboard/bill"
        className="text-gray-500 flex flex-col items-center"
      >
        <ReceiptText className="w-5 h-5" />
        <span className="text-xs">账单</span>
      </NavLink>
      <NavLink
        href="/dashboard/profile"
        className="text-gray-500 flex flex-col items-center"
      >
        <User className="w-5 h-5" />
        <span className="text-xs">我的</span>
      </NavLink>
    </nav>
  );
};

export default FooterNavLink;
