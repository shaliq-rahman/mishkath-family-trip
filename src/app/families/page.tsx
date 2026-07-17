import Image from "next/image";
import { FEE, families, fmt, getFamilyCollected, getFamilyFee } from "@/data/config";

const avatarGradient: Record<string, string> = {
  "1": "linear-gradient(135deg, #20c1b6 0%, #0f766e 100%)",
  "2": "linear-gradient(135deg, #20c1b6 0%, #0f766e 100%)",
  "3": "linear-gradient(135deg, #20c1b6 0%, #0f766e 100%)",
  "4": "linear-gradient(135deg, #20c1b6 0%, #0f766e 100%)",
};

const rowMeta: Record<string, string> = {
  "1": "2A  •  1K  •  1I  •  8 members",
  "2": "2A  •  1K  •  7 members",
  "3": "2A  •  0K  •  2I  •  5 members",
  "4": "2A  •  2K  •  1I  •  7 members",
};

function percent(value: number, total: number) {
  return total > 0 ? Math.round((value / total) * 100) : 100;
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function AddFamilyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
      <circle cx="10" cy="7" r="3" />
      <path d="M19 8v6" />
      <path d="M22 11h-6" />
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

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

function ChildIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="3" />
      <path d="M8.5 7.5 7 6" />
      <path d="m15.5 7.5 1.5-1.5" />
      <path d="M8.5 14.5c2.2 1.8 4.8 1.8 7 0" />
      <path d="M6 21a6 6 0 0 1 12 0" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h10" />
      <path d="M18 8h2" />
      <path d="M16 6v4" />
      <path d="M4 16h2" />
      <path d="M10 16h10" />
      <path d="M8 14v4" />
    </svg>
  );
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
  const totalAdults = families.reduce((sum, family) => sum + family.members.filter((m) => m.type === "adult").length, 0);
  const totalKids = families.reduce((sum, family) => sum + family.members.filter((m) => m.type === "kid").length, 0);
  const totalInfants = families.reduce((sum, family) => sum + family.members.filter((m) => m.type === "infant").length, 0);
  const fundedPct = percent(totalCollected, totalExpected);

  return (
    <main className="relative h-full overflow-hidden bg-[#f8fafc] text-[#0f172a]">
      <div className="absolute inset-x-0 top-0 h-[248px] overflow-hidden rounded-b-[32px]">
        <Image
          src="/banasura-banner.png"
          alt="Banasura Reservoir"
          fill
          priority
          sizes="390px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.74)_0%,rgba(255,255,255,0.42)_48%,rgba(248,250,252,0.93)_88%,rgba(248,250,252,1)_100%)]" />
      </div>

      <section className="relative z-10 px-5 pt-7">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Back"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/85 text-[#0f172a] shadow-[0_12px_28px_rgba(15,23,42,0.10)] backdrop-blur-xl"
          >
            <span className="h-6 w-6">
              <BackIcon />
            </span>
          </button>

          <button
            type="button"
            aria-label="Add family"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white shadow-[0_16px_30px_rgba(15,118,110,0.28)]"
          >
            <span className="h-7 w-7">
              <AddFamilyIcon />
            </span>
          </button>
        </div>

        <div className="mt-6">
          <h1 className="font-display text-[41px] font-extrabold leading-none tracking-normal text-[#063f3b]">
            Families
          </h1>
          <p className="mt-2 text-[15px] font-semibold text-[#64748b]">
            {families.length} families &bull; {totalMembers} members
          </p>
        </div>
      </section>

      <section className="relative z-10 px-5 pt-4">
        <div className="rounded-[24px] border border-white/90 bg-white/88 px-4 py-3.5 shadow-[0_18px_42px_rgba(15,23,42,0.10)] backdrop-blur-xl">
          <div className="grid grid-cols-[1fr_1px_1fr] items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e6fffa] text-[#0f766e]">
                <span className="h-6 w-6">
                  <WalletIcon />
                </span>
              </span>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-[#64748b]">Total Collected</p>
                <p className="mt-1 text-[24px] font-extrabold leading-none text-[#0f766e]">{fmt(totalCollected)}</p>
                <p className="mt-2 text-[12px] font-semibold text-[#64748b]">of {fmt(totalExpected)}</p>
              </div>
            </div>

            <div className="h-[68px] bg-[#e2e8f0]" />

            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fee2e2] text-[#ef4444]">
                <span className="h-6 w-6">
                  <WalletIcon />
                </span>
              </span>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-[#64748b]">Still Pending</p>
                <p className="mt-1 text-[24px] font-extrabold leading-none text-[#ef4444]">{fmt(totalPending)}</p>
                <p className="mt-2 text-[12px] font-semibold text-[#64748b]">of {fmt(totalExpected)}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e2e8f0]">
            <div className="h-full rounded-full bg-[#0f766e]" style={{ width: `${fundedPct}%` }} />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-[16px] font-extrabold text-[#0f766e]">
              {fundedPct}% <span className="text-[12px] font-bold">Funded</span>
            </p>
            <p className="text-[12px] font-semibold text-[#64748b]">Target: {fmt(totalExpected)}</p>
          </div>
        </div>
      </section>

      <section className="px-5 pt-3">
        <div className="rounded-[24px] border border-white/90 bg-white/92 px-4 py-3 shadow-[0_16px_36px_rgba(15,23,42,0.07)]">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[14px] font-extrabold text-[#0f172a]">Fee Structure</h2>
            <p className="text-[10px] font-medium text-[#64748b]">Based on per member</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-[18px] border border-[#e2e8f0] bg-white px-2 py-2.5 text-center">
              <span className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#ecfdf5] text-[#0f766e]">
                <span className="h-5 w-5">
                  <PeopleIcon />
                </span>
              </span>
              <p className="text-[12px] font-extrabold text-[#0f766e]">Above 12</p>
              <p className="mt-0.5 text-[18px] font-extrabold text-[#0f766e]">{fmt(FEE.adult)}</p>
              <p className="mt-0.5 text-[10px] font-bold text-[#0f766e]">{totalAdults} members</p>
            </div>

            <div className="rounded-[18px] border border-[#fef3c7] bg-white px-2 py-2.5 text-center">
              <span className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#fff7ed] text-[#b45309]">
                <span className="h-5 w-5">
                  <PersonIcon />
                </span>
              </span>
              <p className="text-[12px] font-extrabold text-[#b45309]">6 - 12</p>
              <p className="mt-0.5 text-[18px] font-extrabold text-[#b45309]">{fmt(FEE.kid)}</p>
              <p className="mt-0.5 text-[10px] font-bold text-[#b45309]">{totalKids} members</p>
            </div>

            <div className="rounded-[18px] border border-[#dcfce7] bg-white px-2 py-2.5 text-center">
              <span className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#f0fdf4] text-[#15803d]">
                <span className="h-5 w-5">
                  <ChildIcon />
                </span>
              </span>
              <p className="text-[12px] font-extrabold text-[#15803d]">0 - 6</p>
              <p className="mt-0.5 text-[18px] font-extrabold text-[#15803d]">Free</p>
              <p className="mt-0.5 text-[10px] font-bold text-[#15803d]">{totalInfants} members</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pt-3">
        <div className="mb-2 flex items-center justify-between px-2">
          <h2 className="text-[14px] font-semibold text-[#334155]">Families Overview</h2>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#334155]">
            <span className="h-4 w-4">
              <FilterIcon />
            </span>
            <span>Recent</span>
            <span className="h-3.5 w-3.5">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          {families.map((family) => {
            const totalFee = getFamilyFee(family);
            const collected = getFamilyCollected(family);
            const pending = totalFee - collected;
            const pct = percent(collected, totalFee);

            return (
              <article
                key={family.id}
                className="relative flex h-[53px] items-center gap-3 rounded-[19px] bg-white px-3.5 shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[18px] font-extrabold text-white shadow-[0_10px_18px_rgba(15,118,110,0.22)]"
                  style={{ background: avatarGradient[family.id] ?? avatarGradient["1"] }}
                >
                  {family.familyName[0]}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-[13px] font-extrabold leading-tight text-[#0f172a]">
                        {family.familyName}
                      </h3>
                      <p className="mt-0.5 truncate text-[10px] font-bold text-[#64748b]">
                        <span>{rowMeta[family.id]}</span>
                      </p>
                      <p className={`mt-0.5 text-[8px] font-extrabold ${pending === 0 ? "text-[#16a34a]" : "text-[#ef4444]"}`}>
                        {pending === 0 ? "Fully Paid" : `${fmt(pending)} pending`}
                      </p>
                    </div>

                    <div className="shrink-0 pr-6 text-right">
                      <p className="text-[15px] font-extrabold leading-none text-[#0f766e]">{fmt(collected)}</p>
                      <p className="mt-1 text-[10px] font-bold text-[#64748b]">of {fmt(totalFee)}</p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-[82px] right-[34px] h-0.5 overflow-hidden rounded-full bg-[#eef2f1]">
                    <div className="h-full rounded-full bg-[#0f766e]" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <span className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0f172a] shadow-[0_4px_12px_rgba(15,23,42,0.10)]">
                  <span className="h-4 w-4">
                    <ChevronDownIcon />
                  </span>
                </span>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
