"use client"
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { setAuthToken } from '@/lib/api'
import { toast } from 'react-hot-toast'

export default function SocialCallbackPage() {
  const sp = useSearchParams()
  const router = useRouter()
  const token = sp.get('token')

  useEffect(() => {
    if (!token) return
    // set cookie token like in login
    const maxAgeDays = 7
    const expires = new Date(Date.now() + maxAgeDays * 24 * 60 * 60 * 1000).toUTCString()
    document.cookie = `token=${encodeURIComponent(token)}; Path=/; Expires=${expires}; SameSite=Lax`
    setAuthToken(token)
    toast.success('Connexion Google réussie')
    router.replace('/')
  }, [token])

  return (
    <div className="full_bg">
      <div className="container">
        <section className="signup_section">
          <div className="signup_form">
            <div className="section_title">
              <h2><span>Google</span> connexion</h2>
              <p>Finalisation de la connexion...</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

