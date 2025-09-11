
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
                          <a href={`${apiBaseURL}/auth/google`} className="btn google_btn">
                              <img src="images/google.png" alt="image" />{" "}
                              <span>Sign In with Google</span>{" "}
                          </a>
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
