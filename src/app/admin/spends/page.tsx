"use client";

import { FormEvent, useState } from "react";
import { AdminShell, Field, inputClass } from "@/components/admin/AdminShell";
import { fmt } from "@/data/config";
import { useTripData } from "@/data/trip-store";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function AdminSpendsPage() {
  const { spends, expenseCategories, addSpend, syncError } = useTripData();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(expenseCategories[0]?.name ?? "");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today());

  function submitSpend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!description.trim() || !category || Number(amount) <= 0) return;

    addSpend({
      description,
      category,
      amount: Number(amount),
      date,
    });
    setDescription("");
    setAmount("");
  }

  return (
    <AdminShell title="Spends">
      <section className="glass-card rounded-[24px] p-4">
        <h2 className="text-[15px] font-black text-[#123331]">Add Spend</h2>
        <form onSubmit={submitSpend} className="mt-4 space-y-3">
          <Field label="Description">
            <input value={description} onChange={(event) => setDescription(event.target.value)} className={inputClass} />
          </Field>
          <Field label="Category">
            <input
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={inputClass}
              placeholder="E.g., Transport, Food..."
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Amount">
              <input value={amount} onChange={(event) => setAmount(event.target.value)} type="number" className={inputClass} />
            </Field>
            <Field label="Date">
              <input value={date} onChange={(event) => setDate(event.target.value)} type="date" className={inputClass} />
            </Field>
          </div>
          <button type="submit" className="w-full rounded-[18px] bg-[#ef4444] px-4 py-3 text-sm font-black text-white">
            Save Spend
          </button>
        </form>
      </section>

      {syncError && <p className="mt-3 rounded-[16px] bg-red-50/80 px-3 py-2 text-center text-[11px] font-bold text-[#ef4444]">{syncError}</p>}

      <section className="glass-card mt-4 rounded-[24px] p-4">
        <h2 className="text-[15px] font-black text-[#123331]">All Spends</h2>
        <div className="mt-3 space-y-2">
          {spends.slice().reverse().map((spend) => (
            <div key={spend.id} className="flex items-center justify-between gap-3 rounded-[16px] bg-white/40 px-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-black text-[#123331]">{spend.description}</p>
                <p className="truncate text-[11px] font-bold text-[#64748b]">{spend.category}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-black text-[#ef4444]">-{fmt(spend.amount)}</p>
                <p className="text-[10px] font-bold text-[#64748b]">{spend.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
