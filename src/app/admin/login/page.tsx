"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useTripData } from "@/data/trip-store";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useTripData();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const valid = await login(username, password);
    setIsSubmitting(false);

    if (valid) {
      router.push("/admin");
      return;
    }

    setError("Invalid username or password.");
  }

  return (
    <main className="textured-page flex min-h-screen items-center px-5 py-8 text-[#0f172a]">
      <section className="glass-panel relative z-10 w-full rounded-[30px] p-5">
        <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#0f766e]">
          Admin Access
        </p>
        <h1 className="mt-2 text-[34px] font-black text-[#123331]">Login</h1>
        <p className="mt-2 text-sm font-semibold text-[#64748b]">
          Admin and superadmin access for all trip data.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#64748b]">Username</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-[18px] border border-white/60 bg-white/45 px-4 py-3 text-sm font-bold outline-none backdrop-blur-xl"
              placeholder="admin or superadmin"
            />
          </label>

          <label className="block">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#64748b]">Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              className="mt-2 w-full rounded-[18px] border border-white/60 bg-white/45 px-4 py-3 text-sm font-bold outline-none backdrop-blur-xl"
              placeholder="Enter password"
            />
          </label>

          {error && <p className="text-sm font-bold text-[#ef4444]">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-[18px] bg-[#0f766e] px-4 py-3 text-sm font-black text-white shadow-[0_14px_28px_rgba(15,118,110,0.24)]"
          >
            {isSubmitting ? "Checking..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}
