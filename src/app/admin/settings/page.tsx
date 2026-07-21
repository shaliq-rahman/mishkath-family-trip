"use client";

import { useState } from "react";
import { AdminShell, Field, inputClass } from "@/components/admin/AdminShell";
import { useTripData } from "@/data/trip-store";
import { fmt } from "@/data/config";

function AddCategoryForm({ onAdd }: { onAdd: (name: string, expected: number) => void }) {
  const [name, setName] = useState("");
  const [expected, setExpected] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (name.trim() && Number(expected) >= 0) {
          onAdd(name.trim(), Number(expected));
          setName("");
          setExpected("");
        }
      }}
      className="mt-3 flex gap-2 rounded-[16px] bg-white/30 p-2"
    >
      <input
        type="text"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-[12px] border border-white/60 bg-white/45 px-3 py-2 text-xs font-bold text-[#123331] outline-none"
      />
      <input
        type="number"
        placeholder="Budget"
        value={expected}
        onChange={(e) => setExpected(e.target.value)}
        className="w-full rounded-[12px] border border-white/60 bg-white/45 px-3 py-2 text-xs font-bold text-[#123331] outline-none"
      />
      <button
        type="submit"
        className="rounded-[12px] bg-[#0f766e] px-4 text-[11px] font-black text-white"
      >
        Add
      </button>
    </form>
  );
}

export default function AdminSettingsPage() {
  const {
    adminRole,
    resetData,
    syncError,
    syncStatus,
    expenseCategories,
    spends,
    updateCategoryBudget,
    addCategory,
  } = useTripData();

  const totalBudget = expenseCategories.reduce((sum, category) => sum + category.expected, 0);
  const totalSpent = spends.reduce((sum, spend) => sum + spend.amount, 0);

  return (
    <AdminShell title="Settings">
      <section className="glass-panel rounded-[26px] p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#64748b]">Signed in as</p>
        <p className="mt-1 text-[24px] font-black capitalize text-[#123331]">{adminRole}</p>
        <p className="mt-1 text-[12px] font-bold text-[#64748b]">
          {adminRole === "superadmin"
            ? "You can manage all trip data and reset the database."
            : "You can manage trip data. Database reset requires superadmin."}
        </p>
      </section>

      <section className="glass-card mt-4 rounded-[24px] p-4">
        <div className="mb-4 grid grid-cols-2 gap-3">
          <Metric label="Total Budget" value={fmt(totalBudget)} tone="text-[#123331]" />
          <Metric label="Total Spent" value={fmt(totalSpent)} tone="text-[#ef4444]" />
        </div>

        <h2 className="text-[15px] font-black text-[#123331]">Expense Categories</h2>
        <AddCategoryForm onAdd={addCategory} />

        <div className="mt-4 space-y-3">
          {expenseCategories.map((category) => {
            const spent = spends
              .filter((spend) => spend.category === category.name)
              .reduce((sum, spend) => sum + spend.amount, 0);
            return (
              <div key={category.name} className="rounded-[18px] bg-white/40 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-black text-[#123331]">
                      {category.icon} {category.name}
                    </p>
                    <p className="text-[11px] font-bold text-[#64748b]">Spent {fmt(spent)}</p>
                  </div>
                  <p className="text-[12px] font-black text-[#0f766e]">{fmt(category.expected)}</p>
                </div>
                <div className="mt-3">
                  <Field label="Expected Budget">
                    <input
                      value={category.expected}
                      onChange={(event) => updateCategoryBudget(category.name, Number(event.target.value))}
                      type="number"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="glass-card mt-4 rounded-[24px] p-4">
        <h2 className="text-[15px] font-black text-[#123331]">Database Reset</h2>
        <p className="mt-1 text-[12px] font-bold text-[#64748b]">
          Reset replaces the saved database row with the original seed data.
        </p>
        <button
          type="button"
          onClick={resetData}
          disabled={adminRole !== "superadmin" || syncStatus === "saving"}
          className="mt-4 w-full rounded-[18px] bg-[#ef4444] px-4 py-3 text-sm font-black text-white shadow-[0_14px_28px_rgba(239,68,68,0.18)] disabled:cursor-not-allowed disabled:opacity-45"
        >
          {syncStatus === "saving"
            ? "Resetting..."
            : adminRole === "superadmin"
              ? "Reset Database Data"
              : "Superadmin Required"}
        </button>
      </section>

      {syncError && (
        <p className="mt-3 rounded-[16px] bg-red-50/80 px-3 py-2 text-center text-[11px] font-bold text-[#ef4444]">
          {syncError}
        </p>
      )}
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
