"use client"
import { useEffect, useState } from 'react'
import LogoutButton from '@/components/logout-button'
import { api } from '@/lib/api'

export default function ProtectedAppPage() {
  const [health, setHealth] = useState<string>('Chargement...')

  useEffect(() => {
    async function run() {
      try {
        const { data } = await api.get('/health')
        setHealth(`API OK — users: ${data?.users ?? 'n/a'}`)
      } catch (e) {
        setHealth('Erreur de connexion à l’API')
      }
    }
    run()
  }, [])

  return (
    <div className="full_bg">
      <div className="container">
        <section className="signup_section">
          <div className="signup_form">
            <div className="section_title">
              <h2><span>Espace</span> protégé</h2>
              <p>{health}</p>
            </div>
            <div className="form-group" style={{ display: 'flex', gap: 12 }}>
              <a className="btn puprple_btn" href="/">Accueil</a>
              <LogoutButton />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

