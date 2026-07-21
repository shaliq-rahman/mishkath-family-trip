"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  type PersonType,
} from "@/data/config";
import { type TripData } from "@/data/trip-data";
import { type AdminRole } from "@/data/admin-types";

type AddPaymentInput = {
  familyId: string;
  personName: string;
  type: PersonType;
  amount: number;
  date: string;
};

type AddFamilyPaymentInput = {
  familyId: string;
  amount: number;
  date: string;
};

type AddSpendInput = {
  description: string;
  category: string;
  amount: number;
  date: string;
};

type TripDataContextValue = TripData & {
  addPayment: (payment: AddPaymentInput) => void;
  addFamilyPayment: (payment: AddFamilyPaymentInput) => void;
  addSpend: (spend: AddSpendInput) => void;
  updateCategoryBudget: (name: string, expected: number) => void;
  updateMemberPaid: (familyId: string, memberName: string, paid: number) => void;
  updateMemberDetails: (familyId: string, memberName: string, next: { name: string; type: PersonType }) => void;
  updateFamilyPaid: (familyId: string, familyPaid: number) => void;
  addFamily: (familyName: string) => void;
  addMember: (familyId: string, member: { name: string; type: PersonType; paid: number }) => void;
  addCategory: (name: string, expected: number) => void;
  resetData: () => void;
  syncStatus: "idle" | "saving" | "saved" | "error";
  syncError: string | null;
  isAdmin: boolean;
  adminRole: AdminRole | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const TripDataContext = createContext<TripDataContextValue | null>(null);

export function TripDataProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData: TripData;
}) {
  const [data, setData] = useState<TripData>(initialData);
  const [syncStatus, setSyncStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [syncError, setSyncError] = useState<string | null>(null);
  const [adminRole, setAdminRole] = useState<AdminRole | null>(null);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((response) => response.json())
      .then((session: { role: AdminRole | null }) => setAdminRole(session.role))
      .catch(() => setAdminRole(null));
  }, []);

  const persistData = useCallback((nextData: TripData) => {
    setSyncStatus("saving");
    setSyncError(null);

    fetch("/api/trip-data", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(nextData),
    })
      .then(async (response) => {
        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(payload?.error ?? "Database save failed.");
        }
        setSyncStatus("saved");
      })
      .catch((error: unknown) => {
        setSyncStatus("error");
        setSyncError(error instanceof Error ? error.message : "Database save failed.");
      });
  }, []);

  const commitData = useCallback(
    (producer: (current: TripData) => TripData) => {
      setData((current) => {
        const nextData = producer(current);
        if (nextData !== current) {
          persistData(nextData);
        }
        return nextData;
      });
    },
    [persistData],
  );

  const addPayment = useCallback((payment: AddPaymentInput) => {
    commitData((current) => {
      const family = current.families.find((item) => item.id === payment.familyId);
      if (!family) return current;

      const newPayment = {
        id: `p${Date.now()}`,
        familyId: family.id,
        familyName: family.familyName,
        personName: payment.personName.trim(),
        type: payment.type,
        amount: payment.amount,
        date: payment.date,
        kind: "member" as const,
      };

      return {
        ...current,
        payments: [...current.payments, newPayment],
        families: current.families.map((item) =>
          item.id === family.id
            ? {
                ...item,
                members: item.members.map((member) =>
                  member.name === payment.personName
                    ? { ...member, paid: member.paid + payment.amount }
                    : member,
                ),
              }
            : item,
        ),
      };
    });
  }, [commitData]);

  const addFamilyPayment = useCallback((payment: AddFamilyPaymentInput) => {
    commitData((current) => {
      const family = current.families.find((item) => item.id === payment.familyId);
      if (!family) return current;

      const amount = Math.max(0, payment.amount);
      if (amount <= 0) return current;

      const newPayment = {
        id: `fp${Date.now()}`,
        familyId: family.id,
        familyName: family.familyName,
        personName: family.familyName,
        amount,
        date: payment.date,
        kind: "family" as const,
      };

      return {
        ...current,
        payments: [...current.payments, newPayment],
        families: current.families.map((item) =>
          item.id === family.id
            ? { ...item, familyPaid: (item.familyPaid ?? 0) + amount }
            : item,
        ),
      };
    });
  }, [commitData]);

  const addSpend = useCallback((spend: AddSpendInput) => {
    commitData((current) => ({
      ...current,
      spends: [
        ...current.spends,
        {
          id: String(Date.now()),
          description: spend.description.trim(),
          category: spend.category,
          amount: spend.amount,
          date: spend.date,
        },
      ],
    }));
  }, [commitData]);

  const updateCategoryBudget = useCallback((name: string, expected: number) => {
    commitData((current) => ({
      ...current,
      expenseCategories: current.expenseCategories.map((category) =>
        category.name === name ? { ...category, expected } : category,
      ),
    }));
  }, [commitData]);

  const addCategory = useCallback((name: string, expected: number) => {
    commitData((current) => ({
      ...current,
      expenseCategories: [
        ...current.expenseCategories,
        { name: name.trim(), expected, icon: "📦" },
      ],
    }));
  }, [commitData]);

  const updateMemberPaid = useCallback((familyId: string, memberName: string, paid: number) => {
    commitData((current) => ({
      ...current,
      families: current.families.map((family) =>
        family.id === familyId
          ? {
              ...family,
              members: family.members.map((member) =>
                member.name === memberName ? { ...member, paid } : member,
              ),
            }
          : family,
      ),
    }));
  }, [commitData]);

  const updateMemberDetails = useCallback(
    (familyId: string, memberName: string, next: { name: string; type: PersonType }) => {
      const nextName = next.name.trim();
      if (!nextName) return;

      commitData((current) => ({
        ...current,
        families: current.families.map((family) =>
          family.id === familyId
            ? {
                ...family,
                members: family.members.map((member) =>
                  member.name === memberName ? { ...member, name: nextName, type: next.type } : member,
                ),
              }
            : family,
        ),
        payments: current.payments.map((payment) =>
          payment.familyId === familyId && payment.personName === memberName
            ? { ...payment, personName: nextName, type: next.type }
            : payment,
        ),
      }));
    },
    [commitData],
  );

  const updateFamilyPaid = useCallback((familyId: string, familyPaid: number) => {
    commitData((current) => ({
      ...current,
      families: current.families.map((family) =>
        family.id === familyId ? { ...family, familyPaid } : family,
      ),
    }));
  }, [commitData]);

  const addFamily = useCallback((familyName: string) => {
    commitData((current) => ({
      ...current,
      families: [
        ...current.families,
        {
          id: String(Date.now()),
          familyName: familyName.trim(),
          members: [],
        },
      ],
    }));
  }, [commitData]);

  const addMember = useCallback((familyId: string, member: { name: string; type: PersonType; paid: number }) => {
    commitData((current) => ({
      ...current,
      families: current.families.map((family) =>
        family.id === familyId
          ? {
              ...family,
              members: [...family.members, member],
            }
          : family,
      ),
    }));
  }, [commitData]);

  const resetData = useCallback(() => {
    if (adminRole !== "superadmin") {
      setSyncStatus("error");
      setSyncError("Superadmin access is required to reset database data.");
      return;
    }

    setSyncStatus("saving");
    setSyncError(null);

    fetch("/api/admin/reset", { method: "POST" })
      .then(async (response) => {
        const payload = (await response.json().catch(() => null)) as TripData | { error?: string } | null;
        if (!response.ok) {
          throw new Error(
            payload && "error" in payload && payload.error ? payload.error : "Database reset failed.",
          );
        }
        setData(payload as TripData);
        setSyncStatus("saved");
      })
      .catch((error: unknown) => {
        setSyncStatus("error");
        setSyncError(error instanceof Error ? error.message : "Database reset failed.");
      });
  }, [adminRole]);

  const login = useCallback(async (username: string, password: string) => {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      setAdminRole(null);
      return false;
    }

    const payload = (await response.json()) as { role: AdminRole };
    setAdminRole(payload.role);
    return true;
  }, []);

  const logout = useCallback(() => {
    fetch("/api/admin/logout", { method: "POST" }).finally(() => setAdminRole(null));
  }, []);

  const value = useMemo<TripDataContextValue>(
    () => ({
      ...data,
      addPayment,
      addFamilyPayment,
      addSpend,
      updateCategoryBudget,
      updateMemberPaid,
      updateMemberDetails,
      updateFamilyPaid,
      addFamily,
      addMember,
      addCategory,
      resetData,
      syncStatus,
      syncError,
      isAdmin: Boolean(adminRole),
      adminRole,
      login,
      logout,
    }),
    [
      addPayment,
      addFamilyPayment,
      addSpend,
      adminRole,
      data,
      login,
      logout,
      resetData,
      syncError,
      syncStatus,
      updateCategoryBudget,
      updateMemberPaid,
      updateMemberDetails,
      updateFamilyPaid,
      addFamily,
      addMember,
      addCategory,
    ],
  );

  return <TripDataContext.Provider value={value}>{children}</TripDataContext.Provider>;
}

export function useTripData() {
  const context = useContext(TripDataContext);
  if (!context) {
    throw new Error("useTripData must be used inside TripDataProvider");
  }
  return context;
}
