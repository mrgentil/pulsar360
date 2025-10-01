'use client';

import { useState } from 'react';
import { Brand, Channel, ChannelType, CreateChannelData, Role } from '@/types/brand';
import { brandsAPI } from '@/lib/api/brands';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Instagram,
  Facebook,
  Mail,
  MessageCircle,
  Smartphone,
  Settings,
  Trash2,
  Link as LinkIcon,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2
} from 'lucide-react';

interface ChannelManagementProps {
  brand: Brand;
  onUpdate: () => void;
}

const getChannelIcon = (type: ChannelType) => {
  switch (type) {
    case ChannelType.INSTAGRAM:
      return <Instagram className="h-5 w-5 text-pink-600" />;
    case ChannelType.FACEBOOK:
      return <Facebook className="h-5 w-5 text-blue-600" />;
    case ChannelType.EMAIL:
      return <Mail className="h-5 w-5 text-green-600" />;
    case ChannelType.WHATSAPP:
      return <MessageCircle className="h-5 w-5 text-green-500" />;
    case ChannelType.SMS:
      return <Smartphone className="h-5 w-5 text-purple-600" />;
  }
};

const getChannelLabel = (type: ChannelType) => {
  switch (type) {
    case ChannelType.INSTAGRAM:
      return 'Instagram';
    case ChannelType.FACEBOOK:
      return 'Facebook';
    case ChannelType.EMAIL:
      return 'Email';
    case ChannelType.WHATSAPP:
      return 'WhatsApp';
    case ChannelType.SMS:
      return 'SMS';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'connected':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'connected':
      return 'Connecté';
    case 'error':
      return 'Erreur';
    case 'disconnected':
    default:
      return 'Déconnecté';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'connected':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'error':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function ChannelManagement({ brand, onUpdate }: ChannelManagementProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [channelType, setChannelType] = useState<ChannelType>(ChannelType.INSTAGRAM);

  const userRole = brand.members.find(m => m.user.id)?.role || Role.VIEWER;
  const canManageChannels = [Role.OWNER, Role.ADMIN].includes(userRole);

  const availableChannels = Object.values(ChannelType).filter(
    type => !brand.channels.some(channel => channel.type === type)
  );

  const handleAddChannel = async () => {
    try {
      setIsSubmitting(true);
      const channelData: CreateChannelData = {
        type: channelType,
        provider: getDefaultProvider(channelType),
      };
      
      await brandsAPI.createChannel(brand.id, channelData);
      setIsAddModalOpen(false);
      onUpdate();
      toast.success('Canal ajouté avec succès !');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de l\'ajout du canal');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteChannel = async () => {
    if (!selectedChannel) return;

    try {
      await brandsAPI.deleteChannel(brand.id, selectedChannel.id);
      setIsDeleteDialogOpen(false);
      setSelectedChannel(null);
      onUpdate();
      toast.success('Canal supprimé avec succès !');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la suppression du canal');
    }
  };

  const handleConnectChannel = async (channel: Channel) => {
    // Ici on pourrait ouvrir une modal de configuration OAuth
    toast.info('Fonctionnalité de connexion en cours de développement');
  };

  const openDeleteDialog = (channel: Channel) => {
    setSelectedChannel(channel);
    setIsDeleteDialogOpen(true);
  };

  const getDefaultProvider = (type: ChannelType): string => {
    switch (type) {
      case ChannelType.INSTAGRAM:
      case ChannelType.FACEBOOK:
        return 'meta';
      case ChannelType.EMAIL:
        return 'mailgun';
      case ChannelType.WHATSAPP:
        return 'twilio';
      case ChannelType.SMS:
        return 'twilio';
      default:
        return 'generic';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Canaux de communication</h2>
          <p className="text-gray-600">Connectez vos plateformes de publication</p>
        </div>
        {canManageChannels && availableChannels.length > 0 && (
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un canal
          </Button>
        )}
      </div>

      {/* Channels Grid */}
      {brand.channels.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun canal configuré</h3>
            <p className="text-gray-600 mb-6">
              Ajoutez vos premiers canaux de communication pour commencer à publier
            </p>
            {canManageChannels && availableChannels.length > 0 && (
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter mon premier canal
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brand.channels.map((channel) => (
            <Card key={channel.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getChannelIcon(channel.type)}
                    <div>
                      <CardTitle className="text-lg">{getChannelLabel(channel.type)}</CardTitle>
                      {channel.provider && (
                        <p className="text-sm text-gray-500 capitalize">{channel.provider}</p>
                      )}
                    </div>
                  </div>
                  
                  {canManageChannels && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleConnectChannel(channel)}>
                          <LinkIcon className="h-4 w-4 mr-2" />
                          {channel.status === 'connected' ? 'Reconnecter' : 'Connecter'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          Configurer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => openDeleteDialog(channel)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Statut</span>
                    <Badge variant="outline" className={getStatusColor(channel.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(channel.status)}
                        <span>{getStatusLabel(channel.status)}</span>
                      </div>
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ajouté le</span>
                    <span className="text-sm">
                      {new Date(channel.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  
                  {channel.status === 'connected' && (
                    <Button 
                      className="w-full" 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleConnectChannel(channel)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Gérer
                    </Button>
                  )}
                  
                  {channel.status === 'disconnected' && (
                    <Button 
                      className="w-full" 
                      size="sm"
                      onClick={() => handleConnectChannel(channel)}
                    >
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Connecter
                    </Button>
                  )}
                  
                  {channel.status === 'error' && (
                    <Button 
                      className="w-full" 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleConnectChannel(channel)}
                    >
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Corriger
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Channel Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Ajouter un canal</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Type de canal</label>
              <Select value={channelType} onValueChange={(value: ChannelType) => setChannelType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableChannels.map((type) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center space-x-2">
                        {getChannelIcon(type)}
                        <span>{getChannelLabel(type)}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note :</strong> Après avoir ajouté le canal, vous devrez le connecter 
                à votre compte {getChannelLabel(channelType)} pour pouvoir publier du contenu.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddChannel} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Ajouter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Channel Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le canal</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le canal {selectedChannel && getChannelLabel(selectedChannel.type)} ?
              Cette action supprimera également tous les contenus programmés sur ce canal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteChannel}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
