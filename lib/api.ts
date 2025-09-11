import axios from 'axios'
// Attention: toast n'existe que côté client
let toast: any = null
if (typeof window !== 'undefined') {
  // import dynamique pour éviter l'inclusion côté serveur
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  toast = require('react-hot-toast').toast
}

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export function getAuthTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|; )token=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

// Auto-init du header Authorization depuis le cookie côté client
if (typeof window !== 'undefined') {
  const t = getAuthTokenFromCookie()
  if (t) setAuthToken(t)
}

// Intercepteur global des erreurs pour afficher un toast
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined' && toast) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Une erreur est survenue'
      toast.error(message)
    }
    return Promise.reject(error)
  },
)
