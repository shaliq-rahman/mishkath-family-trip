import { expenseCategories, spends, fmt } from "@/data/config";

export default function ExpensesPage() {
  const totalBudget = expenseCategories.reduce((s, c) => s + c.expected, 0);
  const totalSpent = spends.reduce((s, sp) => s + sp.amount, 0);
  const budgetLeft = totalBudget - totalSpent;

  return (
    <div className="px-4 pt-5 space-y-4">
      {/* Page header */}
      <div>
        <h1 className="text-2xl text-teal-800 mb-1">Expected Expenses</h1>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          {expenseCategories.length} categories · {fmt(totalBudget)} total budget
        </p>
      </div>

      {/* Budget overview */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-3 text-center">
          <p className="text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>Budget</p>
          <p className="text-base font-bold" style={{ color: "var(--color-teal-700)" }}>
            {fmt(totalBudget)}
          </p>
        </div>
        <div className="card p-3 text-center">
          <p className="text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>Spent</p>
          <p className="text-base font-bold text-amber-700">{fmt(totalSpent)}</p>
        </div>
        <div className="card p-3 text-center">
          <p className="text-xs font-medium mb-1" style={{ color: "var(--color-muted)" }}>Left</p>
          <p className="text-base font-bold text-green-700">{fmt(budgetLeft)}</p>
        </div>
      </div>

      {/* Categories */}
      <div className="card p-5 space-y-5">
        {expenseCategories.map((cat) => {
          const catSpent = spends
            .filter((s) => s.category === cat.name)
            .reduce((sum, s) => sum + s.amount, 0);
          const pct = Math.min(100, Math.round((catSpent / cat.expected) * 100));

          return (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: "var(--color-teal-50)" }}
                  >
                    {cat.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{cat.name}</p>
                    {catSpent > 0 && (
                      <p className="text-xs text-amber-600">{fmt(catSpent)} spent</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold" style={{ color: "var(--color-teal-700)" }}>
                    {fmt(cat.expected)}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                    {fmt(cat.expected - catSpent)} left
                  </p>
                </div>
              </div>
              <div className="h-2 rounded-full" style={{ background: "var(--color-teal-100)" }}>
                {catSpent > 0 && (
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: "var(--color-amber-500)" }}
                  />
                )}
              </div>
            </div>
          );
        })}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="font-semibold text-gray-600 text-sm">Total Budget</span>
          <span className="font-bold text-lg" style={{ color: "var(--color-teal-800)" }}>
            {fmt(totalBudget)}
          </span>
        </div>
      </div>
    </div>
  );
}
