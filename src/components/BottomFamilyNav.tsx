import { families, Family, getFamilyFee, getFamilyCollected, fmt } from "@/data/config";

function FamilyTab({ family }: { family: Family }) {
  const totalFee = getFamilyFee(family);
  const collected = getFamilyCollected(family);
  const remaining = totalFee - collected;
  const pct = Math.round((collected / totalFee) * 100);

  const adults = family.members.filter((m) => m.type === "adult").length;
  const kids = family.members.filter((m) => m.type === "kid").length;

  const isFullyPaid = remaining === 0;

  return (
    <div
      className="flex-shrink-0 flex flex-col gap-1 px-4 py-3 rounded-2xl"
      style={{
        background: isFullyPaid
          ? "linear-gradient(135deg, #14532d 0%, #16a34a 100%)"
          : "linear-gradient(135deg, var(--color-teal-800) 0%, var(--color-teal-600) 100%)",
        minWidth: "130px",
        maxWidth: "150px",
      }}
    >
      {/* Family name */}
      <p className="text-white text-xs font-bold truncate leading-tight">
        {family.familyName.replace(" Family", "")}
      </p>

      {/* Member count */}
      <div className="flex items-center gap-1">
        <span className="text-teal-200 text-xs">
          {adults}A{kids > 0 ? ` · ${kids}K` : ""}
        </span>
        <span className="text-xs ml-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
          {family.members.length} members
        </span>
      </div>

      {/* Mini progress bar */}
      <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: isFullyPaid ? "#86efac" : "rgba(255,255,255,0.85)" }}
        />
      </div>

      {/* Collected / Remaining */}
      <div className="flex items-center justify-between mt-0.5">
        <div>
          <p className="text-green-300 text-xs font-semibold leading-tight">{fmt(collected)}</p>
          <p className="text-xs leading-tight" style={{ color: "rgba(255,255,255,0.5)" }}>collected</p>
        </div>
        {remaining > 0 ? (
          <div className="text-right">
            <p className="text-red-300 text-xs font-semibold leading-tight">{fmt(remaining)}</p>
            <p className="text-xs leading-tight" style={{ color: "rgba(255,255,255,0.5)" }}>pending</p>
          </div>
        ) : (
          <span className="text-green-300 text-xs font-bold">✓ Done</span>
        )}
      </div>
    </div>
  );
}

export default function BottomFamilyNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {/* Label row */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <p
          className="text-xs font-semibold tracking-wider uppercase"
          style={{ color: "var(--color-muted)" }}
        >
          Families
        </p>
        <p className="text-xs" style={{ color: "var(--color-muted)" }}>
          {families.length} total
        </p>
      </div>

      {/* Scrollable family cards */}
      <div
        className="flex gap-2.5 overflow-x-auto pb-3 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {families.map((family) => (
          <FamilyTab key={family.id} family={family} />
        ))}
      </div>
    </nav>
  );
}
