"use client"
import { useState, useEffect } from 'react'
import { resetPassword } from '@/lib/auth'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function ResetPasswordPage() {
  const sp = useSearchParams()
  const router = useRouter()
  const token = sp.get('token') || ''
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      toast.error('Token manquant')
      router.push('/login')
    }
  }, [token, router])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    if (password.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères')
      return
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password)) {
      toast.error('Le mot de passe doit contenir majuscule, minuscule et chiffre')
      return
    }

    setLoading(true)
    try {
      const res = await resetPassword(token, password)
      toast.success(res?.message || 'Mot de passe réinitialisé avec succès')
      setSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Lien invalide ou expiré')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="full_bg">
        <div className="container">
          <section className="signup_section">
            <div className="signup_form">
              <div className="section_title">
                <h2><span>Succès</span> !</h2>
                <p>Votre mot de passe a été réinitialisé avec succès.</p>
                <p>Vous allez être redirigé vers la page de connexion...</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="full_bg">
      <div className="container">
        <section className="signup_section">
          <div className="top_part">
            <a href="/login" className="back_btn">
              <i className="icofont-arrow-left" /> Retour à la connexion
            </a>
            <a className="navbar-brand" href="#">
              <img src="/images/footer_logo.png" alt="image" />
            </a>
          </div>
          <div className="signup_form">
            <div className="section_title">
              <h2><span>Nouveau</span> mot de passe</h2>
              <p>
                Choisissez un nouveau mot de passe sécurisé pour votre compte.
              </p>
            </div>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  type="password" 
                  className="form-control" 
                  placeholder="Nouveau mot de passe" 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)} 
                  type="password" 
                  className="form-control" 
                  placeholder="Confirmer le mot de passe" 
                  required 
                />
              </div>
              <div className="form-group">
                <small style={{ color: '#666', fontSize: '14px' }}>
                  Le mot de passe doit contenir au moins 8 caractères avec une majuscule, une minuscule et un chiffre.
                </small>
              </div>
              <div className="form-group">
                <button className="btn puprple_btn" type="submit" disabled={loading}>
                  {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
