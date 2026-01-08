"use client";

import { cn, ScrollShadow } from "@heroui/react";
import Link from "next/link";

import { SidebarBrand } from "./sidebarBrand";
import { SidebarUser } from "./sidebarUser";

const menuItems = [{ href: "/", label: "Home", icon: "icon-[heroicons--home]" }];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} aria-hidden="true" />}
      <aside
        className={cn(
          "border-divider bg-background fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r transition-transform duration-300 md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 md:hidden">
          <button
            onClick={onClose}
            className="text-foreground flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-default-100"
            aria-label="Cerrar menú"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <SidebarBrand />
        <ScrollShadow className="flex-1 overflow-y-auto px-4">
          <nav className="listbox">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className="listbox-item" onClick={onClose}>
                <span className={cn(item.icon, "text-lg")}></span>
                {item.label}
              </Link>
            ))}
          </nav>
        </ScrollShadow>
        <SidebarUser />
      </aside>
    </>
  );
}
