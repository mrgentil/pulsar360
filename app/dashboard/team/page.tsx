"use client"
import { useState, useEffect } from 'react'
import { getMe } from '@/lib/auth'
import { api } from '@/lib/api'
import { toast } from 'react-hot-toast'

interface User {
  id: string
  email: string
  name: string | null
  role: string
  isEmailVerified: boolean
  avatarUrl: string | null
  createdAt: string
}

export default function TeamPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Récupérer l'utilisateur actuel
        const userResponse = await getMe()
        setCurrentUser(userResponse.user)

        // Récupérer tous les utilisateurs si admin/owner
        if (['OWNER', 'ADMIN'].includes(userResponse.user.role)) {
          const usersResponse = await api.get('/auth/users')
          setUsers(usersResponse.data)
        }
      } catch (error) {
        console.error('Erreur:', error)
        toast.error('Erreur lors du chargement des données')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      await api.put(`/auth/users/${userId}/role`, { role: newRole })
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ))
      toast.success('Rôle mis à jour avec succès')
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Erreur lors de la mise à jour')
    }
  }

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'OWNER': return 'bg-danger'
      case 'ADMIN': return 'bg-warning'
      case 'EDITOR': return 'bg-primary'
      case 'VIEWER': return 'bg-secondary'
      default: return 'bg-secondary'
    }
  }

  if (loading) {
    return (
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!['OWNER', 'ADMIN'].includes(currentUser?.role)) {
    return (
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="alert alert-warning">
              <h4>Accès refusé</h4>
              <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Gestion de l'équipe</h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Membres de l'équipe</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-nowrap align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Utilisateur</th>
                          <th>Email</th>
                          <th>Rôle</th>
                          <th>Statut</th>
                          <th>Inscription</th>
                          {currentUser?.role === 'OWNER' && <th>Actions</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                {user.avatarUrl ? (
                                  <img
                                    src={user.avatarUrl}
                                    alt=""
                                    className="avatar-xs rounded-circle me-2"
                                  />
                                ) : (
                                  <div className="avatar-xs rounded-circle bg-primary d-flex align-items-center justify-content-center text-white me-2">
                                    {user.name?.charAt(0)?.toUpperCase() || user.email.charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <div>
                                  <h6 className="mb-0">{user.name || 'Sans nom'}</h6>
                                  {user.id === currentUser?.id && (
                                    <small className="text-muted">(Vous)</small>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>{user.email}</td>
                            <td>
                              <span className={`badge ${getRoleBadgeClass(user.role)}`}>
                                {user.role}
                              </span>
                            </td>
                            <td>
                              {user.isEmailVerified ? (
                                <span className="badge bg-success">Vérifié</span>
                              ) : (
                                <span className="badge bg-warning">En attente</span>
                              )}
                            </td>
                            <td>
                              {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                            </td>
                            {currentUser?.role === 'OWNER' && (
                              <td>
                                {user.id !== currentUser?.id && (
                                  <select
                                    className="form-select form-select-sm"
                                    value={user.role}
                                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                                  >
                                    <option value="VIEWER">VIEWER</option>
                                    <option value="EDITOR">EDITOR</option>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="OWNER">OWNER</option>
                                  </select>
                                )}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Hiérarchie des rôles</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="text-center">
                        <span className="badge bg-danger fs-6">OWNER</span>
                        <p className="mt-2 text-muted">Accès complet, peut gérer tous les rôles</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="text-center">
                        <span className="badge bg-warning fs-6">ADMIN</span>
                        <p className="mt-2 text-muted">Gestion avancée, peut voir les utilisateurs</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="text-center">
                        <span className="badge bg-primary fs-6">EDITOR</span>
                        <p className="mt-2 text-muted">Peut créer et modifier du contenu</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="text-center">
                        <span className="badge bg-secondary fs-6">VIEWER</span>
                        <p className="mt-2 text-muted">Accès en lecture seule</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
