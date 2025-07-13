"use client";

import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import React from "react";

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  activeClassName?: string;
  className?: string;
}

export function NavLink({
  href,
  children,
  className,
  activeClassName = "text-blue-500 font-semibold",
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(className, isActive && activeClassName)}
      {...props}
    >
      {children}
    </Link>
  );
}
