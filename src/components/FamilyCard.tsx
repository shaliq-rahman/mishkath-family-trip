import { Family, FEE, AGE_LABEL, getFamilyFee, getFamilyCollected, fmt } from "@/data/config";

const ageStyle: Record<string, { bg: string; color: string }> = {
  adult:  { bg: "#e0f2fe", color: "#0369a1" },
  kid:    { bg: "#fef9c3", color: "#a16207" },
  infant: { bg: "#dcfce7", color: "#15803d" },
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
      <details>
        {/* ── Collapsed header ── */}
        <summary className="flex items-center gap-3 px-4 py-3.5 cursor-pointer select-none">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: "var(--color-teal-600)" }}
          >
            {family.familyName[0]}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-800 leading-tight truncate">
              {family.familyName}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
              {adults > 0 && `${adults}A`}
              {kids > 0 && ` · ${kids}K`}
              {infants > 0 && ` · ${infants} infant`}
              {" · "}
              <span className={remaining === 0 ? "text-green-600 font-semibold" : ""}>
                {remaining === 0 ? "Fully paid ✓" : `${fmt(remaining)} pending`}
              </span>
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-sm font-bold" style={{ color: "var(--color-teal-700)" }}>
              {fmt(collected)}
            </p>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              of {fmt(totalFee)}
            </p>
          </div>

          <svg
            className="chevron-icon shrink-0"
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{ color: "var(--color-muted)" }}
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>

        {/* ── Expanded member rows ── */}
        <div className="divide-y divide-gray-50">
          {family.members.map((m) => {
            const due       = FEE[m.type];
            const isFree    = due === 0;
            const isPaid    = !isFree && m.paid >= due;
            const isPartial = !isFree && m.paid > 0 && m.paid < due;
            const style     = ageStyle[m.type];

            return (
              <div key={m.name} className="flex items-center gap-3 px-4 py-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: isFree ? "#16a34a" : "var(--color-teal-600)" }}
                >
                  {m.name[0]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-gray-800">{m.name}</p>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: style.bg, color: style.color }}
                    >
                      {AGE_LABEL[m.type]}{isFree && " · Free"}
                    </span>
                  </div>
                  {isPartial && (
                    <p className="text-xs mt-0.5 text-amber-600">
                      Paid {fmt(m.paid)} of {fmt(due)}
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  {isFree ? (
                    <span className="text-xs font-bold text-green-600">Free</span>
                  ) : (
                    <>
                      <p className="text-sm font-bold" style={{ color: "var(--color-teal-700)" }}>
                        {fmt(due)}
                      </p>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={
                          isPaid
                            ? { background: "#dcfce7", color: "#15803d" }
                            : isPartial
                            ? { background: "#fef9c3", color: "#a16207" }
                            : { background: "#fee2e2", color: "#dc2626" }
                        }
                      >
                        {isPaid ? "Paid" : isPartial ? "Partial" : "Unpaid"}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </details>

      {/* Progress bar — always visible */}
      <div className="h-0.5 mx-4" style={{ background: "var(--color-teal-100)" }}>
        <div
          className="h-full"
          style={{
            width: `${pct}%`,
            background: remaining === 0 ? "#16a34a" : "var(--color-teal-500)",
          }}
        />
      </div>
    </div>
  );
}
