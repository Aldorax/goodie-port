import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const adminCookieName = "goodness_admin";
const sessionDuration = 8 * 60 * 60 * 1000;

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function checkAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  return (
    Boolean(expected) && timingSafeEqual(digest(password), digest(expected!))
  );
}

export function createAdminSession() {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD is not configured.");
  const expiresAt = Date.now() + sessionDuration;
  const value = String(expiresAt);
  return {
    value: `${value}.${sign(value, secret)}`,
    maxAge: sessionDuration / 1000,
  };
}

export function isAdminSessionValid(value?: string) {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret || !value) return false;
  const [expiresAt, signature, extra] = value.split(".");
  if (!expiresAt || !signature || extra || !/^\d+$/.test(expiresAt))
    return false;
  const expiry = Number(expiresAt);
  if (expiry <= Date.now() || expiry > Date.now() + sessionDuration)
    return false;
  const expected = sign(expiresAt, secret);
  const actualBytes = Buffer.from(signature);
  const expectedBytes = Buffer.from(expected);
  return (
    actualBytes.length === expectedBytes.length &&
    timingSafeEqual(actualBytes, expectedBytes)
  );
}
