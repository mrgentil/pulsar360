"use client"
import { useState } from 'react'
import { forgotPassword } from '@/lib/auth'
import { toast } from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await forgotPassword(email)
      toast.success(res?.message || "Si un compte existe, un e-mail de récupération a été envoyé.")
      setSent(true)
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Erreur lors de l'envoi")
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
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
                <h2><span>Email</span> envoyé</h2>
                <p>
                  Si un compte existe avec cette adresse email, vous recevrez un lien de récupération dans quelques minutes.
                </p>
                <p>
                  Vérifiez votre boîte mail et vos spams.
                </p>
              </div>
              <div className="form-group">
                <a href="/login" className="btn puprple_btn">
                  Retour à la connexion
                </a>
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
              <h2><span>Mot de passe</span> oublié</h2>
              <p>
                Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>
            </div>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  type="email" 
                  className="form-control" 
                  placeholder="Votre adresse email" 
                  required 
                />
              </div>
              <div className="form-group">
                <button className="btn puprple_btn" type="submit" disabled={loading}>
                  {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
                </button>
              </div>
            </form>
            <div className="or_option">
              <p>
                Vous vous souvenez de votre mot de passe ? <a href="/login">Se connecter</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
