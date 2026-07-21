"use client";

import { AdminShell, inputClass } from "@/components/admin/AdminShell";
import { AGE_LABEL, FEE, fmt, getFamilyCollected, getFamilyFee, type PersonType } from "@/data/config";
import { useTripData } from "@/data/trip-store";
import { useState } from "react";

function today() {
  return new Date().toISOString().slice(0, 10);
}

function AddFamilyForm({ onAdd }: { onAdd: (name: string) => void }) {
  const [name, setName] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (name.trim()) {
          onAdd(name.trim());
          setName("");
        }
      }}
      className="flex gap-2"
    >
      <input
        type="text"
        placeholder="New family name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
      />
      <button
        type="submit"
        className="rounded-[16px] bg-[#0f766e] px-4 font-black text-white"
      >
        Add
      </button>
    </form>
  );
}

function AddMemberForm({ onAdd }: { onAdd: (member: { name: string; type: PersonType; paid: number }) => void }) {
  const [name, setName] = useState("");
  const [type, setType] = useState<PersonType>("adult");
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (name.trim()) {
          onAdd({ name: name.trim(), type, paid: 0 });
          setName("");
          setType("adult");
        }
      }}
      className="mt-3 grid grid-cols-[1fr_88px_58px] gap-2 rounded-[16px] bg-white/30 p-2"
    >
      <input
        type="text"
        placeholder="Member name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-[12px] border border-white/60 bg-white/45 px-3 py-2 text-xs font-bold text-[#123331] outline-none backdrop-blur-xl"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as PersonType)}
        className="w-full rounded-[12px] border border-white/60 bg-white/45 px-2 py-2 text-xs font-bold text-[#123331] outline-none backdrop-blur-xl"
      >
        <option value="adult">Adult</option>
        <option value="kid">Kid</option>
        <option value="infant">Infant</option>
      </select>
      <button
        type="submit"
        className="rounded-[12px] bg-[#0f766e] text-[11px] font-black text-white"
      >
        Add
      </button>
    </form>
  );
}

function AddFamilyPaymentForm({
  onAdd,
}: {
  onAdd: (payment: { amount: number; date: string }) => void;
}) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today());

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const parsedAmount = Number(amount);
        if (parsedAmount > 0) {
          onAdd({ amount: parsedAmount, date });
          setAmount("");
          setDate(today());
        }
      }}
      className="mt-2 grid grid-cols-2 gap-2 rounded-[16px] bg-[#e5f6f2]/70 p-3"
    >
      <input
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        type="number"
        min="1"
        placeholder="Paid amount"
        className={inputClass}
      />
      <input
        value={date}
        onChange={(event) => setDate(event.target.value)}
        type="date"
        className={inputClass}
      />
      <button
        type="submit"
        className="col-span-2 rounded-[12px] bg-[#0f766e] py-2.5 text-[11px] font-black text-white"
      >
        Add
      </button>
    </form>
  );
}

