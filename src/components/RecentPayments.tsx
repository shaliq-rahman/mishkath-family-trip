import { Payment, fmt } from "@/data/config";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

const familyColors: Record<string, string> = {
  "1": "#0a6b6b",
  "2": "#1d4ed8",
  "3": "#7c3aed",
  "4": "#b45309",
};

export default function RecentPayments({ payments }: { payments: Payment[] }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold" style={{ color: "var(--color-ink)" }}>
          Recent Payments
        </h2>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: "var(--color-teal-100)", color: "var(--color-teal-700)" }}
        >
          {payments.length} payments
        </span>
      </div>

      <div className="space-y-2">
        {payments.map((p) => {
          const avatarColor = familyColors[p.familyId] ?? "#374151";
          return (
            <div
              key={p.id}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "var(--color-teal-50)" }}
            >
              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ background: avatarColor }}
              >
                {p.personName[0]}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {p.personName}
                </p>
                <p className="text-xs truncate" style={{ color: "var(--color-muted)" }}>
                  {p.familyName} ·{" "}
                  <span className="capitalize">{p.type}</span>
                </p>
              </div>

              {/* Right: amount + date */}
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-green-700">{fmt(p.amount)}</p>
                <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                  {formatDate(p.date)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {payments.length === 0 && (
        <p className="text-center text-sm py-8" style={{ color: "var(--color-muted)" }}>
          No payments recorded yet.
        </p>
      )}
    </div>
  );
}
