import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { getSession } from "@/auth/lib/jose";
import { DashLayout } from "@/core/layout/dashLayout";
import { QueryProvider } from "@/core/lib/reactQuery";
import { ThemeProvider } from "@/core/provider/theme";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Hero 3",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="es">
      <body className={`${inter.variable} bg-background text-foreground antialiased`}>
        <ThemeProvider>
          <QueryProvider>{!session ? children : <DashLayout>{children}</DashLayout>}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
