import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const { pathname } = req.nextUrl

  // Redirige vers l'accueil si déjà connecté et on visite /login ou /register
  if (pathname === '/login' || pathname === '/register') {
    if (token) {
      const url = new URL('/', req.url)
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // Protège les sections privées (voir matcher ci-dessous)
  if (!token) {
    const url = new URL('/login', req.url)
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Adapte les zones protégées ici
export const config = {
  matcher: [
    '/app/:path*',
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
}

