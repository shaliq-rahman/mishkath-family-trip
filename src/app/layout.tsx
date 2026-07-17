import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/TopNav";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
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
    <html lang="en" className={`${poppins.variable} h-full`}>
      <body className="min-h-full bg-[#f3f4f1] text-[#111e1d] antialiased">
        <div className="relative mx-auto flex min-h-screen max-w-[430px] flex-col overflow-hidden bg-[#f6f8f7] shadow-[0_0_50px_rgba(0,0,0,0.06)]">
          <div className="flex-1 pb-[110px]">{children}</div>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}

