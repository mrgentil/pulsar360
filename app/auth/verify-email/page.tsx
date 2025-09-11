"use client"
import { useEffect, useState } from 'react'
import { verifyEmail } from '@/lib/auth'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function VerifyEmailPage() {
  const sp = useSearchParams()
  const router = useRouter()
  const token = sp.get('token') || ''
  const [message, setMessage] = useState('Vérification en cours...')

  useEffect(() => {
    async function run() {
      if (!token) {
        setMessage('Token manquant')
        return
      }
      try {
        const res = await verifyEmail(token)
        const msg = res?.message || 'E-mail vérifié. Tu peux te connecter.'
        setMessage(msg)
        toast.success(msg)
      } catch (e: any) {
        const msg = e?.response?.data?.message || 'Lien invalide ou expiré'
        setMessage(msg)
        toast.error(msg)
      }
    }
    run()
  }, [token])

  return (
    <div className="full_bg">
      <div className="container">
        <section className="signup_section">
          <div className="signup_form">
            <div className="section_title">
              <h2><span>Vérification</span> d’e-mail</h2>
              <p>{message}</p>
            </div>
            <div className="form-group">
              <button className="btn puprple_btn" onClick={() => router.push('/login')}>Aller à la connexion</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
