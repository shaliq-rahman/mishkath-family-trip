"use client";

import { FormEvent, useState } from "react";
import { AdminShell, Field, inputClass } from "@/components/admin/AdminShell";
import { FEE, fmt } from "@/data/config";
import { useTripData } from "@/data/trip-store";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function AdminPaymentsPage() {
  const { families, payments, addPayment, syncError } = useTripData();
  const [familyId, setFamilyId] = useState(families[0]?.id ?? "");
  const selectedFamily = families.find((family) => family.id === familyId) ?? families[0];
  const [personName, setPersonName] = useState(selectedFamily?.members[0]?.name ?? "");
  const selectedMember = selectedFamily?.members.find((member) => member.name === personName) ?? selectedFamily?.members[0];
  const [amount, setAmount] = useState("700");
  const [date, setDate] = useState(today());

  function submitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFamily || !selectedMember || Number(amount) <= 0) return;

    addPayment({
      familyId: selectedFamily.id,
      personName: selectedMember.name,
      type: selectedMember.type,
      amount: Number(amount),
      date,
    });
    setAmount("");
  }

  return (
    <AdminShell title="Payments">
      <section className="glass-card rounded-[24px] p-4">
        <h2 className="text-[15px] font-black text-[#123331]">Add Payment</h2>
        <form onSubmit={submitPayment} className="mt-4 space-y-3">
          <Field label="Family">
            <select
              value={familyId}
              onChange={(event) => {
                const nextFamily = families.find((family) => family.id === event.target.value);
                setFamilyId(event.target.value);
                setPersonName(nextFamily?.members[0]?.name ?? "");
              }}
              className={inputClass}
            >
              {families.map((family) => (
                <option key={family.id} value={family.id}>
                  {family.familyName}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Member">
            <select value={personName} onChange={(event) => setPersonName(event.target.value)} className={inputClass}>
              {selectedFamily?.members.map((member) => (
                <option key={member.name} value={member.name}>
                  {member.name} - {member.type} - fee {fmt(FEE[member.type])}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Amount">
              <input value={amount} onChange={(event) => setAmount(event.target.value)} type="number" className={inputClass} />
            </Field>
            <Field label="Date">
              <input value={date} onChange={(event) => setDate(event.target.value)} type="date" className={inputClass} />
            </Field>
          </div>
          <button type="submit" className="w-full rounded-[18px] bg-[#0f766e] px-4 py-3 text-sm font-black text-white">
            Save Payment
          </button>
        </form>
      </section>

      {syncError && <p className="mt-3 rounded-[16px] bg-red-50/80 px-3 py-2 text-center text-[11px] font-bold text-[#ef4444]">{syncError}</p>}

      <section className="glass-card mt-4 rounded-[24px] p-4">
        <h2 className="text-[15px] font-black text-[#123331]">Recent Payments</h2>
        <div className="mt-3 space-y-2">
          {payments.slice().reverse().map((payment) => (
            <div key={payment.id} className="flex items-center justify-between gap-3 rounded-[16px] bg-white/40 px-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-black text-[#123331]">{payment.personName}</p>
                <p className="truncate text-[11px] font-bold text-[#64748b]">
                  {payment.familyName} • {payment.kind === "family" ? "Family payment" : payment.type ?? "Payment"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-black text-[#0f766e]">+{fmt(payment.amount)}</p>
                <p className="text-[10px] font-bold text-[#64748b]">{payment.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
