"use client";

import Image from "next/image";
import Link from "next/link";
import {
  getFamilyFee,
  getFamilyCollected,
  fmt,
  TRIP_DESTINATION,
  TRIP_DATES,
} from "@/data/config";
import { useTripData } from "@/data/trip-store";

const familyColors: Record<string, string> = {
  "1": "#0f766e",
  "2": "#2563eb",
  "3": "#7c3aed",
  "4": "#ef4444",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function percent(value: number, total: number) {
  return total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
}

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.7 3.4c.4.4.4 1 .1 1.5L15.4 14l1.1 5.4c.1.4-.1.8-.4 1l-1 .7c-.4.3-.9.2-1.2-.2l-2.8-4.2-4.2-2.8c-.4-.3-.5-.8-.2-1.2l.7-1c.2-.3.6-.5 1-.4l5.4 1.1 9.1-6.4c.5-.3 1.1-.3 1.5.1Z" />
      <path d="M8.7 7.9 4.5 5.8c-.4-.2-.5-.7-.2-1.1l.4-.6c.2-.3.6-.4.9-.3l6.1 1.4-3 2.7Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M3 10h18" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 8H6.5A3.5 3.5 0 0 0 3 11.5v5A3.5 3.5 0 0 0 6.5 20H20a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Z" />
      <path d="M6 8V6.5A2.5 2.5 0 0 1 8.5 4H18" />
      <path d="M17 14h.01" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 12 20 4" />
      <path d="M17 4h3v3" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
      <circle cx="10" cy="8" r="3" />
      <path d="M20 19v-1a3 3 0 0 0-2-2.8" />
      <path d="M17 5.2a3 3 0 0 1 0 5.6" />
    </svg>
  );
}

