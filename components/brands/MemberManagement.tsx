'use client';

import { useState } from 'react';
import { Brand, Member, Role, AddMemberData } from '@/types/brand';
import { brandsAPI } from '@/lib/api/brands';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { 
  Plus,
  MoreHorizontal,
  Crown,
  Shield,
  PenTool,
  Eye,
  Trash2,
  UserPlus,
  Mail,
  Loader2
} from 'lucide-react';

interface MemberManagementProps {
  brand: Brand;
  onUpdate: () => void;
}

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
  }
};

export default function MemberManagement({ brand, onUpdate }: MemberManagementProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>(Role.EDITOR);
  const [message, setMessage] = useState('');

  const userRole = brand.members.find(m => m.user.id)?.role || Role.VIEWER;
  const canManageMembers = [Role.OWNER, Role.ADMIN].includes(userRole);

  const handleAddMember = async () => {
    if (!email.trim()) {
      toast.error('Veuillez saisir un email');
      return;
    }

    try {
      setIsSubmitting(true);
      const memberData: AddMemberData = {
        email: email.trim(),
        role,
        message: message.trim() || undefined
      };
      
      await brandsAPI.addMember(brand.id, memberData);
      setIsAddModalOpen(false);
      setEmail('');
      setRole(Role.EDITOR);
      setMessage('');
      onUpdate();
      toast.success('Membre ajouté avec succès !');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de l\'ajout du membre');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateRole = async (member: Member, newRole: Role) => {
    try {
      await brandsAPI.updateMemberRole(brand.id, member.id, newRole);
      onUpdate();
      toast.success('Rôle mis à jour avec succès !');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la mise à jour du rôle');
    }
  };

  const handleRemoveMember = async () => {
    if (!selectedMember) return;

    try {
      await brandsAPI.removeMember(brand.id, selectedMember.id);
      setIsRemoveDialogOpen(false);
      setSelectedMember(null);
      onUpdate();
      toast.success('Membre retiré avec succès !');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la suppression du membre');
    }
  };

  const openRemoveDialog = (member: Member) => {
    setSelectedMember(member);
    setIsRemoveDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Membres de l'équipe</h2>
          <p className="text-gray-600">Gérez les membres et leurs permissions</p>
        </div>
        {canManageMembers && (
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un membre
          </Button>
        )}
      </div>

      {/* Members List */}
      <div className="grid gap-4">
        {brand.members.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.user.avatarUrl} alt={member.user.name} />
                    <AvatarFallback className="text-lg">
                      {member.user.name?.charAt(0).toUpperCase() || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{member.user.name}</h3>
                    <p className="text-gray-600 flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{member.user.email}</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className={getRoleColor(member.role)}>
                    <div className="flex items-center space-x-1">
                      {getRoleIcon(member.role)}
                      <span>{getRoleLabel(member.role)}</span>
                    </div>
                  </Badge>
                  
                  {canManageMembers && member.role !== Role.OWNER && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleUpdateRole(member, Role.ADMIN)}>
                          <Shield className="h-4 w-4 mr-2" />
                          Promouvoir Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateRole(member, Role.EDITOR)}>
                          <PenTool className="h-4 w-4 mr-2" />
                          Définir Éditeur
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateRole(member, Role.VIEWER)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Définir Lecteur
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => openRemoveDialog(member)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Retirer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Member Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5" />
              <span>Ajouter un membre</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="membre@example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="role">Rôle</Label>
              <Select value={role} onValueChange={(value: Role) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Role.VIEWER}>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>Lecteur - Peut voir le contenu</span>
                    </div>
                  </SelectItem>
                  <SelectItem value={Role.EDITOR}>
                    <div className="flex items-center space-x-2">
                      <PenTool className="h-4 w-4" />
                      <span>Éditeur - Peut créer et modifier</span>
                    </div>
                  </SelectItem>
                  <SelectItem value={Role.ADMIN}>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Admin - Peut tout gérer</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="message">Message d'invitation (optionnel)</Label>
              <Input
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Bienvenue dans l'équipe !"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddMember} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Ajouter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Remove Member Dialog */}
      <AlertDialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Retirer le membre</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir retirer {selectedMember?.user.name} de cette marque ?
              Cette personne perdra l'accès à tous les contenus et données de la marque.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveMember}
              className="bg-red-600 hover:bg-red-700"
            >
              Retirer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
