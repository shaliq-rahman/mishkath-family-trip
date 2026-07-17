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
      <body className="min-h-full bg-[#f3f4f1] text-[#111e1d] antialiased">
        {/* Centered Mobile Container */}
        <div className="relative mx-auto flex min-h-screen max-w-[430px] flex-col bg-[#fbfbf9] shadow-[0_0_50px_rgba(0,0,0,0.06)] border-x border-[#10a39e]/15">
          <div className="flex-1 pb-[110px]">{children}</div>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}


