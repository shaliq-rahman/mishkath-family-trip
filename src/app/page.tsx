import Image from "next/image";
import Link from "next/link";
import {
  families,
  payments,
  getFamilyFee,
  getFamilyCollected,
  fmt,
  TRIP_DESTINATION,
  TRIP_DATES,
  TRIP_HEADLINE,
} from "@/data/config";

const familyColors: Record<string, string> = {
  "1": "#0f8f7f",
  "2": "#2d9cdb",
  "3": "#7c3aed",
  "4": "#ff414d",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function percent(value: number, total: number) {
  return total > 0 ? Math.round((value / total) * 100) : 0;
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

function MemberIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

export default function Home() {
  const totalExpected = families.reduce((sum, family) => sum + getFamilyFee(family), 0);
  const totalCollected = families.reduce((sum, family) => sum + getFamilyCollected(family), 0);
  const totalPending = totalExpected - totalCollected;
  const totalMembers = families.reduce((sum, family) => sum + family.members.length, 0);
  const fundedPct = percent(totalCollected, totalExpected);
  const recentPayments = [...payments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <main className="flex flex-col h-full bg-[#f6f8f7] text-[#142322]">
      <section className="relative overflow-hidden px-5 min-[400px]:px-7 pb-4 pt-6 flex-1">
        <div className="absolute inset-x-0 top-0 h-[360px] overflow-hidden rounded-b-[34px]">
          <Image
            src="/banasura-banner.png"
            alt="Banasura Reservoir"
            fill
            priority
            sizes="430px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,248,247,0)_0%,rgba(246,248,247,0.1)_40%,rgba(246,248,247,0.95)_90%,rgba(246,248,247,1)_100%)]" />
        </div>

        <div className="relative z-10">
          <div className="pt-0">
            <div className="inline-flex h-[28px] items-center gap-1.5 rounded-full bg-white/25 border border-white/40 px-3 py-1 text-[#004a43] shadow-none backdrop-blur-md">
              <span className="h-3.5 w-3.5">
                <PlaneIcon />
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.08em] mt-[1px]">
                Family Trip 2026
              </span>
            </div>

            <h1 className="mt-4 text-[clamp(28px,9vw,42px)] font-extrabold uppercase leading-[0.96] tracking-normal text-[#004a43]">
              {TRIP_HEADLINE[0]}
              <br />
              {TRIP_HEADLINE[1]}
            </h1>
            <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6a7776]">
              Banasura Reservoir
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 min-[400px]:gap-3">
              <div className="flex h-[32px] w-fit items-center gap-1.5 rounded-[10px] bg-white/25 backdrop-blur-md border border-white/40 px-2.5 py-1 text-[#004a43]">
                <span className="h-3 w-3 shrink-0 text-[#004a43]">
                  <PinIcon />
                </span>
                <span className="text-[9px] min-[400px]:text-[10px] font-bold whitespace-nowrap uppercase tracking-wider">{TRIP_DESTINATION}</span>
              </div>
              <div className="flex h-[32px] w-fit items-center gap-1.5 rounded-[10px] bg-white/25 backdrop-blur-md border border-white/40 px-2.5 py-1 text-[#004a43]">
                <span className="h-3 w-3 shrink-0 text-[#004a43]">
                  <CalendarIcon />
                </span>
                <span className="text-[9px] min-[400px]:text-[10px] font-bold whitespace-nowrap uppercase tracking-wider">{TRIP_DATES}</span>
              </div>
            </div>
          </div>

          <section className="mt-6 overflow-hidden rounded-[28px] bg-white shadow-[0_18px_32px_rgba(18,45,42,0.12)]">
            <div className="bg-[#005243] px-5 min-[400px]:px-6 pb-[70px] pt-6 text-white">
              <div className="grid grid-cols-[1fr_1px_1fr] min-[400px]:grid-cols-[1.1fr_1px_1fr] items-center gap-3 min-[400px]:gap-5">
                <div>
                  <p className="text-[10px] min-[400px]:text-[11px] font-bold uppercase tracking-[0.13em] text-white/82">
                    Fund Progress
                  </p>
                  <p className="mt-1 text-[clamp(28px,8vw,36px)] font-semibold leading-none">{fundedPct}%</p>
                  <p className="mt-0.5 text-sm min-[400px]:text-base font-semibold leading-none">Funded</p>
                </div>

                <div className="h-[50px] bg-white/12" />

                <div className="flex items-center justify-between gap-2 min-[400px]:gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] min-[400px]:text-[11px] font-bold uppercase tracking-[0.13em] text-white/82 truncate">
                      Target
                    </p>
                    <p className="mt-1.5 text-[clamp(16px,4vw,20px)] font-bold leading-none truncate">{fmt(totalExpected)}</p>
                  </div>
                  <span className="flex h-[36px] w-[36px] min-[400px]:h-[48px] min-[400px]:w-[48px] shrink-0 items-center justify-center rounded-full border-2 border-[#36df83] text-[#36df83]">
                    <span className="h-5 w-5 min-[400px]:h-7 min-[400px]:w-7">
                      <TargetIcon />
                    </span>
                  </span>
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#116b5a]">
                <div
                  className="h-full rounded-full bg-[#42e98a] shadow-[18px_0_0_rgba(66,233,138,0.25)]"
                  style={{ width: `${fundedPct}%` }}
                />
              </div>
            </div>

            <div className="-mt-[46px] px-3 pb-3">
              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_12px_24px_rgba(16,35,32,0.09)]">
                <div className="grid grid-cols-2 divide-x divide-[#edf0ee]">
                  <div className="flex items-center gap-2 min-[400px]:gap-3 px-2 min-[400px]:px-4 py-2 min-[400px]:py-3">
                    <span className="flex h-8 w-8 min-[400px]:h-10 min-[400px]:w-10 shrink-0 items-center justify-center rounded-full bg-[#e6f8f3] text-[#038475]">
                      <span className="h-4 w-4 min-[400px]:h-5 min-[400px]:w-5">
                        <WalletIcon />
                      </span>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[9px] min-[400px]:text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#078071] truncate">
                        Collected
                      </p>
                      <p className="mt-0.5 text-[clamp(14px,4vw,18px)] font-extrabold leading-none text-[#037164] truncate">
                        {fmt(totalCollected)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 min-[400px]:gap-3 px-2 min-[400px]:px-4 py-2 min-[400px]:py-3">
                    <span className="flex h-8 w-8 min-[400px]:h-10 min-[400px]:w-10 shrink-0 items-center justify-center rounded-full bg-[#fdecef] text-[#e43e4f]">
                      <span className="h-4 w-4 min-[400px]:h-5 min-[400px]:w-5">
                        <WalletIcon />
                      </span>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[9px] min-[400px]:text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#df4452] truncate">
                        Remaining
                      </p>
                      <p className="mt-0.5 text-[clamp(14px,4vw,18px)] font-extrabold leading-none text-[#df3346] truncate">
                        {fmt(totalPending)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-[#edf0ee] border-t border-[#edf0ee]">
                  <div className="flex items-center justify-center gap-2 min-[400px]:gap-3 px-2 min-[400px]:px-4 py-2 min-[400px]:py-3">
                    <span className="flex h-6 w-6 min-[400px]:h-8 min-[400px]:w-8 items-center justify-center rounded-full bg-[#e6f8f3] text-[#078071]">
                      <span className="h-3 w-3 min-[400px]:h-4 min-[400px]:w-4">
                        <PeopleIcon />
                      </span>
                    </span>
                    <span className="text-[11px] min-[400px]:text-[13px] font-semibold text-[#6f7778] truncate">{families.length} Families</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 min-[400px]:gap-3 px-2 min-[400px]:px-4 py-2 min-[400px]:py-3">
                    <span className="flex h-6 w-6 min-[400px]:h-8 min-[400px]:w-8 items-center justify-center rounded-full bg-[#e6f8f3] text-[#078071]">
                      <span className="h-3 w-3 min-[400px]:h-4 min-[400px]:w-4">
                        <MemberIcon />
                      </span>
                    </span>
                    <span className="text-[11px] min-[400px]:text-[13px] font-semibold text-[#6f7778] truncate">{totalMembers} Members</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="px-5 pb-6 mt-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#162525]">
            Recent Payments
          </h2>
          <Link href="/families" className="flex items-center gap-1 text-[11px] font-bold text-[#007a6d]">
            View all
            <span aria-hidden="true" className="text-sm leading-none">
              &rsaquo;
            </span>
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-[0_4px_16px_rgba(18,45,42,0.06)]">
          {recentPayments.map((payment) => {
            const avatarColor = familyColors[payment.familyId] ?? "#0f8f7f";

            return (
              <div
                key={payment.id}
                className="flex min-h-[56px] items-center gap-3 border-b border-[#edf0ee] px-3 last:border-b-0 py-2.5"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: avatarColor }}
                >
                  {payment.personName[0]}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold leading-tight text-[#182b2c]">
                    {payment.personName}
                  </p>
                  <p className="mt-0.5 truncate text-[10px] font-medium text-[#7c8588]">
                    {payment.familyName.replace(" Family", "")} &bull; {payment.type[0].toUpperCase()}
                    {payment.type.slice(1)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[13px] font-extrabold leading-tight text-[#007a6d]">
                    +{fmt(payment.amount)}
                  </p>
                  <p className="mt-0.5 text-[9px] font-medium text-[#7c8588]">{formatDate(payment.date)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