function MemberEditor({
  member,
  onSave,
}: {
  member: { name: string; type: PersonType };
  onSave: (next: { name: string; type: PersonType }) => void;
}) {
  const [name, setName] = useState(member.name);
  const [type, setType] = useState<PersonType>(member.type);
  const isChanged = name.trim() !== member.name || type !== member.type;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (name.trim()) {
          onSave({ name: name.trim(), type });
        }
      }}
      className="rounded-[16px] bg-white/40 p-3"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_94px_58px] items-center gap-2">
        <div className="min-w-0">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-[12px] border border-white/60 bg-white/50 px-3 py-2 text-xs font-black text-[#123331] outline-none backdrop-blur-xl"
            placeholder="Member name"
          />
          <p className="mt-1 truncate px-1 text-[11px] font-bold text-[#64748b]">
            {AGE_LABEL[type]} • {FEE[type] === 0 ? "Free" : fmt(FEE[type])}
          </p>
        </div>
        <select
          value={type}
          onChange={(event) => setType(event.target.value as PersonType)}
          className="w-full rounded-[12px] border border-white/60 bg-white/50 px-2 py-2 text-xs font-black text-[#123331] outline-none backdrop-blur-xl"
        >
          <option value="adult">Adult</option>
          <option value="kid">Kid</option>
          <option value="infant">Infant</option>
        </select>
        <button
          type="submit"
          disabled={!isChanged}
          className="h-10 rounded-[12px] bg-[#0f766e] text-[11px] font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default function AdminFamiliesPage() {
  const { families, payments, addFamilyPayment, updateMemberDetails, addFamily, addMember, syncError } = useTripData();
  const [expandedFamilyIds, setExpandedFamilyIds] = useState<string[]>([]);

  function toggleFamily(familyId: string) {
    setExpandedFamilyIds((current) =>
      current.includes(familyId)
        ? current.filter((id) => id !== familyId)
        : [...current, familyId],
    );
  }

  return (
    <AdminShell title="Families">
      {syncError && <p className="mb-3 rounded-[16px] bg-red-50/80 px-3 py-2 text-center text-[11px] font-bold text-[#ef4444]">{syncError}</p>}

      <div className="mb-6 rounded-[24px] bg-white/45 p-4 shadow-[0_8px_16px_rgba(18,45,42,0.06)] backdrop-blur-xl border border-white/60">
        <h2 className="mb-3 text-[13px] font-black uppercase tracking-widest text-[#123331]">Add New Family</h2>
        <AddFamilyForm onAdd={addFamily} />
      </div>

      <div className="space-y-4">
        {families.slice().reverse().map((family) => {
          const isExpanded = expandedFamilyIds.includes(family.id);
          const isCollapsed = !isExpanded;
          const collected = getFamilyCollected(family);
          const expected = getFamilyFee(family);
          const pending = Math.max(0, expected - collected);
          const paidPct = expected > 0 ? Math.min(100, Math.round((collected / expected) * 100)) : collected > 0 ? 100 : 0;
          const familyPayments = payments
            .filter((payment) => payment.familyId === family.id && payment.kind === "family")
            .slice()
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          return (
            <section key={family.id} className="glass-card rounded-[24px] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[15px] font-black text-[#123331]">{family.familyName}</h2>
                  <p className="mt-1 text-[11px] font-bold text-[#64748b]">
                    {family.members.length} members
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-full bg-[#e5f6f2] px-3 py-1 text-[11px] font-black text-[#0f766e]">
                    {paidPct}% paid
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleFamily(family.id)}
                    aria-label={isExpanded ? "Minimize family card" : "Expand family card"}
                    className="flex size-8 items-center justify-center rounded-full border border-white/60 bg-white/55 text-[#123331] shadow-[0_8px_16px_rgba(18,45,42,0.06)] backdrop-blur-xl transition"
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 rounded-[16px] bg-white/40 p-3 text-center">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748b]">Total</p>
                  <p className="mt-0.5 text-[14px] font-black text-[#123331]">{fmt(expected)}</p>
                </div>
                <div className="border-x border-white/60">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748b]">Paid</p>
                  <p className="mt-0.5 text-[14px] font-black text-[#0f766e]">{fmt(collected)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748b]">Pending</p>
                  <p className={`mt-0.5 text-[14px] font-black ${pending === 0 ? "text-[#0f766e]" : "text-[#ef4444]"}`}>{fmt(pending)}</p>
                </div>
              </div>

              {!isCollapsed && (
                <>
                  <div className="mt-2">
                    <div className="rounded-[16px] bg-white/40 p-3">
                      <p className="text-[13px] font-black text-[#123331]">Add paid amount</p>
                      <p className="text-[11px] font-bold text-[#64748b]">
                        Each entry adds to this family&apos;s paid total and appears in recent payments.
                      </p>
                    </div>

                    <AddFamilyPaymentForm
                      onAdd={(payment) =>
                        addFamilyPayment({
                          familyId: family.id,
                          amount: payment.amount,
                          date: payment.date,
                        })
                      }
                    />

                    <div className="mt-2 rounded-[16px] bg-white/35 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[12px] font-black uppercase tracking-wide text-[#64748b]">
                          Family payment history
                        </p>
                        <p className="text-[12px] font-black text-[#0f766e]">{fmt(collected)}</p>
                      </div>
                      <div className="mt-2 space-y-1.5">
                        {familyPayments.map((payment) => (
                          <div
                            key={payment.id}
                            className="flex items-center justify-between rounded-[12px] bg-white/45 px-3 py-2"
                          >
                            <p className="text-[11px] font-bold text-[#64748b]">{payment.date}</p>
                            <p className="text-[12px] font-black text-[#0f766e]">+{fmt(payment.amount)}</p>
                          </div>
                        ))}
                        {familyPayments.length === 0 && (
                          <p className="rounded-[12px] bg-white/45 px-3 py-2 text-center text-[11px] font-bold text-[#64748b]">
                            No family payments added yet.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 space-y-2">
                    {family.members.map((member) => (
                      <MemberEditor
                        key={member.name}
                        member={member}
                        onSave={(next) => updateMemberDetails(family.id, member.name, next)}
                      />
                    ))}
                  </div>

                  <AddMemberForm onAdd={(member) => addMember(family.id, member)} />
                </>
              )}
            </section>
          );
        })}
      </div>
    </AdminShell>
  );
}
