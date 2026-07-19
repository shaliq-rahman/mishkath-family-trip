import { expenseCategories, spends, fmt } from "@/data/config";

const categoryColors: Record<string, string> = {
  Transport: "#2563eb",
  Accommodation: "#7c3aed",
  "Food & Dining": "#d97706",
  Activities: "#0f766e",
  Miscellaneous: "#64748b",
};

function percent(value: number, total: number) {
  return total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
}

export default function BudgetPage() {
  const totalBudget = expenseCategories.reduce((sum, category) => sum + category.expected, 0);
  const totalSpent = spends.reduce((sum, spend) => sum + spend.amount, 0);
  const totalLeft = totalBudget - totalSpent;
  const spentPct = percent(totalSpent, totalBudget);

  const categories = expenseCategories.map((category) => {
    const spent = spends
      .filter((spend) => spend.category === category.name)
      .reduce((sum, spend) => sum + spend.amount, 0);

    return {
      ...category,
      spent,
      left: category.expected - spent,
      usedPct: percent(spent, category.expected),
      color: categoryColors[category.name] ?? "#0f766e",
    };
  });

  return (
    <main className="min-h-[calc(100vh-110px)] bg-[#f6f8f7] px-5 pb-4 pt-6 text-[#0f172a]">
      <header>
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0f766e]">
          Trip Plan
        </p>
        <h1 className="mt-1 text-[34px] font-extrabold leading-none tracking-normal text-[#123331]">
          Budget
        </h1>
        <p className="mt-2 text-sm font-medium text-[#64748b]">
          Planned trip costs, money already used, and what is still available.
        </p>
      </header>

      <section className="mt-5 rounded-[24px] bg-white px-4 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-[11px] font-bold text-[#64748b]">Planned</p>
            <p className="mt-1 text-[17px] font-extrabold text-[#0f172a]">{fmt(totalBudget)}</p>
          </div>
          <div className="border-x border-[#e2e8f0]">
            <p className="text-[11px] font-bold text-[#64748b]">Used</p>
            <p className="mt-1 text-[17px] font-extrabold text-[#ef4444]">{fmt(totalSpent)}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#64748b]">Available</p>
            <p className="mt-1 text-[17px] font-extrabold text-[#0f766e]">{fmt(totalLeft)}</p>
          </div>
        </div>

        <div className="mt-4 h-2 rounded-full bg-[#e2e8f0]">
          <div
            className="h-full rounded-full bg-[#0f766e]"
            style={{ width: `${spentPct}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[12px] font-bold">
          <span className="text-[#0f766e]">{spentPct}% of budget used</span>
          <span className="text-[#64748b]">{fmt(totalLeft)} available</span>
        </div>
      </section>

      <section className="mt-5">
        <h2 className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#334155]">
          Budget Categories
        </h2>

        <div className="mt-3 space-y-3">
          {categories.map((category) => (
            <article
              key={category.name}
              className="rounded-[20px] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-[#f1f5f9] text-xl">
                  {category.icon}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-[15px] font-extrabold text-[#122827]">
                        {category.name}
                      </h3>
                      <p className="mt-0.5 text-[12px] font-semibold text-[#64748b]">
                        Planned {fmt(category.expected)} • Used {fmt(category.spent)}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[15px] font-extrabold" style={{ color: category.color }}>
                        {fmt(category.left)}
                      </p>
                      <p className="text-[11px] font-semibold text-[#64748b]">available</p>
                    </div>
                  </div>

                  <div className="mt-3 h-1.5 rounded-full bg-[#e2e8f0]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${category.usedPct}%`, backgroundColor: category.color }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
