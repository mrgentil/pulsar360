"use client"
import { useState, useEffect } from 'react'
import { getMe, logout } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function TopBarSimple() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [showDropdown, setShowDropdown] = useState(false)
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
        async function fetchUser() {
            try {
                console.log('🔍 TopBar: Récupération utilisateur...')
                const response = await getMe()
                console.log('✅ TopBar: Utilisateur récupéré:', response.user)
                setUser(response.user)
            } catch (error) {
                console.error('❌ TopBar: Erreur lors de la récupération de l\'utilisateur:', error)
                router.push('/login')
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [router])

    // Éviter les erreurs d'hydratation
    if (!mounted) {
        return (
            <header id="page-topbar">
                <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex">
                            <div className="navbar-brand-box horizontal-logo">
                                <a href="/dashboard" className="logo logo-dark">
                                    <span className="logo-sm">
                                        <img src="/icon.png" alt="" height={22} />
                                    </span>
                                    <span className="logo-lg">
                                        <img src="/icon.png" alt="" height={17} />
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="dropdown ms-sm-3 header-item topbar-user">
                                <div className="d-flex align-items-center">
                                    <div 
                                        className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white" 
                                        style={{ width: '32px', height: '32px', fontSize: '14px' }}
                                    >
                                        U
                                    </div>
                                    <span className="text-start ms-xl-2">
                                        <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                                            Chargement...
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    return (
        <header id="page-topbar">
            <div className="layout-width">
                <div className="navbar-header">
                    <div className="d-flex">
                        {/* LOGO */}
                        <div className="navbar-brand-box horizontal-logo">
                            <a href="/dashboard" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img src="/icon.png" alt="" height={22} />
                                </span>
                                <span className="logo-lg">
                                    <img src="/icon.png" alt="" height={17} />
                                </span>
                            </a>
                        </div>
                        
                        {/* Menu hamburger */}
                        <button
                            type="button"
                            className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger shadow-none"
                            id="topnav-hamburger-icon"
                        >
                            <span className="hamburger-icon">
                                <span />
                                <span />
                                <span />
                            </span>
                        </button>
                        
                        {/* Barre de recherche */}
                        <form className="app-search d-none d-md-block">
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Rechercher..."
                                    autoComplete="off"
                                />
                                <span className="mdi mdi-magnify search-widget-icon" />
                            </div>
                        </form>
                    </div>

                    <div className="d-flex align-items-center">
                        {/* Menu utilisateur */}
                        <div className="dropdown ms-sm-3 header-item topbar-user">
                            <button
                                type="button"
                                className="btn shadow-none"
                                onClick={() => setShowDropdown(!showDropdown)}
                                style={{ border: 'none', background: 'transparent' }}
                            >
                                <span className="d-flex align-items-center">
                                    {user?.avatarUrl ? (
                                        <img
                                            className="rounded-circle header-profile-user"
                                            src={user.avatarUrl}
                                            alt="Header Avatar"
                                            style={{ width: '32px', height: '32px' }}
                                        />
                                    ) : (
                                        <div 
                                            className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white" 
                                            style={{ width: '32px', height: '32px', fontSize: '14px' }}
                                        >
                                            {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                    )}
                                    <span className="text-start ms-xl-2">
                                        <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                                            {loading ? 'Chargement...' : (user?.name || user?.email || 'Utilisateur')}
                                        </span>
                                        <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text text-muted">
                                            {user?.role || 'Membre'}
                                        </span>
                                    </span>
                                    <i className="mdi mdi-chevron-down ms-1" />
                                </span>
                            </button>
                            
                            {/* Menu déroulant */}
                            {showDropdown && (
                                <div 
                                    className="dropdown-menu dropdown-menu-end show"
                                    style={{ 
                                        position: 'absolute',
                                        top: '100%',
                                        right: 0,
                                        zIndex: 1000,
                                        minWidth: '200px'
                                    }}
                                >
                                    {/* En-tête */}
                                    <h6 className="dropdown-header">
                                        Bienvenue {user?.name || user?.email || 'Utilisateur'} !
                                    </h6>
                                    <div className="dropdown-item-text">
                                        <small className="text-muted">
                                            {user?.email} • {user?.role}
                                        </small>
                                    </div>
                                    <div className="dropdown-divider" />
                                    
                                    {/* Liens du menu */}
                                    <a className="dropdown-item" href="/dashboard/settings">
                                        <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />
                                        <span className="align-middle">Mon Profil</span>
                                    </a>
                                    <a className="dropdown-item" href="/dashboard/settings">
                                        <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1" />
                                        <span className="align-middle">Paramètres</span>
                                    </a>
                                    <a className="dropdown-item" href="/dashboard/team">
                                        <i className="mdi mdi-account-group-outline text-muted fs-16 align-middle me-1" />
                                        <span className="align-middle">Équipe</span>
                                    </a>
                                    <a className="dropdown-item" href="/dashboard/help">
                                        <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1" />
                                        <span className="align-middle">Aide</span>
                                    </a>
                                    
                                    <div className="dropdown-divider" />
                                    
                                    {/* Bouton de déconnexion */}
                                    <button 
                                        className="dropdown-item text-danger" 
                                        onClick={handleLogout}
                                        style={{ 
                                            border: 'none', 
                                            background: 'none', 
                                            width: '100%', 
                                            textAlign: 'left',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <i className="mdi mdi-logout text-danger fs-16 align-middle me-1" />
                                        <span className="align-middle">Déconnexion</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay pour fermer le dropdown */}
            {showDropdown && (
                <div 
                    className="position-fixed w-100 h-100"
                    style={{ 
                        top: 0, 
                        left: 0, 
                        zIndex: 999 
                    }}
                    onClick={() => setShowDropdown(false)}
                />
            )}
        </header>
    )
}
