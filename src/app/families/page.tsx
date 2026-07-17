import FamilyCard from "@/components/FamilyCard";
import { families, FEE, getFamilyFee, getFamilyCollected, fmt } from "@/data/config";

export default function FamiliesPage() {
  const totalExpected  = families.reduce((s, f) => s + getFamilyFee(f), 0);
  const totalCollected = families.reduce((s, f) => s + getFamilyCollected(f), 0);
  const totalMembers   = families.reduce((s, f) => s + f.members.length, 0);
  const totalAdults    = families.reduce((s, f) => s + f.members.filter((m) => m.type === "adult").length, 0);
  const totalKids      = families.reduce((s, f) => s + f.members.filter((m) => m.type === "kid").length, 0);
  const totalInfants   = families.reduce((s, f) => s + f.members.filter((m) => m.type === "infant").length, 0);

  return (
    <div className="px-4 pt-5 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-teal-800 mb-1">Families</h1>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          {families.length} families · {totalMembers} members
        </p>
      </div>

      {/* Fee legend */}
      <div className="card p-4">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-muted)" }}>
          Fee Structure
        </p>
        <div className="flex gap-3">
          <div className="flex-1 text-center p-2.5 rounded-xl" style={{ background: "#e0f2fe" }}>
            <p className="text-xs font-semibold text-blue-600">Above 12</p>
            <p className="text-sm font-bold text-blue-800 mt-0.5">{fmt(FEE.adult)}</p>
            <p className="text-xs text-blue-500 mt-0.5">{totalAdults} members</p>
          </div>
          <div className="flex-1 text-center p-2.5 rounded-xl" style={{ background: "#fef9c3" }}>
            <p className="text-xs font-semibold text-amber-600">6–12</p>
            <p className="text-sm font-bold text-amber-800 mt-0.5">{fmt(FEE.kid)}</p>
            <p className="text-xs text-amber-500 mt-0.5">{totalKids} members</p>
          </div>
          <div className="flex-1 text-center p-2.5 rounded-xl" style={{ background: "#dcfce7" }}>
            <p className="text-xs font-semibold text-green-600">0–6</p>
            <p className="text-sm font-bold text-green-800 mt-0.5">Free</p>
            <p className="text-xs text-green-500 mt-0.5">{totalInfants} members</p>
          </div>
        </div>
      </div>

      {/* Family accordion list */}
      <div className="space-y-2">
        {families.map((family) => (
          <FamilyCard key={family.id} family={family} />
        ))}
      </div>

      {/* Grand total */}
      <div
        className="card p-4 flex items-center justify-between"
        style={{ borderLeft: "4px solid var(--color-teal-600)" }}
      >
        <div>
          <p className="text-xs font-medium" style={{ color: "var(--color-muted)" }}>Total Collected</p>
          <p className="text-xl font-bold text-green-700">{fmt(totalCollected)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium" style={{ color: "var(--color-muted)" }}>Still Pending</p>
          <p className="text-xl font-bold" style={{ color: "var(--color-coral-500)" }}>
            {fmt(totalExpected - totalCollected)}
          </p>
        </div>
      </div>
    </div>
  );
}
