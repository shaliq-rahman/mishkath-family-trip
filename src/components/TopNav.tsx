"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Home",     href: "/",         icon: "🏠" },
  { label: "Families", href: "/families",  icon: "👨‍👩‍👧" },
  { label: "Expenses", href: "/expenses",  icon: "📊" },
  { label: "Spends",   href: "/spends",    icon: "💸" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: "20px",
        left: "16px",
        right: "16px",
        zIndex: 50,
        borderRadius: "28px",
        background: "rgba(255, 255, 255, 0.82)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.65)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06)",
        padding: "8px 10px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              padding: "8px 6px",
              borderRadius: "20px",
              background: isActive ? "var(--color-teal-600)" : "transparent",
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
          >
            <span style={{ fontSize: "18px", lineHeight: 1 }}>{tab.icon}</span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "0.02em",
                color: isActive ? "#ffffff" : "var(--color-muted)",
              }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
