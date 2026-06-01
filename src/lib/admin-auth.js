import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'gss_admin_session';

function getSessionToken() {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return null;
  return createHmac('sha256', secret).update('gss-admin-session').digest('hex');
}

export function verifyAdminPassword(password) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !password) return false;

  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  };
}

export async function setAdminSession() {
  const token = getSessionToken();
  if (!token) throw new Error('ADMIN_PASSWORD não configurada');
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, getAdminSessionCookieOptions());
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const token = getSessionToken();
  if (!token) return false;
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session) return false;

  const a = Buffer.from(session);
  const b = Buffer.from(token);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
