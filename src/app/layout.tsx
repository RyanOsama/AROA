import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import Drawers from "@/components/Drawers";

export const metadata: Metadata = {
  title: "AROA PERFUMES | أروى للعطور",
  description: "AROA PERFUMES - Luxury Scents · Timeless Elegance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <ToastProvider />
        <Drawers />
      </body>
    </html>
  );
}
