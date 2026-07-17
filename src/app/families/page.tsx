import FamilyCard from "@/components/FamilyCard";
import { families, FEE, getFamilyFee, getFamilyCollected, fmt } from "@/data/config";

export default function FamiliesPage() {
  const totalExpected  = families.reduce((s, f) => s + getFamilyFee(f), 0);
  const totalCollected = families.reduce((s, f) => s + getFamilyCollected(f), 0);
  const totalRemaining = totalExpected - totalCollected;
  const totalMembers   = families.reduce((s, f) => s + f.members.length, 0);
  const totalAdults    = families.reduce((s, f) => s + f.members.filter((m) => m.type === "adult").length, 0);
  const totalKids      = families.reduce((s, f) => s + f.members.filter((m) => m.type === "kid").length, 0);
  const totalInfants   = families.reduce((s, f) => s + f.members.filter((m) => m.type === "infant").length, 0);

  return (
    <div className="px-4 pt-6 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-teal-950">Families</h1>
        <p className="text-xs text-gray-400 font-semibold mt-1">
          {families.length} families · {totalMembers} members
        </p>
      </div>

      {/* Fee legend */}
      <div className="card p-4 space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
          Fee Structure
        </p>
        <div className="flex gap-2.5">
          <div className="flex-1 text-center p-2.5 rounded-2xl bg-blue-50/50 border border-blue-100">
            <p className="text-[9px] font-bold text-blue-600 uppercase tracking-wide">Above 12</p>
            <p className="text-base font-bold text-blue-900 mt-1">{fmt(FEE.adult)}</p>
            <p className="text-[10px] text-blue-500/80 font-medium mt-0.5">{totalAdults} members</p>
          </div>
          <div className="flex-1 text-center p-2.5 rounded-2xl bg-amber-50/50 border border-amber-100">
            <p className="text-[9px] font-bold text-amber-600 uppercase tracking-wide">6–12</p>
            <p className="text-base font-bold text-amber-900 mt-1">{fmt(FEE.kid)}</p>
            <p className="text-[10px] text-amber-500/80 font-medium mt-0.5">{totalKids} members</p>
          </div>
          <div className="flex-1 text-center p-2.5 rounded-2xl bg-green-50/50 border border-green-100">
            <p className="text-[9px] font-bold text-green-600 uppercase tracking-wide">0–6</p>
            <p className="text-base font-bold text-green-950 mt-1">Free</p>
            <p className="text-[10px] text-green-500/80 font-medium mt-0.5">{totalInfants} members</p>
          </div>
        </div>
      </div>

      {/* Family Accordion list */}
      <div className="space-y-2.5">
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
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Collected</p>
          <p className="text-lg font-bold text-teal-700 mt-0.5">{fmt(totalCollected)}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Still Pending</p>
          <p className="text-lg font-bold text-red-500 mt-0.5">
            {fmt(totalRemaining)}
          </p>
        </div>
      </div>
    </div>
  );
}

