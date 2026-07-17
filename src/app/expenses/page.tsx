import { expenseCategories, spends, fmt } from "@/data/config";

export default function ExpensesPage() {
  const totalBudget = expenseCategories.reduce((s, c) => s + c.expected, 0);
  const totalSpent = spends.reduce((s, sp) => s + sp.amount, 0);
  const budgetLeft = totalBudget - totalSpent;

  return (
    <div className="px-4 pt-6 space-y-4">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-extrabold text-teal-950">Expected Expenses</h1>
        <p className="text-xs text-gray-400 font-semibold mt-1">
          {expenseCategories.length} categories · {fmt(totalBudget)} total budget
        </p>
      </div>

      {/* Budget overview */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="card p-3 text-center flex flex-col justify-between min-h-[75px]">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Budget</p>
          <p className="text-sm font-bold text-teal-800 mt-1">
            {fmt(totalBudget)}
          </p>
        </div>
        <div className="card p-3 text-center flex flex-col justify-between min-h-[75px]">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Spent</p>
          <p className="text-sm font-bold text-amber-700 mt-1">{fmt(totalSpent)}</p>
        </div>
        <div className="card p-3 text-center flex flex-col justify-between min-h-[75px]">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Left</p>
          <p className="text-sm font-bold text-green-700 mt-1">{fmt(budgetLeft)}</p>
        </div>
      </div>

      {/* Categories */}
      <div className="card p-5 space-y-4">
        {expenseCategories.map((cat) => {
          const catSpent = spends
            .filter((s) => s.category === cat.name)
            .reduce((sum, s) => sum + s.amount, 0);
          const pct = Math.min(100, Math.round((catSpent / cat.expected) * 100));

          return (
            <div key={cat.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="w-9 h-9 rounded-2xl flex items-center justify-center text-base shadow-sm"
                    style={{ background: "rgba(16, 163, 158, 0.06)" }}
                  >
                    {cat.icon}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{cat.name}</p>
                    {catSpent > 0 && (
                      <p className="text-[10px] text-amber-600 font-semibold mt-0.5">{fmt(catSpent)} spent</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-teal-900">
                    {fmt(cat.expected)}
                  </p>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                    {fmt(cat.expected - catSpent)} left
                  </p>
                </div>
              </div>
              
              {/* Thin Custom Progress Bar */}
              <div className="h-1 rounded-full w-full bg-teal-500/5 overflow-hidden">
                {catSpent > 0 && (
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: "linear-gradient(90deg, var(--color-amber-400), var(--color-amber-500))" }}
                  />
                )}
              </div>
            </div>
          );
        })}

        <div className="flex items-center justify-between pt-3.5 border-t border-gray-100/50">
          <span className="font-bold text-gray-400 text-[10px] uppercase tracking-wider">Total Budget</span>
          <span className="font-extrabold text-base text-teal-950">
            {fmt(totalBudget)}
          </span>
        </div>
      </div>
    </div>
  );
}

