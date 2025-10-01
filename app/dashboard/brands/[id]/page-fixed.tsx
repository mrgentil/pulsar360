'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Brand, Member, Channel, Role, ChannelType } from '@/types/brand';
import { brandsAPI } from '@/lib/api/brands';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  Settings,
  Users,
  MessageSquare,
  Image as ImageIcon,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Crown,
  Shield,
  PenTool,
  Eye,
  Loader2,
  ArrowLeft,
  Globe,
  Clock,
  Palette
} from 'lucide-react';
import Link from 'next/link';
import BrandForm from '@/components/brands/BrandForm';
import MemberManagement from '@/components/brands/MemberManagement';
import ChannelManagement from '@/components/brands/ChannelManagement';

// Import des styles
import '../../../../styles/brand-detail.css';

const getRoleIcon = (role: Role) => {
  switch (role) {
    case Role.OWNER:
      return <Crown className="h-4 w-4 text-purple-600" />;
    case Role.ADMIN:
      return <Shield className="h-4 w-4 text-blue-600" />;
    case Role.EDITOR:
      return <PenTool className="h-4 w-4 text-green-600" />;
    case Role.VIEWER:
      return <Eye className="h-4 w-4 text-gray-600" />;
  }
};

const getRoleLabel = (role: Role) => {
  switch (role) {
    case Role.OWNER:
      return 'Propriétaire';
    case Role.ADMIN:
      return 'Administrateur';
    case Role.EDITOR:
      return 'Éditeur';
    case Role.VIEWER:
      return 'Lecteur';
  }
};

