"use client"
import { useState } from 'react'
import { register as apiRegister } from '@/lib/auth'
import { apiBaseURL } from '@/lib/api'
import { toast } from 'react-hot-toast'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await apiRegister({ name, email, password })
      toast.success(res?.message || "Vérifie ta boîte mail pour activer ton compte.")
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Erreur lors de l'inscription")
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
                              <span>Create</span> an account
                          </h2>
                          <p>
                              Fill all fields so we can get some info about you. <br /> We'll
                              never send you spam
                          </p>
                      </div>
                      <form onSubmit={onSubmit}>
                          <div className="form-group">
                              <input value={name} onChange={e=>setName(e.target.value)} type="text" className="form-control" placeholder="Name" required />
                          </div>
                          <div className="form-group">
                              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="form-control" placeholder="Email" required />
                          </div>
                          <div className="form-group">
                              <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="form-control" placeholder="Password" required />
                          </div>
                          <div className="form-group">
                              <button className="btn puprple_btn" type="submit" disabled={loading}>
                                  {loading ? 'En cours...' : 'ISNCRIPTION'}
                              </button>
                          </div>
                      </form>
                      <p className="or_block">
                          <span>OR</span>
                      </p>
                      <div className="or_option">
                          <p>Sign up with your work email</p>
                          <a href={`${apiBaseURL}/auth/google`} className="btn google_btn">
                              <img src="/images/google.png" alt="image" />{" "}
                              <span>Sign Up with Google</span>{" "}
                          </a>
                          <p>
                              Already have an account? <a href="/login">Sign In here</a>
                          </p>
                      </div>
                  </div>
              </section>
          </div>
      </div>

  )
}
