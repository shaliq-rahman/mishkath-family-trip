"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { useTripData } from "@/data/trip-store";

const adminTabs = [
  {
    label: "Overview",
    href: "/admin",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: "Family",
    href: "/admin/families",
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
    href: "/admin/spends",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
];

export function AdminShell({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdmin, adminRole, syncStatus, logout } = useTripData();

  function handleLogout() {
    logout();
    router.push("/admin/login");
  }

  if (!isAdmin) {
    return (
      <main className="textured-page flex min-h-screen items-center px-5 py-8 text-[#0f172a]">
        <section className="glass-panel relative z-10 w-full rounded-[30px] p-5 text-center">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#ef4444]">Locked</p>
          <h1 className="mt-2 text-[30px] font-black text-[#123331]">Admin Login Required</h1>
          <Link
            href="/admin/login"
            className="mt-5 inline-flex rounded-[18px] bg-[#0f766e] px-5 py-3 text-sm font-black text-white"
          >
            Go to Login
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="textured-page min-h-screen px-5 pb-[122px] pt-6 text-[#0f172a]">
      <header className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#0f766e]">
            {adminRole === "superadmin" ? "Superadmin" : "Admin"}
          </p>
          <h1 className="mt-1 text-[32px] font-black text-[#123331]">{title}</h1>
          <p className="mt-1 text-[11px] font-bold text-[#64748b]">
            Database: {syncStatus === "idle" ? "ready" : syncStatus}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {action}
          <button
            type="button"
            onClick={handleLogout}
            className="glass-soft rounded-full px-4 py-2 text-[11px] font-black text-[#0f766e]"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="relative z-10 mt-5">{children}</div>

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
        {adminTabs.map((tab) => {
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
    </main>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#64748b]">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export const inputClass =
  "w-full rounded-[16px] border border-white/60 bg-white/45 px-3 py-2.5 text-sm font-bold text-[#123331] outline-none backdrop-blur-xl";
