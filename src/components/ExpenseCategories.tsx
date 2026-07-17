import { expenseCategories, spends, fmt } from "@/data/config";

export default function ExpenseCategories() {
  const totalBudget = expenseCategories.reduce((s, c) => s + c.expected, 0);

  return (
    <section className="animate-fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
      <div className="card p-6">
        <h2 className="text-xl text-teal-800 mb-5">Expense Categories</h2>

        <div className="space-y-3">
          {expenseCategories.map((cat) => {
            const catSpent = spends
              .filter((s) => s.category === cat.name)
              .reduce((sum, s) => sum + s.amount, 0);
            const pct = Math.min(100, Math.round((catSpent / cat.expected) * 100));

            return (
              <div key={cat.name} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-sm font-semibold text-gray-700">{cat.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold" style={{ color: "var(--color-teal-700)" }}>
                      {fmt(cat.expected)}
                    </span>
                    {catSpent > 0 && (
                      <span className="text-xs text-amber-600 ml-2">
                        ({fmt(catSpent)} spent)
                      </span>
                    )}
                  </div>
                </div>
                {/* Thin progress bar per category */}
                <div className="h-1.5 rounded-full" style={{ background: "var(--color-teal-100)" }}>
                  {catSpent > 0 && (
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: "var(--color-amber-500)",
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total row */}
        <div
          className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100"
        >
          <span className="font-semibold text-gray-600 text-sm">Total Budget</span>
          <span className="font-bold text-lg" style={{ color: "var(--color-teal-800)" }}>
            {fmt(totalBudget)}
          </span>
        </div>
      </div>
    </section>
  );
}
