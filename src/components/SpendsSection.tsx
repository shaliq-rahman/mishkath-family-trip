import { spends, fmt } from "@/data/config";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const categoryColors: Record<string, { bg: string; color: string }> = {
  Transport: { bg: "#dbeafe", color: "#1d4ed8" },
  Accommodation: { bg: "#ede9fe", color: "#6d28d9" },
  "Food & Dining": { bg: "#fef9c3", color: "#a16207" },
  Activities: { bg: "#dcfce7", color: "#15803d" },
  Miscellaneous: { bg: "#f1f5f9", color: "#475569" },
};

export default function SpendsSection() {
  const total = spends.reduce((s, sp) => s + sp.amount, 0);

  if (spends.length === 0) {
    return (
      <section className="animate-fade-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
        <div className="card p-6">
          <h2 className="text-xl text-teal-800 mb-3">Spends</h2>
          <p className="text-sm text-center py-6" style={{ color: "var(--color-muted)" }}>
            No spends recorded yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="animate-fade-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl text-teal-800">Spends</h2>
          <span
            className="text-sm font-semibold px-3 py-1 rounded-full"
            style={{ background: "var(--color-amber-100)", color: "#92400e" }}
          >
            {spends.length} {spends.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        <div className="space-y-3">
          {spends.map((spend) => {
            const badge = categoryColors[spend.category] ?? categoryColors["Miscellaneous"];
            return (
              <div
                key={spend.id}
                className="flex items-start justify-between gap-3 p-3 rounded-xl"
                style={{ background: "var(--color-teal-50)" }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {spend.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ background: badge.bg, color: badge.color }}
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
        </div>

        {/* Total row */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <span className="font-semibold text-gray-600 text-sm">Total Spent</span>
          <span className="font-bold text-lg" style={{ color: "var(--color-amber-500)" }}>
            {fmt(total)}
          </span>
        </div>
      </div>
    </section>
  );
}
