import { AGE_LABEL, FEE, families, fmt, getFamilyCollected, getFamilyFee } from "@/data/config";

function percent(value: number, total: number) {
  return total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 100;
}

function memberSummary(family: (typeof families)[number]) {
  const adults = family.members.filter((member) => member.type === "adult").length;
  const kids = family.members.filter((member) => member.type === "kid").length;
  const infants = family.members.filter((member) => member.type === "infant").length;

  return `${adults} adults • ${kids} kids • ${infants} infants`;
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function FamiliesPage() {
  const totalExpected = families.reduce((sum, family) => sum + getFamilyFee(family), 0);
  const totalCollected = families.reduce((sum, family) => sum + getFamilyCollected(family), 0);
  const totalPending = totalExpected - totalCollected;
  const totalMembers = families.reduce((sum, family) => sum + family.members.length, 0);
  const fundedPct = percent(totalCollected, totalExpected);

  return (
    <main className="min-h-[calc(100vh-110px)] bg-[#f6f8f7] px-5 pb-4 pt-6 text-[#0f172a]">
      <header>
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0f766e]">
          Trip Members
        </p>
        <h1 className="mt-1 text-[34px] font-extrabold leading-none tracking-normal text-[#123331]">
          Families
        </h1>
        <p className="mt-2 text-sm font-medium text-[#64748b]">
          {families.length} families and {totalMembers} members in one simple view.
        </p>
      </header>

      <section className="mt-5 rounded-[24px] bg-white px-4 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-[11px] font-bold text-[#64748b]">Target</p>
            <p className="mt-1 text-[17px] font-extrabold text-[#0f172a]">{fmt(totalExpected)}</p>
          </div>
          <div className="border-x border-[#e2e8f0]">
            <p className="text-[11px] font-bold text-[#64748b]">Collected</p>
            <p className="mt-1 text-[17px] font-extrabold text-[#0f766e]">{fmt(totalCollected)}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#64748b]">Pending</p>
            <p className="mt-1 text-[17px] font-extrabold text-[#ef4444]">{fmt(totalPending)}</p>
          </div>
        </div>

        <div className="mt-4 h-2 rounded-full bg-[#e2e8f0]">
          <div
            className="h-full rounded-full bg-[#0f766e]"
            style={{ width: `${fundedPct}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[12px] font-bold">
          <span className="text-[#0f766e]">{fundedPct}% funded</span>
          <span className="text-[#64748b]">{fmt(totalPending)} remaining</span>
        </div>
      </section>

      <section className="mt-5">
        <h2 className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#334155]">
          Family List
        </h2>

        <div className="mt-3 space-y-3">
          {families.map((family) => {
            const expected = getFamilyFee(family);
            const collected = getFamilyCollected(family);
            const pending = expected - collected;
            const paidPct = percent(collected, expected);
            const isPaid = pending === 0;

            return (
              <details
                key={family.id}
                className="overflow-hidden rounded-[20px] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
              >
                <summary className="relative flex cursor-pointer select-none items-center gap-3 px-4 py-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-[#0f766e] text-[16px] font-extrabold text-white">
                    {family.familyName.charAt(0)}
                  </span>

                  <div className="min-w-0 flex-1 pr-7">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-[15px] font-extrabold text-[#122827]">
                          {family.familyName}
                        </h3>
                        <p className="mt-0.5 text-[12px] font-semibold text-[#64748b]">
                          {memberSummary(family)}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-[16px] font-extrabold text-[#0f766e]">{fmt(collected)}</p>
                        <p className="text-[11px] font-semibold text-[#64748b]">of {fmt(expected)}</p>
                      </div>
                    </div>

                    <div className="mt-3 h-1.5 rounded-full bg-[#e2e8f0]">
                      <div
                        className="h-full rounded-full bg-[#0f766e]"
                        style={{ width: `${paidPct}%` }}
                      />
                    </div>
                    <p className={`mt-1.5 text-[11px] font-extrabold ${isPaid ? "text-[#0f766e]" : "text-[#ef4444]"}`}>
                      {isPaid ? "Fully paid" : `${fmt(pending)} pending`}
                    </p>
                  </div>

                  <span className="absolute right-4 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#f8fafc] text-[#64748b]">
                    <span className="chevron-icon h-4 w-4">
                      <ChevronDownIcon />
                    </span>
                  </span>
                </summary>

                <div className="divide-y divide-[#e2e8f0] border-t border-[#e2e8f0] bg-[#fbfdfc] px-4">
                  {family.members.map((member) => {
                    const due = FEE[member.type];
                    const pendingForMember = Math.max(0, due - member.paid);
                    const isFree = due === 0;
                    const isMemberPaid = isFree || pendingForMember === 0;

                    return (
                      <div key={member.name} className="flex items-center justify-between gap-3 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-extrabold text-[#122827]">
                            {member.name}
                          </p>
                          <p className="mt-0.5 text-[11px] font-semibold text-[#64748b]">
                            {AGE_LABEL[member.type]} • Fee {isFree ? "Free" : fmt(due)}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-[13px] font-extrabold text-[#0f766e]">
                            {isFree ? "Free" : fmt(member.paid)}
                          </p>
                          <p className={`text-[11px] font-bold ${isMemberPaid ? "text-[#0f766e]" : "text-[#ef4444]"}`}>
                            {isMemberPaid ? "Paid" : `${fmt(pendingForMember)} due`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </main>
  );
}
