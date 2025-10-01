'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Brand, Member, Channel, Role, ChannelType } from '@/types/brand';
import { brandsAPI } from '@/lib/api/brands';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/brands">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Link>
          </Button>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-gray-100">
              <AvatarImage src={brand.logoUrl} alt={brand.name} />
              <AvatarFallback 
                className="text-xl font-semibold"
                style={{ backgroundColor: brand.primaryColor || '#f3f4f6' }}
              >
                {brand.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{brand.name}</h1>
              <p className="text-gray-500">@{brand.slug}</p>
              <div className="flex items-center space-x-2 mt-1">
                {getRoleIcon(userRole)}
                <span className="text-sm text-gray-600">{getRoleLabel(userRole)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {canEdit && (
          <Button onClick={() => setIsEditModalOpen(true)} variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        )}
      </div>

      {/* Brand Info */}
      {brand.description && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-gray-700">{brand.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{brand._count.members}</p>
                <p className="text-sm text-gray-600">Membres</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{brand._count.channels}</p>
                <p className="text-sm text-gray-600">Canaux</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{brand._count.contents}</p>
                <p className="text-sm text-gray-600">Contenus</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ImageIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{brand._count.media}</p>
                <p className="text-sm text-gray-600">Médias</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="members">Membres</TabsTrigger>
          <TabsTrigger value="channels">Canaux</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Brand Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Détails de la marque</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Langue</p>
                    <p className="text-sm text-gray-600">{brand.locale}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Fuseau horaire</p>
                    <p className="text-sm text-gray-600">{brand.timezone}</p>
                  </div>
                </div>
                {brand.tone && (
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Ton éditorial</p>
                      <p className="text-sm text-gray-600">{brand.tone}</p>
                    </div>
                  </div>
                )}
                {(brand.primaryColor || brand.secondaryColor) && (
                  <div className="flex items-center space-x-3">
                    <Palette className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Couleurs</p>
                      <div className="flex space-x-2 mt-1">
                        {brand.primaryColor && (
                          <div 
                            className="w-6 h-6 rounded border border-gray-300"
                            style={{ backgroundColor: brand.primaryColor }}
                            title={`Primaire: ${brand.primaryColor}`}
                          />
                        )}
                        {brand.secondaryColor && (
                          <div 
                            className="w-6 h-6 rounded border border-gray-300"
                            style={{ backgroundColor: brand.secondaryColor }}
                            title={`Secondaire: ${brand.secondaryColor}`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer du contenu
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Gérer les médias
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Voir les statistiques
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">Aucune activité récente</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <MemberManagement brand={brand} onUpdate={loadBrand} />
        </TabsContent>

        <TabsContent value="channels">
          <ChannelManagement brand={brand} onUpdate={loadBrand} />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de la marque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {brand.ctas.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Call-to-Actions</h4>
                    <div className="flex flex-wrap gap-2">
                      {brand.ctas.map((cta, index) => (
                        <Badge key={index} variant="secondary">{cta}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {brand.forbidden.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Mots interdits</h4>
                    <div className="flex flex-wrap gap-2">
                      {brand.forbidden.map((word, index) => (
                        <Badge key={index} variant="destructive">{word}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
  );
}
