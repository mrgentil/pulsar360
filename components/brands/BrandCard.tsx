'use client';

import { Brand, Role } from '@/types/brand';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MoreHorizontal, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Image as ImageIcon,
  Settings,
  Trash2,
  Edit
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

interface BrandCardProps {
  brand: Brand;
  onEdit?: (brand: Brand) => void;
  onDelete?: (brand: Brand) => void;
}

const getRoleColor = (role: Role) => {
  switch (role) {
    case Role.OWNER:
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case Role.ADMIN:
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case Role.EDITOR:
      return 'bg-green-100 text-green-800 border-green-200';
    case Role.VIEWER:
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
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
    default:
      return role;
  }
};

export default function BrandCard({ brand, onEdit, onDelete }: BrandCardProps) {
  const userRole = brand.members?.find(m => m.user?.id)?.role || Role.VIEWER;
  const canEdit = [Role.OWNER, Role.ADMIN].includes(userRole);
  const canDelete = userRole === Role.OWNER;

  return (
    <div className="card gallery-card overflow-hidden">
      {/* Image principale */}
      <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
        <img 
          src={brand.coverUrl || brand.logoUrl || `https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop&crop=center`}
          alt={brand.name}
          className="w-100 h-100 object-cover"
          style={{ objectFit: 'cover' }}
        />
        
        {/* Overlay avec gradient */}
        <div className="position-absolute top-0 start-0 w-100 h-100" 
             style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)' }}>
        </div>
        
        {/* Logo en overlay */}
        <div className="position-absolute top-0 end-0 m-3">
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
            <AvatarImage src={brand.logoUrl} alt={brand.name} />
            <AvatarFallback 
              className="text-sm font-bold text-white"
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
        
        {/* Menu dropdown */}
        <div className="position-absolute top-0 start-0 m-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20 border-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/brands/${brand.id}`}>
                  <Settings className="h-4 w-4 mr-2" />
                  Gérer
                </Link>
              </DropdownMenuItem>
              {canEdit && (
                <DropdownMenuItem onClick={() => onEdit?.(brand)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {canDelete && (
                <DropdownMenuItem 
                  onClick={() => onDelete?.(brand)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Badge rôle */}
        <div className="position-absolute bottom-0 start-0 m-3">
          <Badge variant="secondary" className="bg-white/90 text-gray-800 border-0">
            {getRoleLabel(userRole)}
          </Badge>
        </div>
      </div>
      
      {/* Contenu de la carte */}
      <div className="card-body p-3">
        <div className="d-flex align-items-start justify-content-between mb-2">
          <div className="flex-grow-1">
            <h6 className="card-title mb-1 fw-semibold text-dark">{brand.name}</h6>
            <p className="text-muted mb-0 small">@{brand.slug}</p>
          </div>
        </div>
        
        {/* Statistiques en ligne */}
        <div className="d-flex align-items-center justify-content-between text-muted small mb-3">
          <div className="d-flex align-items-center">
            <Users className="h-4 w-4 me-1" />
            <span>{brand._count?.members || 0}</span>
          </div>
          <div className="d-flex align-items-center">
            <MessageSquare className="h-4 w-4 me-1" />
            <span>{brand._count?.channels || 0}</span>
          </div>
          <div className="d-flex align-items-center">
            <BarChart3 className="h-4 w-4 me-1" />
            <span>{brand._count?.contents || 0}</span>
          </div>
          <div className="d-flex align-items-center">
            <ImageIcon className="h-4 w-4 me-1" />
            <span>{brand._count?.media || 0}</span>
          </div>
        </div>
        
        {/* Membres et bouton */}
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="d-flex" style={{ marginLeft: '-4px' }}>
              {brand.members?.slice(0, 3).map((member) => (
                <Avatar key={member.id} className="h-6 w-6 border-2 border-white" style={{ marginLeft: '-4px' }}>
                  <AvatarImage src={member.user?.avatarUrl} alt={member.user?.name || 'Utilisateur'} />
                  <AvatarFallback className="text-xs bg-gray-200">
                    {member.user?.name?.charAt(0).toUpperCase() || member.user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              )) || []}
              {(brand._count?.members || 0) > 3 && (
                <div className="h-6 w-6 bg-gray-100 border-2 border-white rounded-circle d-flex align-items-center justify-content-center" style={{ marginLeft: '-4px' }}>
                  <span className="text-xs text-gray-600">+{(brand._count?.members || 0) - 3}</span>
                </div>
              )}
            </div>
          </div>
          
          <Button asChild size="sm" className="btn-sm btn-primary">
            <Link href={`/dashboard/brands/${brand.id}`}>
              Ouvrir
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
