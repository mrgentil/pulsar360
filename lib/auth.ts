"use client"

import { api, setAuthToken } from './api'

export type RegisterPayload = { email: string; password: string; name: string }
export type LoginPayload = { email: string; password: string }

function setTokenCookie(token: string) {
  // Cookie non HttpOnly (dev) pour que Next/JS client puisse le lire
  const maxAgeDays = 7
  const expires = new Date(Date.now() + maxAgeDays * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `token=${encodeURIComponent(token)}; Path=/; Expires=${expires}; SameSite=Lax`
}

export async function register(payload: RegisterPayload) {
  const { data } = await api.post('/auth/register', payload)
  return data as { ok: boolean; message: string }
}

export async function login(payload: LoginPayload) {
  const { data } = await api.post('/auth/login', payload)
  // data: { user, token }
  if (data?.token) {
    setTokenCookie(data.token)
    setAuthToken(data.token)
  }
  return data as { user: any; token: string }
}

export async function resend(email: string) {
  const { data } = await api.post('/auth/resend', { email })
  return data as { ok: boolean; message: string }
}

export async function verifyEmail(token: string) {
  const { data } = await api.get('/auth/verify-email', { params: { token } })
  return data as { ok: boolean; message: string }
}

export function logout() {
  // expire le cookie token
  document.cookie = `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
  setAuthToken(null)
}

export async function getMe() {
  const { data } = await api.get('/auth/me')
  return data as { user: { id: string; email: string; name: string | null; role: string; isEmailVerified: boolean; avatarUrl: string | null } }
}
