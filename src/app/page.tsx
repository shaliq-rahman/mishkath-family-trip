import {
  families,
  payments,
  getFamilyFee,
  getFamilyCollected,
  fmt,
  TRIP_HEADLINE,
  TRIP_DESTINATION,
  TRIP_DATES,
} from "@/data/config";

const familyColors: Record<string, string> = {
  "1": "#0d9488", // Teal
  "2": "#2563eb", // Blue
  "3": "#7c3aed", // Purple
  "4": "#d97706", // Amber
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function Home() {
  const totalExpected  = families.reduce((s, f) => s + getFamilyFee(f), 0);
  const totalCollected = families.reduce((s, f) => s + getFamilyCollected(f), 0);
  const totalPending   = totalExpected - totalCollected;
  const pct            = Math.round((totalCollected / totalExpected) * 100);

  const recent = [...payments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="relative min-h-screen bg-[#fbfbf9] text-gray-800 overflow-hidden pb-12">
      {/* ── BACKGROUND FULL-PAGE BANNER ── */}
      <div className="absolute inset-x-0 top-0 h-[420px] overflow-hidden pointer-events-none">
        <img
          src="/banasura-banner.png"
          alt="Banasura Sagar Dam background"
          className="w-full h-full object-cover opacity-75 scale-102"
        />
        {/* White/Cream atmospheric gradient transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fbfbf9]/60 to-[#fbfbf9]" />
        <div className="absolute inset-0 bg-radial-gradient(circle at top, transparent 10%, #fbfbf9 90%)" />
      </div>

      {/* ── CONTENT CONTAINER ── */}
      <div className="relative z-10 px-5 pt-8 space-y-7">
        
        {/* Header Metadata */}
        <header className="space-y-3.5 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-teal-500/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-teal-700">
              Family Trip 2026
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-teal-950 leading-none uppercase drop-shadow-sm">
              {TRIP_HEADLINE.join(" ")}
            </h1>
            <p className="text-xs font-bold tracking-widest text-teal-700 uppercase opacity-90">
              Banasura Reservoir
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-600 font-semibold pt-1">
            <span className="flex items-center gap-1.5 bg-white/60 px-2.5 py-1 rounded-lg border border-teal-500/5 shadow-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-655">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {TRIP_DESTINATION}
            </span>
            <span className="flex items-center gap-1.5 bg-white/60 px-2.5 py-1 rounded-lg border border-teal-500/5 shadow-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-655">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
              {TRIP_DATES}
            </span>
          </div>
        </header>

        {/* ── WHITE GLASS STATS CARD ── */}
        <section className="space-y-3">
          <div className="bg-white/80 backdrop-blur-xl border border-teal-500/5 rounded-3xl p-6 space-y-5 shadow-lg shadow-teal-900/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fund Status</p>
                <h2 className="text-2xl font-black mt-0.5 text-teal-950">{pct}% Funded</h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target</p>
                <p className="text-sm font-bold text-gray-700 mt-0.5">{fmt(totalExpected)}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 rounded-full w-full bg-teal-500/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400 animate-fill-bar"
                style={{ width: `${pct}%` }}
              />
            </div>

            {/* Metrics Quick Grid */}
            <div className="grid grid-cols-2 gap-3.5 pt-1">
              <div className="bg-teal-50/30 border border-teal-500/5 p-4 rounded-2xl flex flex-col justify-between min-h-[80px]">
                <span className="text-[9px] font-bold text-teal-600 uppercase tracking-widest">Collected</span>
                <span className="text-xl font-black text-teal-700 mt-2">{fmt(totalCollected)}</span>
              </div>
              <div className="bg-red-50/20 border border-red-500/5 p-4 rounded-2xl flex flex-col justify-between min-h-[80px]">
                <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest">Remaining</span>
                <span className="text-xl font-black text-red-500 mt-2">{fmt(totalPending)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-bold px-1 pt-1 border-t border-gray-100">
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
                {families.length} Families
              </span>
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                </svg>
                {families.reduce((s, f) => s + f.members.length, 0)} Members
              </span>
            </div>
          </div>
        </section>

        {/* ── WHITE RECENT PAYMENTS CARD ── */}
        <section className="space-y-3.5 pb-20">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-teal-850">Recent Payments</h3>
            <span className="text-[10px] text-gray-400 font-bold">{recent.length} payments</span>
          </div>

          <div className="bg-white/80 border border-teal-500/5 rounded-3xl overflow-hidden shadow-lg shadow-teal-900/5">
            <div className="max-h-[300px] overflow-y-auto no-scrollbar divide-y divide-gray-100">
              {recent.map((p) => {
                const avatarColor = familyColors[p.familyId] ?? "#6b7280";
                return (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors duration-250"
                  >
                    {/* Circle Avatar with subtle border */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0 shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${avatarColor}dd, ${avatarColor})`,
                      }}
                    >
                      {p.personName[0]}
                    </div>

                    {/* Transaction Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-800 truncate leading-snug">
                        {p.personName}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-bold mt-1">
                        {p.familyName.replace(" Family", "")} • <span className="capitalize">{p.type}</span>
                      </p>
                    </div>

                    {/* Amount & Date */}
                    <div className="text-right shrink-0">
                      <span className="text-sm font-black text-teal-600 block leading-none">
                        +{fmt(p.amount)}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold mt-1.5 block">
                        {formatDate(p.date)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
