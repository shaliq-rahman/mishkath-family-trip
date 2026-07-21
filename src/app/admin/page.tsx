"use client";

import Link from "next/link";
import { useMemo } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { fmt, getFamilyCollected, getFamilyFee } from "@/data/config";
import { useTripData } from "@/data/trip-store";

export default function AdminOverviewPage() {
  const { families, payments, spends, expenseCategories, adminRole, syncError } = useTripData();

  const totals = useMemo(() => {
    const expected = families.reduce((sum, family) => sum + getFamilyFee(family), 0);
    const collected = families.reduce((sum, family) => sum + getFamilyCollected(family), 0);
    const spent = spends.reduce((sum, spend) => sum + spend.amount, 0);
    const budget = expenseCategories.reduce((sum, category) => sum + category.expected, 0);
    return { expected, collected, pending: expected - collected, spent, remaining: collected - spent, budget };
  }, [expenseCategories, families, spends]);

  return (
    <AdminShell title="Overview" action={<Link href="/admin/settings" className="glass-soft rounded-full px-3 py-2 text-[11px] font-black text-[#0f766e]">Settings</Link>}>
      <section className="glass-panel rounded-[26px] p-4">
        <div className="grid grid-cols-2 gap-3">
          <Metric label="Collected" value={fmt(totals.collected)} tone="text-[#0f766e]" />
          <Metric label="To Collect" value={fmt(totals.pending)} tone="text-[#ef4444]" />
          <Metric label="Spent" value={fmt(totals.spent)} tone="text-[#123331]" />
          <Metric label="Remaining" value={fmt(totals.remaining)} tone="text-[#0f766e]" />
        </div>
      </section>

      {syncError && (
        <p className="mt-4 rounded-[18px] bg-red-50/80 px-3 py-2 text-center text-[11px] font-bold text-[#ef4444]">
          {syncError}
        </p>
      )}

      <section className="glass-card mt-4 rounded-[24px] p-4">
        <div className="grid grid-cols-2 gap-3">
          <Metric label="Families" value={String(families.length)} tone="text-[#123331]" />
          <Metric label="Members" value={String(families.reduce((sum, family) => sum + family.members.length, 0))} tone="text-[#123331]" />
          <Metric label="Payments" value={String(payments.length)} tone="text-[#123331]" />
          <Metric label="Budget" value={fmt(totals.budget)} tone="text-[#123331]" />
        </div>
      </section>

      <section className="glass-card mt-4 rounded-[24px] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-black text-[#123331]">Latest Activity</h2>
          <span className="rounded-full bg-white/60 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#0f766e]">
            {adminRole}
          </span>
        </div>
        <div className="mt-3 space-y-2">
          {payments.slice(-3).reverse().map((payment) => (
            <div key={payment.id} className="flex items-center justify-between rounded-[16px] bg-white/40 px-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-[12px] font-black text-[#123331]">{payment.personName}</p>
                <p className="truncate text-[11px] font-bold text-[#64748b]">{payment.familyName}</p>
              </div>
              <p className="text-[12px] font-black text-[#0f766e]">{fmt(payment.amount)}</p>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-[18px] bg-white/45 p-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#64748b]">{label}</p>
      <p className={`mt-1 text-[20px] font-black ${tone}`}>{value}</p>
    </div>
  );
}
