"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: "Families",
    href: "/families",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "Spends",
    href: "/spends",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
  {
    label: "Budget",
    href: "/expenses",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: "26px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 48px)",
        maxWidth: "382px",
        zIndex: 50,
        borderRadius: "26px",
        background: "rgba(255, 255, 255, 0.42)",
        backdropFilter: "blur(26px) saturate(165%)",
        WebkitBackdropFilter: "blur(26px) saturate(165%)",
        border: "1px solid rgba(255, 255, 255, 0.58)",
        boxShadow: "0 18px 40px rgba(18,45,42,0.14), inset 0 1px 0 rgba(255,255,255,0.56)",
        padding: "10px 10px 9px",
        display: "flex",
        alignItems: "center",
        gap: "2px",
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
              gap: "5px",
              padding: "5px 4px 4px",
              borderRadius: "16px",
              background: "transparent",
              color: isActive ? "#007a6d" : "#60676b",
              textDecoration: "none",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: isActive ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.2s ease",
              }}
            >
              {tab.icon}
            </span>
            <span
              style={{
                fontSize: "9px",
                fontWeight: isActive ? 700 : 500,
                lineHeight: 1,
                letterSpacing: "0",
              }}
            >
              {tab.label}
            </span>
            <span
              aria-hidden="true"
              style={{
                width: "24px",
                height: "3px",
                borderRadius: "999px",
                background: isActive ? "#007a6d" : "transparent",
                marginTop: "2px",
              }}
            />
          </Link>
        );
      })}
    </nav>
  );
}
