import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { type AdminRole } from "@/data/admin-types";

const SESSION_COOKIE = "mishkath_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

type AdminUser = {
  username: string;
  password: string;
  role: AdminRole;
};

function getAdminUsers(): AdminUser[] {
  return [
    {
      username: process.env.ADMIN_USERNAME ?? "admin",
      password: process.env.ADMIN_PASSWORD ?? "mishkath2026",
      role: "admin",
    },
    {
      username: process.env.SUPERADMIN_USERNAME ?? "superadmin",
      password: process.env.SUPERADMIN_PASSWORD ?? "mishkathsuper2026",
      role: "superadmin",
    },
  ];
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.SUPABASE_SECRET_KEY ?? "mishkath-local-session";
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function parseCookies(cookieHeader: string | null) {
  return Object.fromEntries(
    (cookieHeader ?? "")
      .split(";")
      .map((cookie) => cookie.trim())
      .filter(Boolean)
      .map((cookie) => {
        const index = cookie.indexOf("=");
        return [cookie.slice(0, index), decodeURIComponent(cookie.slice(index + 1))];
      }),
  );
}

export function verifyAdminCredentials(username: string, password: string): AdminRole | null {
  const user = getAdminUsers().find((item) => item.username === username.trim());
  if (!user || user.password !== password) return null;
  return user.role;
}

export function createSessionCookie(role: AdminRole) {
  const payload = `${role}.${Date.now()}`;
  const token = `${payload}.${sign(payload)}`;

  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${SESSION_MAX_AGE}; HttpOnly; SameSite=Lax`;
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`;
}

export function getAdminRoleFromRequest(request: Request): AdminRole | null {
  const cookies = parseCookies(request.headers.get("cookie"));
  const token = cookies[SESSION_COOKIE];
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [role, createdAt, signature] = parts;
  if (role !== "admin" && role !== "superadmin") return null;

  const payload = `${role}.${createdAt}`;
  if (!safeEqual(sign(payload), signature)) return null;

  const age = Date.now() - Number(createdAt);
  if (!Number.isFinite(age) || age > SESSION_MAX_AGE * 1000) return null;

  return role;
}
