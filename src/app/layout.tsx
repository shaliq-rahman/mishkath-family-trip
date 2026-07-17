import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/TopNav";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mishkath Banasura Family Trip 2026",
  description: "Trip fund tracker — Mishkath Banasura Family Trip 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${jakarta.variable} h-full`}>
      <body className="min-h-full" style={{ background: "var(--color-cream)" }}>
        {/* floating bottom nav sits above content */}
        <div style={{ paddingBottom: "100px" }}>{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
