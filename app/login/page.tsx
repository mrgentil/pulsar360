
"use client"
import { useState } from 'react'
import { login as apiLogin } from '@/lib/auth'
import { apiBaseURL } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await apiLogin({ email, password })
      if (res?.token) {
        toast.success('Connexion réussie')
        router.push('/')
      } else {
        toast.error('Connexion échouée')
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Identifiants invalides')
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="full_bg">
          <div className="container">
              <section className="signup_section">
                  <div className="top_part">
                      <a href="/" className="back_btn">
                          <i className="icofont-arrow-left" /> Back
                      </a>
                      <a className="navbar-brand" href="#">
                          <img src="/images/footer_logo.png" alt="image" />
                      </a>
                  </div>
                  {/* Comment Form Section */}
                  <div className="signup_form">
                      <div className="section_title">
                          <h2>
                              {" "}
                              Welcom to <span>Apper</span>{" "}
                          </h2>
                          <p>
                              Fill all fields so we can get some info about you. <br /> We'll
                              never send you spam
                          </p>
                      </div>
                      <form onSubmit={onSubmit}>
                          <div className="form-group">
                              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="form-control" placeholder="Email" required />
                          </div>
                          <div className="form-group">
                              <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="form-control" placeholder="Password" required />
                          </div>
                          <div className="form-group" style={{ textAlign: 'right', marginBottom: '10px' }}>
                              <a href="/forgot-password" style={{ color: '#7C3AED', fontSize: '14px' }}>Mot de passe oublié ?</a>
                          </div>
                          <div className="form-group">
                              <button className="btn puprple_btn" type="submit" disabled={loading}>
                                  {loading ? 'En cours...' : 'CONNEXION'}
                              </button>
                          </div>
                      </form>
                      <p className="or_block">
                          <span>OR</span>
                      </p>
                      <div className="or_option">
                          <p>Sign In with your work email</p>
                          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                              <a href={`${apiBaseURL}/auth/google`} className="btn google_btn" style={{ flex: '1', minWidth: '200px' }}>
                                  <img src="images/google.png" alt="image" />{" "}
                                  <span>Sign In with Google</span>{" "}
                              </a>
                              <a href={`${apiBaseURL}/auth/facebook`} className="btn google_btn" style={{ flex: '1', minWidth: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                  </svg>
                                  <span>Sign In with Facebook</span>
                              </a>
                          </div>
                          <p>
                              Don't have an account? <a href="/register">Sign Up here</a>
                          </p>
                      </div>
                  </div>
              </section>
          </div>
      </div>

  )
}