export default function BrandDetailPage() {
  const params = useParams();
  const brandId = params.id as string;
  
  const [brand, setBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (brandId) {
      loadBrand();
    }
  }, [brandId]);

  const loadBrand = async () => {
    try {
      setIsLoading(true);
      const data = await brandsAPI.getBrand(brandId);
      setBrand(data);
    } catch (error: any) {
      toast.error('Erreur lors du chargement de la marque');
      console.error('Error loading brand:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBrand = async (data: any) => {
    try {
      setIsSubmitting(true);
      const updatedBrand = await brandsAPI.updateBrand(brandId, data);
      setBrand(updatedBrand);
      setIsEditModalOpen(false);
      toast.success('Marque mise à jour avec succès !');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la mise à jour');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Chargement de la marque...</p>
        </div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Marque introuvable</h3>
        <p className="text-gray-600 mb-6">Cette marque n'existe pas ou vous n'y avez pas accès.</p>
        <Button asChild>
          <Link href="/dashboard/brands">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux marques
          </Link>
        </Button>
      </div>
    );
  }

  const userRole = brand.members.find(m => m.user.id)?.role || Role.VIEWER;
  const canEdit = [Role.OWNER, Role.ADMIN].includes(userRole);

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* Header avec image de couverture */}
          <div className="profile-foreground position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg" style={{
              background: brand.coverUrl 
                ? `url(${brand.coverUrl}) center/cover` 
                : `linear-gradient(135deg, ${brand.primaryColor || '#6366f1'}, ${brand.secondaryColor || '#8b5cf6'})`,
              height: '200px'
            }}>
              <div className="overlay-content">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col">
                      <div className="p-3">
                        <div className="d-flex align-items-end">
                          <div className="flex-grow-1">
                            <div>
                              <div className="d-flex align-items-center mb-2">
                                <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20 me-3">
                                  <Link href="/dashboard/brands">
                                    <ArrowLeft className="h-4 w-4 me-2" />
                                    Retour
                                  </Link>
                                </Button>
                              </div>
                              <h5 className="fs-16 text-white mb-1">{brand.name}</h5>
                              <p className="text-white-75 mb-0">@{brand.slug}</p>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="d-flex gap-2">
                              {canEdit && (
                                <Button onClick={() => setIsEditModalOpen(true)} size="sm" className="btn-light">
                                  <Edit className="h-4 w-4 me-1" />
                                  Modifier
                                </Button>
                              )}
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

          {/* Profile Info */}
          <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
            <div className="row g-4">
              <div className="col-auto">
                <div className="avatar-lg">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-lg" style={{ marginTop: '-40px' }}>
                    <AvatarImage src={brand.logoUrl} alt={brand.name} />
                    <AvatarFallback 
                      className="text-xl font-bold text-white"
                      style={{ 
                        background: brand.primaryColor 
                          ? `linear-gradient(135deg, ${brand.primaryColor}, ${brand.secondaryColor || brand.primaryColor})` 
                          : 'linear-gradient(135deg, #6366f1, #8b5cf6)' 
                      }}
                    >
                      {brand.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="col">
                <div className="p-2">
                  <h3 className="text-white mb-1">{brand.name}</h3>
                  <div className="hstack gap-1 mb-2">
                    {getRoleIcon(userRole)}
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {getRoleLabel(userRole)}
                    </Badge>
                  </div>
                  {brand.description && (
                    <p className="text-white-75 mb-0">{brand.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Membres</p>
                    </div>
                    <div className="flex-shrink-0">
                      <h5 className="text-success fs-14 mb-0">
                        <Users className="h-4 w-4" />
                      </h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-2">
                    <div>
                      <h2 className="ff-secondary fw-semibold">{brand._count.members}</h2>
                      <Badge variant="secondary" className="badge-soft-success">
                        Actifs
                      </Badge>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-success-subtle rounded fs-3">
                        <Users className="text-success" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Canaux</p>
                    </div>
                    <div className="flex-shrink-0">
                      <h5 className="text-info fs-14 mb-0">
                        <MessageSquare className="h-4 w-4" />
                      </h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-2">
                    <div>
                      <h2 className="ff-secondary fw-semibold">{brand._count.channels}</h2>
                      <Badge variant="secondary" className="badge-soft-info">
                        Connectés
                      </Badge>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-info-subtle rounded fs-3">
                        <MessageSquare className="text-info" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Contenus</p>
                    </div>
                    <div className="flex-shrink-0">
                      <h5 className="text-primary fs-14 mb-0">
                        <BarChart3 className="h-4 w-4" />
                      </h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-2">
                    <div>
                      <h2 className="ff-secondary fw-semibold">{brand._count.contents}</h2>
                      <Badge variant="secondary" className="badge-soft-primary">
                        Publiés
                      </Badge>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-primary-subtle rounded fs-3">
                        <BarChart3 className="text-primary" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Médias</p>
                    </div>
                    <div className="flex-shrink-0">
                      <h5 className="text-warning fs-14 mb-0">
                        <ImageIcon className="h-4 w-4" />
                      </h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-2">
                    <div>
                      <h2 className="ff-secondary fw-semibold">{brand._count.media}</h2>
                      <Badge variant="secondary" className="badge-soft-warning">
                        Stockés
                      </Badge>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-warning-subtle rounded fs-3">
                        <ImageIcon className="text-warning" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <ul className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                        type="button"
                      >
                        <i className="fas fa-home"></i>
                        Vue d'ensemble
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'members' ? 'active' : ''}`}
                        onClick={() => setActiveTab('members')}
                        type="button"
                      >
                        <Users className="h-4 w-4 me-1" />
                        Membres
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'channels' ? 'active' : ''}`}
                        onClick={() => setActiveTab('channels')}
                        type="button"
                      >
                        <MessageSquare className="h-4 w-4 me-1" />
                        Canaux
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                        type="button"
                      >
                        <Settings className="h-4 w-4 me-1" />
                        Paramètres
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-4">
                  {/* Tab Content */}
                  {activeTab === 'overview' && (
                    <div className="tab-pane fade show active">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="card">
                            <div className="card-header">
                              <h5 className="card-title mb-0">
                                <Settings className="h-5 w-5 me-2 d-inline" />
                                Détails de la marque
                              </h5>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-borderless mb-0">
                                  <tbody>
                                    <tr>
                                      <td className="fw-medium">Langue :</td>
                                      <td>{brand.locale}</td>
                                    </tr>
                                    <tr>
                                      <td className="fw-medium">Fuseau horaire :</td>
                                      <td>{brand.timezone}</td>
                                    </tr>
                                    {brand.tone && (
                                      <tr>
                                        <td className="fw-medium">Ton éditorial :</td>
                                        <td>{brand.tone}</td>
                                      </tr>
                                    )}
                                    {(brand.primaryColor || brand.secondaryColor) && (
                                      <tr>
                                        <td className="fw-medium">Couleurs :</td>
                                        <td>
                                          <div className="d-flex gap-2">
                                            {brand.primaryColor && (
                                              <div 
                                                className="rounded border"
                                                style={{ 
                                                  backgroundColor: brand.primaryColor,
                                                  width: '24px',
                                                  height: '24px'
                                                }}
                                                title={`Primaire: ${brand.primaryColor}`}
                                              />
                                            )}
                                            {brand.secondaryColor && (
                                              <div 
                                                className="rounded border"
                                                style={{ 
                                                  backgroundColor: brand.secondaryColor,
                                                  width: '24px',
                                                  height: '24px'
                                                }}
                                                title={`Secondaire: ${brand.secondaryColor}`}
                                              />
                                            )}
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-lg-6">
                          <div className="card">
                            <div className="card-header">
                              <h5 className="card-title mb-0">Actions rapides</h5>
                            </div>
                            <div className="card-body">
                              <div className="d-grid gap-2">
                                <Button className="btn btn-primary btn-label">
                                  <Plus className="h-4 w-4 me-2" />
                                  Créer du contenu
                                </Button>
                                <Button className="btn btn-secondary btn-label" variant="outline">
                                  <ImageIcon className="h-4 w-4 me-2" />
                                  Gérer les médias
                                </Button>
                                <Button className="btn btn-info btn-label" variant="outline">
                                  <BarChart3 className="h-4 w-4 me-2" />
                                  Voir les statistiques
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'members' && (
                    <div className="tab-pane fade show active">
                      <MemberManagement brand={brand} onUpdate={loadBrand} />
                    </div>
                  )}

                  {activeTab === 'channels' && (
                    <div className="tab-pane fade show active">
                      <ChannelManagement brand={brand} onUpdate={loadBrand} />
                    </div>
                  )}

                  {activeTab === 'settings' && (
                    <div className="tab-pane fade show active">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="card-title mb-0">Paramètres de la marque</h5>
                        </div>
                        <div className="card-body">
                          {brand.ctas.length > 0 && (
                            <div className="mb-4">
                              <h6 className="fw-semibold mb-2">Call-to-Actions</h6>
                              <div className="d-flex flex-wrap gap-2">
                                {brand.ctas.map((cta, index) => (
                                  <Badge key={index} variant="secondary" className="badge-soft-primary">
                                    {cta}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {brand.forbidden.length > 0 && (
                            <div>
                              <h6 className="fw-semibold mb-2">Mots interdits</h6>
                              <div className="d-flex flex-wrap gap-2">
                                {brand.forbidden.map((word, index) => (
                                  <Badge key={index} variant="destructive" className="badge-soft-danger">
                                    {word}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Edit Brand Modal */}
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Modifier la marque</DialogTitle>
              </DialogHeader>
              <BrandForm
                brand={brand}
                onSubmit={handleUpdateBrand}
                onCancel={() => setIsEditModalOpen(false)}
                isLoading={isSubmitting}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
