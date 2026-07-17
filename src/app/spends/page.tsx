import { spends, fmt } from "@/data/config";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const categoryStyle: Record<string, { bg: string; color: string; icon: string }> = {
  Transport:       { bg: "rgba(29, 78, 216, 0.06)", color: "#1d4ed8", icon: "🚌" },
  Accommodation:   { bg: "rgba(109, 40, 217, 0.06)", color: "#6d28d9", icon: "🏨" },
  "Food & Dining": { bg: "rgba(161, 98, 7, 0.06)", color: "#a16207", icon: "🍽️" },
  Activities:      { bg: "rgba(21, 128, 61, 0.06)", color: "#15803d", icon: "🎡" },
  Miscellaneous:   { bg: "rgba(71, 85, 105, 0.06)", color: "#475569", icon: "📦" },
};

export default function SpendsPage() {
  const total = spends.reduce((s, sp) => s + sp.amount, 0);
  const sorted = [...spends].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="px-4 pt-6 space-y-4">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-extrabold text-teal-950">Spends</h1>
        <p className="text-xs text-gray-400 font-semibold mt-1">
          {spends.length} {spends.length === 1 ? "entry" : "entries"} · {fmt(total)} total spent
        </p>
      </div>

      {/* Spends list */}
      <div className="card p-5 space-y-3.5">
        {sorted.length === 0 && (
          <p className="text-center text-xs py-8 text-gray-400 font-semibold">
            No spends recorded yet.
          </p>
        )}

        {sorted.map((spend) => {
          const style = categoryStyle[spend.category] ?? categoryStyle["Miscellaneous"];
          return (
            <div
              key={spend.id}
              className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-gray-50/30 transition-colors duration-200"
              style={{ background: "rgba(16, 163, 158, 0.03)" }}
            >
              {/* Category icon */}
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shrink-0 shadow-sm border border-white/50"
                style={{ background: style.bg }}
              >
                {style.icon}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-800 leading-tight">
                  {spend.description}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: style.bg, color: style.color }}
                  >
                    {spend.category}
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold">
                    {formatDate(spend.date)}
                  </span>
                </div>
              </div>

              <p className="text-sm font-extrabold shrink-0 text-teal-950">
                {fmt(spend.amount)}
              </p>
            </div>
          );
        })}

        {sorted.length > 0 && (
          <div className="flex items-center justify-between pt-3.5 border-t border-gray-100/50">
            <span className="font-bold text-gray-400 text-[10px] uppercase tracking-wider">Total Spent</span>
            <span className="font-extrabold text-base text-amber-500">
              {fmt(total)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

