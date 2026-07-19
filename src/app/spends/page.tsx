import { families, spends, fmt, getFamilyCollected } from "@/data/config";
import PageVectorArt from "@/components/PageVectorArt";

const categoryColors: Record<string, string> = {
  Transport: "#2563eb",
  Accommodation: "#7c3aed",
  "Food & Dining": "#d97706",
  Activities: "#0f766e",
  Miscellaneous: "#64748b",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function percent(value: number, total: number) {
  return total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
}

export default function SpendsPage() {
  const totalCollected = families.reduce((sum, family) => sum + getFamilyCollected(family), 0);
  const totalSpent = spends.reduce((sum, spend) => sum + spend.amount, 0);
  const totalLeft = totalCollected - totalSpent;
  const spentPct = percent(totalSpent, totalCollected);
  const isOverSpent = totalLeft < 0;
  const sortedSpends = [...spends].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <main className="textured-page min-h-[calc(100vh-110px)] px-5 pb-4 pt-6 text-[#0f172a]">
      <PageVectorArt variant="spends" />
      <header className="relative z-10">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0f766e]">
          Money Out
        </p>
        <h1 className="mt-1 text-[34px] font-extrabold leading-none tracking-normal text-[#123331]">
          Spends
        </h1>
        <p className="mt-2 text-sm font-medium text-[#64748b]">
          Spends are measured against the money collected from families.
        </p>
      </header>

      <section className="glass-panel relative z-10 mt-5 rounded-[24px] px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748b]">
              Total Spent
            </p>
            <p className="mt-1 text-[30px] font-extrabold leading-none text-[#ef4444]">
              {fmt(totalSpent)}
            </p>
          </div>

          <div className={`glass-soft rounded-[18px] px-4 py-3 text-right ${isOverSpent ? "bg-[#fef2f2]/45" : "bg-[#ecfdf5]/45"}`}>
            <p className={`text-[11px] font-bold ${isOverSpent ? "text-[#ef4444]" : "text-[#0f766e]"}`}>
              {isOverSpent ? "Over Spent" : "Remaining"}
            </p>
            <p className={`mt-1 text-[18px] font-extrabold ${isOverSpent ? "text-[#ef4444]" : "text-[#0f766e]"}`}>
              {fmt(Math.abs(totalLeft))}
            </p>
          </div>
        </div>

        <div className="mt-4 h-2 rounded-full bg-white/38">
          <div
            className="h-full rounded-full bg-[#ef4444]"
            style={{ width: `${spentPct}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[12px] font-bold">
          <span className="text-[#ef4444]">{spentPct}% of collected used</span>
          <span className="text-[#64748b]">Collected {fmt(totalCollected)}</span>
        </div>
      </section>

      <section className="relative z-10 mt-5">
        <h2 className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#334155]">
          Spend List
        </h2>

        <div className="glass-card mt-3 overflow-hidden rounded-[22px]">
          {sortedSpends.map((spend, index) => {
            const color = categoryColors[spend.category] ?? "#0f766e";

            return (
              <article
                key={spend.id}
                className={`flex items-center gap-3 px-4 py-4 ${
                  index === 0 ? "" : "border-t border-white/45"
                }`}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] text-[16px] font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                  style={{ backgroundColor: color }}
                >
                  {spend.category.charAt(0)}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[15px] font-extrabold text-[#122827]">
                    {spend.description}
                  </h3>
                  <p className="mt-0.5 text-[12px] font-semibold text-[#64748b]">
                    {spend.category} • {formatDate(spend.date)}
                  </p>
                </div>

                <p className="shrink-0 text-[16px] font-extrabold text-[#ef4444]">
                  {fmt(spend.amount)}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
