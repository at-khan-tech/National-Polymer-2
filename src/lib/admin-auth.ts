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
  const configuredUsername = process.env.ADMIN_USERNAME;
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredUsername || !configuredPassword) {
    return false;
  }

  return (
    typeof username === "string" &&
    typeof password === "string" &&
    timingSafeEqual(
      createHash("sha256").update(username).digest(),
      createHash("sha256").update(configuredUsername).digest(),
    ) &&
    timingSafeEqual(
      createHash("sha256").update(password).digest(),
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
