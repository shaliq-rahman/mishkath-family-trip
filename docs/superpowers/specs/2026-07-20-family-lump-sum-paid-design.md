# Family-level lump-sum paid amount — Design

Date: 2026-07-20
Status: Approved

## Goal

Let an admin record a **family-level lump-sum paid amount** for each family, in
addition to the existing per-member `paid` tracking. The lump sum contributes to
the family's Collected total everywhere it is displayed.

## Decisions

- **Tracking:** family-level lump sum (not attributed to a specific member).
- **Location:** admin Families page only (`/admin/...`). The public Families page
  stays read-only.
- **Input style:** an **editable number input** (sets the value), matching the
  existing per-member `paid` inputs, so mistakes are easily corrected.
- **Payments log:** a family lump sum is **not** written to the Payments log
  (that record requires a person + age type). It lives only on the family.

## Payment model (finalized)

A family's payment is a **single lump sum** (`family.familyPaid`), entered on the
admin Families page. Per-member `paid` is **no longer summed** into the family
total — doing so double-counted against the lump sum. Per person we only show the
**fee owed** (the amount that needs to be paid).

- **Total** = sum of member fees (`₹1600` adult, `₹700` kid, `₹0` infant).
- **Paid**  = `family.familyPaid ?? 0`.
- **Pending** = `max(0, Total − Paid)`.
- **% paid** = `Total > 0 ? min(100, round(Paid / Total × 100)) : (Paid > 0 ? 100 : 0)`.

## Data model — `src/data/config.ts`

- Add optional field to `Family`:
  ```ts
  export interface Family {
    id: string;
    familyName: string;
    members: Person[];
    familyPaid?: number; // lump-sum amount paid, recorded at the family level
  }
  ```
- The collected helper returns the lump sum only:
  ```ts
  export function getFamilyCollected(family: Family): number {
    return family.familyPaid ?? 0;
  }
  ```
- The `?? 0` guard keeps existing Supabase rows (which lack the field) working.
  `trip_data.data` is `jsonb`, so no database migration is required.
- `Person.paid` remains in the type for backward compatibility but is unused in
  totals.

## Store — `src/data/trip-store.tsx`

- Add to the context value:
  ```ts
  updateFamilyPaid: (familyId: string, familyPaid: number) => void;
  ```
- Implementation mirrors `updateMemberPaid`: it sets `familyPaid` on the matching
  family and persists through the existing `commitData` / `persistData` flow
  (PUT `/api/trip-data`).

## Admin Families page — `src/app/admin/families/page.tsx`

- Each family card shows a **Total / Paid / Pending** stat row and a **"X% paid"**
  badge, derived from Total (fees) and `familyPaid`.
- An **"Amount paid"** editable number input, bound to `family.familyPaid ?? 0`,
  calling `updateFamilyPaid(family.id, Number(value))` on change.
- Member rows are **read-only**, showing each person's **fee owed** (or "Free").
  The per-member paid input and `updateMemberPaid` usage were removed here.

## Public Families page — `src/app/families/page.tsx`

- Family-card summary, progress bars, and the top Target/Collected/Pending totals
  use `getFamilyCollected` (= `familyPaid`), so they reflect the lump sum.
- Member rows are read-only, showing each person's **fee owed** (or "Free"),
  matching the admin page.

## Backward compatibility

- `familyPaid` is optional; all reads use `?? 0`.
- No schema/migration change (jsonb column already stores arbitrary family shape).
