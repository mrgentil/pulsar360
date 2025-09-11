"use client"
import { useEffect, useState, useRef } from 'react'
import { getMe, logout } from '@/lib/auth'
import { useRouter } from 'next/navigation'

function initialsOf(name?: string | null) {
  if (!name) return 'U'
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] || ''
  const last = parts[1]?.[0] || ''
  return (first + last || first || 'U').toUpperCase()
}

export default function UserMenu() {
  const [user, setUser] = useState<{ name: string | null; email: string } | null>(null)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    getMe().then((res) => {
      if (!mounted) return
      setUser(res?.user || null)
    }).catch(() => setUser(null))
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', handle)
    return () => document.removeEventListener('click', handle)
  }, [])

  if (!user) {
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <a className="btn puprple_btn" href="/login">Connexion</a>
        <a className="btn puprple_btn" href="/register">Inscription</a>
      </div>
    )
  }

  const letters = initialsOf(user.name)

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: '#6c63ff',
          color: '#fff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          letterSpacing: 0.5,
        }}
        title={user.email}
      >
        {letters}
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            right: 0,
            marginTop: 8,
            minWidth: 200,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
            padding: 8,
            zIndex: 50,
          }}
        >
          <div style={{ padding: '8px 12px', fontWeight: 600 }}>{user.name || user.email}</div>
          <hr style={{ borderColor: '#eee', margin: '6px 0' }} />
          <a className="btn" href="/app" style={{ display: 'block', padding: '8px 12px' }}>Dashboard</a>
          <a className="btn" href="#" style={{ display: 'block', padding: '8px 12px' }} onClick={(e)=>{e.preventDefault(); router.push('/profile')}}>Profil</a>
          <button className="btn" style={{ display: 'block', padding: '8px 12px', width: '100%', textAlign: 'left' }} onClick={() => { logout(); router.push('/login') }}>Déconnexion</button>
        </div>
      )}
    </div>
  )
}

