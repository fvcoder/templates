"use client";

import { APP_LOGO, APP_NAME } from "@/core/lib/env.public";

interface NavbarProps {
  onMenuToggle: () => void;
}

export function Navbar({ onMenuToggle }: NavbarProps) {
  return (
    <header className="border-divider bg-background sticky top-0 z-40 flex h-16 items-center gap-4 border-b px-4 md:hidden">
      <button
        onClick={onMenuToggle}
        className="text-foreground flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-default-100"
        aria-label="Abrir menú"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <div className="flex items-center gap-3">
        <img src={APP_LOGO} alt={APP_NAME} className="h-8 w-8 object-contain" />
        <h1 className="text-foreground text-lg font-bold">{APP_NAME}</h1>
      </div>
    </header>
  );
}
