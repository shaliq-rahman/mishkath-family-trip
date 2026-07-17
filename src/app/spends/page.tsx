import { spends, fmt } from "@/data/config";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const categoryStyle: Record<string, { bg: string; color: string; icon: string }> = {
  Transport:       { bg: "#dbeafe", color: "#1d4ed8", icon: "🚌" },
  Accommodation:   { bg: "#ede9fe", color: "#6d28d9", icon: "🏨" },
  "Food & Dining": { bg: "#fef9c3", color: "#a16207", icon: "🍽️" },
  Activities:      { bg: "#dcfce7", color: "#15803d", icon: "🎡" },
  Miscellaneous:   { bg: "#f1f5f9", color: "#475569", icon: "📦" },
};

export default function SpendsPage() {
  const total = spends.reduce((s, sp) => s + sp.amount, 0);
  const sorted = [...spends].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="px-4 pt-5 space-y-4">
      {/* Page header */}
      <div>
        <h1 className="text-2xl text-teal-800 mb-1">Spends</h1>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          {spends.length} {spends.length === 1 ? "entry" : "entries"} · {fmt(total)} total spent
        </p>
      </div>

      {/* Spends list */}
      <div className="card p-5 space-y-3">
        {sorted.length === 0 && (
          <p className="text-center text-sm py-8" style={{ color: "var(--color-muted)" }}>
            No spends recorded yet.
          </p>
        )}

        {sorted.map((spend) => {
          const style = categoryStyle[spend.category] ?? categoryStyle["Miscellaneous"];
          return (
            <div
              key={spend.id}
              className="flex items-start gap-3 p-3 rounded-xl"
              style={{ background: "var(--color-teal-50)" }}
            >
              {/* Category icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                style={{ background: style.bg }}
              >
                {style.icon}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {spend.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ background: style.bg, color: style.color }}
                  >
                    {spend.category}
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-muted)" }}>
                    {formatDate(spend.date)}
                  </span>
                </div>
              </div>

              <p className="text-sm font-bold shrink-0" style={{ color: "var(--color-teal-700)" }}>
                {fmt(spend.amount)}
              </p>
            </div>
          );
        })}

        {sorted.length > 0 && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="font-semibold text-gray-600 text-sm">Total Spent</span>
            <span className="font-bold text-lg" style={{ color: "var(--color-amber-500)" }}>
              {fmt(total)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
