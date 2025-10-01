'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import { Brand } from '@/types/brand';
import { brandsAPI } from '@/lib/api/brands';
import BrandCard from '@/components/brands/BrandCard';
import BrandForm from '@/components/brands/BrandForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
import { toast } from 'sonner';
import { 
  Plus, 
  Search, 
  Filter,
  Building2,
  Loader2
} from 'lucide-react';

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadBrands();
  }, []);

  useEffect(() => {
    console.log('Modal state changed:', isCreateModalOpen);
  }, [isCreateModalOpen]);

  useEffect(() => {
    // Filter brands based on search query
    const filtered = brands.filter(brand =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBrands(filtered);
  }, [brands, searchQuery]);

  const loadBrands = async () => {
    try {
      setIsLoading(true);
      const data = await brandsAPI.getMyBrands();
      setBrands(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des marques');
      console.error('Error loading brands:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBrand = async (data: any) => {
    try {
      setIsSubmitting(true);
      const newBrand = await brandsAPI.createBrand(data);
      setBrands([newBrand, ...brands]);
      setIsCreateModalOpen(false);
      toast.success('Marque créée avec succès !');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la création');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditBrand = async (data: any) => {
    if (!selectedBrand) return;
    
    try {
      setIsSubmitting(true);
      const updatedBrand = await brandsAPI.updateBrand(selectedBrand.id, data);
      setBrands(brands.map(b => b.id === selectedBrand.id ? updatedBrand : b));
      setIsEditModalOpen(false);
      setSelectedBrand(null);
      toast.success('Marque mise à jour avec succès !');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la mise à jour');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBrand = async () => {
    if (!selectedBrand) return;

    try {
      await brandsAPI.deleteBrand(selectedBrand.id);
      setBrands(brands.filter(b => b.id !== selectedBrand.id));
      setIsDeleteDialogOpen(false);
      setSelectedBrand(null);
      toast.success('Marque supprimée avec succès !');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la suppression');
    }
  };

  const openEditModal = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsDeleteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Chargement des marques...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="page-content" style={{ minHeight: '100vh', overflowY: 'auto' }}>
        <div className="container-fluid">
          {/* Header */}
          <div className="row mb-3 pb-1">
            <div className="col-12">
              <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                <div className="flex-grow-1">
                  <h4 className="fs-16 mb-1 d-flex align-items-center">
                    <Building2 className="h-5 w-5 me-2 text-primary" />
                    Gestion des Marques
                  </h4>
                  <p className="text-muted mb-0">
                    Créez et gérez vos marques, équipes et canaux de communication
                  </p>
                </div>
                <div className="mt-3 mt-lg-0">
                  <Button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="btn btn-primary"
                  >
                    <Plus className="h-4 w-4 me-2" />
                    Nouvelle Marque
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Search and Filters */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex align-items-center gap-3">
                <div className="position-relative flex-grow-1" style={{maxWidth: '400px'}}>
                  <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 h-4 w-4 text-muted" />
                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Rechercher une marque..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="btn btn-outline-secondary">
                  <Filter className="h-4 w-4 me-2" />
                  Filtres
                </button>
              </div>
            </div>
          </div>

          {/* Brands Grid */}
          <div className="row">
            <div className="col-12">
              {filteredBrands.length === 0 ? (
                <div className="text-center py-5">
                  <Building2 className="h-16 w-16 text-muted mx-auto mb-4" />
                  <h3 className="fs-18 fw-semibold text-dark mb-2">
                    {searchQuery ? 'Aucune marque trouvée' : 'Aucune marque'}
                  </h3>
                  <p className="text-muted mb-4">
                    {searchQuery 
                      ? 'Essayez de modifier votre recherche'
                      : 'Créez votre première marque pour commencer'
                    }
                  </p>
                  {!searchQuery && (
                    <button 
                      onClick={() => setIsCreateModalOpen(true)} 
                      className="btn btn-primary"
                    >
                      <Plus className="h-4 w-4 me-2" />
                      Créer ma première marque
                    </button>
                  )}
                </div>
              ) : (
                <div className="row g-4">
                  {filteredBrands.map((brand) => (
                    <div key={brand.id} className="col-xl-4 col-lg-6 col-md-6">
                      <BrandCard
                        brand={brand}
                        onEdit={openEditModal}
                        onDelete={openDeleteDialog}
                      />
                    </div>
                  ))}
                </div>
              )}

      {/* Create Brand Modal */}
      {isCreateModalOpen && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999 }}>
          <div className="modal-dialog modal-fullscreen-lg-down modal-xl modal-dialog-scrollable">
            <div className="modal-content shadow-lg border-0" style={{ minHeight: '90vh' }}>
              <div className="modal-header border-0 p-0">
                <button 
                  type="button" 
                  className="btn-close position-absolute top-0 end-0 m-3" 
                  style={{ zIndex: 10000 }}
                  onClick={() => setIsCreateModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body p-0" style={{ overflowY: 'auto' }}>
                <BrandForm
                  onSubmit={handleCreateBrand}
                  onCancel={() => setIsCreateModalOpen(false)}
                  isLoading={isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Brand Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Modifier la marque</DialogTitle>
          </DialogHeader>
          {selectedBrand && (
            <BrandForm
              brand={selectedBrand}
              onSubmit={handleEditBrand}
              onCancel={() => {
                setIsEditModalOpen(false);
                setSelectedBrand(null);
              }}
              isLoading={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer la marque</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer la marque "{selectedBrand?.name}" ?
              Cette action est irréversible et supprimera tous les contenus, médias et données associés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBrand}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 


