"use client";

import { families, expenseCategories, spends, getFamilyFee, getFamilyCollected, fmt } from "@/data/config";

export default function SummaryCard() {
  const totalExpected = families.reduce((s, f) => s + getFamilyFee(f), 0);
  const totalCollected = families.reduce((s, f) => s + getFamilyCollected(f), 0);
  const totalRemaining = totalExpected - totalCollected;
  const pct = Math.round((totalCollected / totalExpected) * 100);

  const totalBudget = expenseCategories.reduce((s, c) => s + c.expected, 0);
  const totalSpent = spends.reduce((s, sp) => s + sp.amount, 0);
  const budgetLeft = totalBudget - totalSpent;

  const totalFamilies = families.length;
  const totalMembers = families.reduce((s, f) => s + f.members.length, 0);

  return (
    <section className="animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
      {/* Collection Summary */}
      <div className="card p-6 mb-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl text-teal-800">Fund Collection</h2>
          <span
            className="text-sm font-semibold px-3 py-1 rounded-full"
            style={{ background: "var(--color-teal-100)", color: "var(--color-teal-700)" }}
          >
            {pct}% funded
          </span>
        </div>

        {/* Progress bar */}
        <div className="progress-bar-track mb-5">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>

        {/* 3 big metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-xl" style={{ background: "var(--color-teal-50)" }}>
            <p className="text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>
              Expected
            </p>
            <p className="text-lg font-bold" style={{ color: "var(--color-teal-700)" }}>
              {fmt(totalExpected)}
            </p>
          </div>
          <div className="text-center p-3 rounded-xl" style={{ background: "#f0fff4" }}>
            <p className="text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>
              Collected
            </p>
            <p className="text-lg font-bold text-green-700">{fmt(totalCollected)}</p>
          </div>
          <div className="text-center p-3 rounded-xl" style={{ background: "var(--color-coral-100)" }}>
            <p className="text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>
              Remaining
            </p>
            <p className="text-lg font-bold" style={{ color: "var(--color-coral-500)" }}>
              {fmt(totalRemaining)}
            </p>
          </div>
        </div>

        {/* Family + member count */}
        <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--color-muted)" }}>
            <span>🏠</span>
            <span>
              <strong className="text-teal-700">{totalFamilies}</strong> families
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--color-muted)" }}>
            <span>👥</span>
            <span>
              <strong className="text-teal-700">{totalMembers}</strong> members
            </span>
          </div>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-teal-800">Trip Budget</h2>
          <span
            className="text-sm font-semibold px-3 py-1 rounded-full"
            style={{ background: "var(--color-amber-100)", color: "#92400e" }}
          >
            {fmt(totalSpent)} spent
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-xl" style={{ background: "var(--color-teal-50)" }}>
            <p className="text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>
              Total Budget
            </p>
            <p className="text-lg font-bold" style={{ color: "var(--color-teal-700)" }}>
              {fmt(totalBudget)}
            </p>
          </div>
          <div className="text-center p-3 rounded-xl" style={{ background: "var(--color-amber-100)" }}>
            <p className="text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>
              Spent
            </p>
            <p className="text-lg font-bold text-amber-700">{fmt(totalSpent)}</p>
          </div>
          <div className="text-center p-3 rounded-xl" style={{ background: "#f0fff4" }}>
            <p className="text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>
              Left
            </p>
            <p className="text-lg font-bold text-green-700">{fmt(budgetLeft)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