export default function Home() {
  const { families, payments, spends } = useTripData();
  const totalExpected = families.reduce((sum, family) => sum + getFamilyFee(family), 0);
  const totalCollected = families.reduce((sum, family) => sum + getFamilyCollected(family), 0);
  const totalPending = totalExpected - totalCollected;
  const totalSpent = spends.reduce((sum, spend) => sum + spend.amount, 0);
  const cashLeft = totalCollected - totalSpent;
  const totalMembers = families.reduce((sum, family) => sum + family.members.length, 0);
  const fundedPct = percent(totalCollected, totalExpected);
  const recentPayments = [...payments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <main className="textured-page min-h-screen pb-[126px] text-[#142322]">
      <section className="relative min-h-[336px] overflow-hidden px-5 pb-16 pt-6">
        <Image
          src="/resort-banner.png"
          alt="Luxury resort"
          fill
          priority
          sizes="430px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,35,32,0.22)_0%,rgba(247,247,244,0.08)_36%,rgba(247,247,244,0.92)_84%,#f7f7f4_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(255,255,255,0.60),transparent_26%),radial-gradient(circle_at_8%_78%,rgba(20,184,166,0.24),transparent_34%)]" />

        <div className="relative z-10 flex items-center justify-between">
          <span className="glass-soft inline-flex h-9 items-center gap-2 rounded-full px-3 text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#004a43]">
            <span className="h-3.5 w-3.5">
              <PlaneIcon />
            </span>
            Family Trip 2026
          </span>

          <Link
            href="/families"
            aria-label="Families"
            className="glass-soft flex h-10 w-10 items-center justify-center rounded-full text-[#004a43]"
          >
            <span className="h-5 w-5">
              <PeopleIcon />
            </span>
          </Link>
        </div>

        <div className="relative z-10 mt-10">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#0f766e]">
            Resort Fund Dashboard
          </p>
          <h1 className="mt-2 text-[50px] font-black uppercase leading-[0.86] tracking-normal text-[#003f39] drop-shadow-[0_2px_18px_rgba(255,255,255,0.55)]">
            MISHKATH
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="glass-soft inline-flex h-9 items-center gap-2 rounded-[14px] px-3 text-[11px] font-bold text-[#123331]">
              <span className="h-3.5 w-3.5 text-[#0f766e]">
                <PinIcon />
              </span>
              {TRIP_DESTINATION}
            </span>
            <span className="glass-soft inline-flex h-9 items-center gap-2 rounded-[14px] px-3 text-[11px] font-bold text-[#123331]">
              <span className="h-3.5 w-3.5 text-[#0f766e]">
                <CalendarIcon />
              </span>
              {TRIP_DATES}
            </span>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-24 px-5">
        <div className="overflow-hidden rounded-[32px] border border-white/55 bg-[#004a43]/82 text-white shadow-[0_26px_58px_rgba(0,74,67,0.28)] backdrop-blur-2xl">
          <div className="relative p-4 pb-3">
            <div className="absolute right-[-34px] top-[-34px] h-28 w-28 rounded-full border border-white/20 bg-white/10" />
            <div className="absolute bottom-[-44px] left-[-24px] h-28 w-28 rounded-full bg-[#2dd4bf]/18 blur-xl" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/70">
                  Fund Progress
                </p>
                <div className="mt-1.5 flex items-end gap-2">
                  <p className="text-[42px] font-black leading-none">{fundedPct}%</p>
                  <p className="pb-1 text-[13px] font-bold text-[#98f5d4]">Funded</p>
                </div>
                <p className="mt-1.5 text-[12px] font-semibold text-white/72">
                  {fmt(totalCollected)} collected of {fmt(totalExpected)}
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#79f2c5]/50 bg-white/10 text-[#79f2c5] backdrop-blur-xl">
                <span className="h-6 w-6">
                  <TargetIcon />
                </span>
              </div>
            </div>

            <div className="relative mt-3.5 h-2 overflow-hidden rounded-full bg-white/14">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#42e98a] via-[#2dd4bf] to-[#67e8f9] shadow-[16px_0_30px_rgba(45,212,191,0.35)]"
                style={{ width: `${fundedPct}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 divide-x divide-white/14 border-t border-white/14 bg-white/10 backdrop-blur-xl">
            <Link href="/families" className="px-3 py-2.5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">Families</p>
              <p className="mt-1 text-[20px] font-black">{families.length}</p>
            </Link>
            <Link href="/families" className="px-3 py-2.5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">Members</p>
              <p className="mt-1 text-[20px] font-black">{totalMembers}</p>
            </Link>
            <Link href="/spends" className="px-3 py-2.5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">Cash Left</p>
              <p className={`mt-1 text-[20px] font-black ${cashLeft < 0 ? "text-[#fecaca]" : "text-[#98f5d4]"}`}>
                {cashLeft < 0 ? "-" : ""}
                {fmt(Math.abs(cashLeft))}
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 pt-3">
        <div className="grid grid-cols-2 gap-3">
          <Link href="/families" className="glass-card rounded-[22px] p-3">
            <span className="glass-soft flex h-8 w-8 items-center justify-center rounded-[14px] text-[#0f766e]">
              <WalletIcon />
            </span>
            <p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0f766e]">Total Collected</p>
            <p className="mt-0.5 text-[19px] font-black text-[#0f766e]">{fmt(totalCollected)}</p>
          </Link>
          <Link href="/families" className="glass-card rounded-[22px] p-3">
            <span className="glass-soft flex h-8 w-8 items-center justify-center rounded-[14px] text-[#ef4444]">
              <WalletIcon />
            </span>
            <p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#ef4444]">To Collect</p>
            <p className="mt-0.5 text-[19px] font-black text-[#ef4444]">{fmt(totalPending)}</p>
          </Link>
        </div>
      </section>

      <section className="relative z-10 px-5 pt-4">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#0f766e]">Recent</p>
            <h2 className="text-[18px] font-black text-[#123331]">Payments</h2>
          </div>
          <Link href="/families" className="glass-soft rounded-full px-3 py-1.5 text-[11px] font-extrabold text-[#0f766e]">
            View all
          </Link>
        </div>

        <div className="glass-card overflow-hidden rounded-[26px]">
          {recentPayments.map((payment, index) => {
            const avatarColor = familyColors[payment.familyId] ?? "#0f766e";
            const paymentLabel = payment.kind === "family" ? "Family payment" : payment.type ?? "Payment";

            return (
              <div
                key={payment.id}
                className={`flex h-[55px] items-center gap-3 px-4 ${
                  index === 0 ? "" : "border-t border-white/45"
                }`}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-black text-white shadow-[0_8px_18px_rgba(15,23,42,0.12)]"
                  style={{ backgroundColor: avatarColor }}
                >
                  {payment.personName.charAt(0)}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-black text-[#123331]">{payment.personName}</p>
                  <p className="mt-0.5 truncate text-[11px] font-bold text-[#64748b]">
                    {payment.familyName.replace(" Family", "")} • {paymentLabel}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[15px] font-black text-[#0f766e]">+{fmt(payment.amount)}</p>
                  <p className="mt-0.5 text-[10px] font-bold text-[#64748b]">{formatDate(payment.date)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
