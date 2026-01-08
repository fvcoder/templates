"use client";

import React, { useState } from "react";

import { Navbar } from "@/core/components/navbar";
import { Sidebar } from "@/core/components/sidebar";

interface DashLayoutProps {
  children: React.ReactNode;
}

export function DashLayout(props: DashLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden md:flex-row">
      <Navbar onMenuToggle={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <main className="flex-1 overflow-y-auto">{props.children}</main>
    </div>
  );
}
