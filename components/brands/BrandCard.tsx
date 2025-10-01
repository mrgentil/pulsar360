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
    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-gray-100">
              <AvatarImage src={brand.logoUrl} alt={brand.name} />
              <AvatarFallback 
                className="text-lg font-semibold"
                style={{ backgroundColor: brand.primaryColor || '#f3f4f6' }}
              >
                {brand.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{brand.name}</h3>
              <p className="text-sm text-gray-500">@{brand.slug}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={getRoleColor(userRole)}>
              {getRoleLabel(userRole)}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
        </div>
        
        {brand.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{brand.description}</p>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-1">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500">Membres</p>
            <p className="text-sm font-semibold">{brand._count?.members || 0}</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-1">
              <MessageSquare className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-xs text-gray-500">Canaux</p>
            <p className="text-sm font-semibold">{brand._count?.channels || 0}</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-1">
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500">Contenus</p>
            <p className="text-sm font-semibold">{brand._count?.contents || 0}</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg mx-auto mb-1">
              <ImageIcon className="h-4 w-4 text-orange-600" />
            </div>
            <p className="text-xs text-gray-500">Médias</p>
            <p className="text-sm font-semibold">{brand._count?.media || 0}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {brand.members?.slice(0, 3).map((member) => (
              <Avatar key={member.id} className="h-6 w-6 border-2 border-white">
                <AvatarImage src={member.user?.avatarUrl} alt={member.user?.name || 'Utilisateur'} />
                <AvatarFallback className="text-xs">
                  {member.user?.name?.charAt(0).toUpperCase() || member.user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            )) || []}
            {(brand._count?.members || 0) > 3 && (
              <div className="h-6 w-6 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-600">+{(brand._count?.members || 0) - 3}</span>
              </div>
            )}
          </div>
          
          <Button asChild size="sm" variant="outline">
            <Link href={`/dashboard/brands/${brand.id}`}>
              Ouvrir
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
