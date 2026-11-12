import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "np_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }
  return secret;
}

function signSession(expiresAt: string) {
  return createHmac("sha256", getSessionSecret()).update(expiresAt).digest("hex");
}

export function verifyAdminCredentials(username: unknown, password: unknown) {
  const configuredUsername = process.env.ADMIN_USERNAME?.trim().replace(/^["']|["']$/g, "");
  const configuredPassword = process.env.ADMIN_PASSWORD?.trim().replace(/^["']|["']$/g, "");

  if (!configuredUsername || !configuredPassword) {
    return false;
  }

  const cleanUsername = typeof username === "string" ? username.trim() : "";
  const cleanPassword = typeof password === "string" ? password.trim() : "";

  if (!cleanUsername || !cleanPassword) {
    return false;
  }

  return (
    timingSafeEqual(
      createHash("sha256").update(cleanUsername).digest(),
      createHash("sha256").update(configuredUsername).digest(),
    ) &&
    timingSafeEqual(
      createHash("sha256").update(cleanPassword).digest(),
      createHash("sha256").update(configuredPassword).digest(),
    )
  );
}

export function createAdminSession() {
  const expiresAt = String(Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE);
  return `${expiresAt}.${signSession(expiresAt)}`;
}

export function isValidAdminSession(token: string | undefined) {
  if (!token) {
    return false;
  }

  const [expiresAt, signature, ...rest] = token.split(".");
  if (
    rest.length > 0 ||
    !/^\d+$/.test(expiresAt) ||
    !/^[a-f0-9]{64}$/i.test(signature) ||
    Number(expiresAt) <= Math.floor(Date.now() / 1000)
  ) {
    return false;
  }

  const expectedSignature = Buffer.from(signSession(expiresAt), "hex");
  const receivedSignature = Buffer.from(signature, "hex");
  return timingSafeEqual(expectedSignature, receivedSignature);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}
