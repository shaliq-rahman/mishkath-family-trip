import { Family, FEE, AGE_LABEL, getFamilyFee, getFamilyCollected, fmt } from "@/data/config";

const ageStyle: Record<string, { bg: string; color: string }> = {
  adult:  { bg: "rgba(3, 105, 161, 0.06)", color: "#0369a1" },
  kid:    { bg: "rgba(161, 98, 7, 0.06)", color: "#a16207" },
  infant: { bg: "rgba(21, 128, 61, 0.06)", color: "#15803d" },
};

export default function FamilyCard({ family }: { family: Family }) {
  const totalFee  = getFamilyFee(family);
  const collected = getFamilyCollected(family);
  const remaining = totalFee - collected;
  const pct       = totalFee > 0 ? Math.round((collected / totalFee) * 100) : 100;

  const adults  = family.members.filter((m) => m.type === "adult").length;
  const kids    = family.members.filter((m) => m.type === "kid").length;
  const infants = family.members.filter((m) => m.type === "infant").length;

  return (
    <div className="card overflow-hidden">
      <details className="group">
        {/* ── Collapsed header ── */}
        <summary className="flex items-center gap-3 px-4 py-3.5 cursor-pointer select-none hover:bg-gray-50/30 transition-colors duration-200">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-sm"
            style={{
              background: "linear-gradient(135deg, var(--color-teal-500) 0%, var(--color-teal-600) 100%)",
            }}
          >
            {family.familyName[0]}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-800 leading-tight truncate">
              {family.familyName}
            </p>
            <p className="text-[11px] text-gray-400 font-semibold mt-0.5 flex items-center gap-1.5 flex-wrap">
              <span>
                {adults > 0 && `${adults}A`}
                {kids > 0 && ` · ${kids}K`}
                {infants > 0 && ` · ${infants}I`}
              </span>
              <span>•</span>
              <span className={remaining === 0 ? "text-teal-600 font-bold" : "text-red-500 font-semibold"}>
                {remaining === 0 ? "Fully Paid" : `${fmt(remaining)} pending`}
              </span>
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-sm font-bold text-teal-800">
              {fmt(collected)}
            </p>
            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
              of {fmt(totalFee)}
            </p>
          </div>

          <svg
            className="chevron-icon shrink-0 text-gray-400 transition-transform duration-350"
            width="14" height="14" viewBox="0 0 16 16" fill="none"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>

        {/* ── Expanded member rows ── */}
        <div className="divide-y divide-gray-100/50 bg-[#fbfbf9]/40 border-t border-gray-100/50">
          {family.members.map((m) => {
            const due       = FEE[m.type];
            const isFree    = due === 0;
            const isPaid    = !isFree && m.paid >= due;
            const isPartial = !isFree && m.paid > 0 && m.paid < due;
            const style     = ageStyle[m.type];

            return (
              <div key={m.name} className="flex items-center gap-3 px-4 py-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                  style={{
                    background: isFree 
                      ? "linear-gradient(135deg, #22c55e, #16a34a)" 
                      : "linear-gradient(135deg, #0d9488, #0f766e)",
                  }}
                >
                  {m.name[0]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-xs font-bold text-gray-800">{m.name}</p>
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: style.bg, color: style.color }}
                    >
                      {AGE_LABEL[m.type]}{isFree && " · Free"}
                    </span>
                  </div>
                  {isPartial && (
                    <p className="text-[10px] text-amber-600 font-semibold mt-0.5">
                      Paid {fmt(m.paid)} of {fmt(due)}
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  {isFree ? (
                    <span className="text-[10px] font-bold text-green-600 px-2 py-0.5 rounded-full bg-green-50">Free</span>
                  ) : (
                    <div className="flex flex-col items-end gap-0.5">
                      <p className="text-xs font-bold text-teal-850">
                        {fmt(due)}
                      </p>
                      <span
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                        style={
                          isPaid
                            ? { background: "rgba(34, 197, 94, 0.08)", color: "#16a34a" }
                            : isPartial
                            ? { background: "rgba(245, 158, 11, 0.08)", color: "#d97706" }
                            : { background: "rgba(239, 68, 68, 0.08)", color: "#ef4444" }
                        }
                      >
                        {isPaid ? "Paid" : isPartial ? "Partial" : "Unpaid"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </details>

      {/* Progress bar — always visible at card bottom */}
      <div className="h-0.5 w-full bg-teal-500/5">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: remaining === 0 
              ? "linear-gradient(90deg, #10a39e, #22c55e)" 
              : "linear-gradient(90deg, #0d8585, #14a0a0)",
          }}
        />
      </div>
    </div>
  );
}

