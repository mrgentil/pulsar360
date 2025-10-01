'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Brand, CreateBrandData, UpdateBrandData } from '@/types/brand';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Palette,
  Globe,
  Clock,
  MessageCircle,
  Ban,
  Plus,
  X,
  Upload,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';

const brandSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(50),
  slug: z.string()
    .min(2, 'Le slug doit contenir au moins 2 caractères')
    .max(30, 'Le slug ne peut pas dépasser 30 caractères')
    .regex(/^[a-z0-9-]+$/, 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets')
    .transform(val => val.toLowerCase()),
  description: z.string().max(500).optional(),
  logoUrl: z.string().url('URL invalide').optional().or(z.literal('')),
  coverUrl: z.string().url('URL invalide').optional().or(z.literal('')),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Format de couleur invalide').optional().or(z.literal('')),
  secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Format de couleur invalide').optional().or(z.literal('')),
  locale: z.string().optional(),
  timezone: z.string().optional(),
  tone: z.string().max(200).optional(),
});

type BrandFormData = z.infer<typeof brandSchema>;

interface BrandFormProps {
  brand?: Brand;
  onSubmit: (data: CreateBrandData | UpdateBrandData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const locales = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'de', label: 'Deutsch' },
];

const timezones = [
  { value: 'Africa/Kinshasa', label: 'Kinshasa (GMT+1)' },
  { value: 'Europe/Paris', label: 'Paris (GMT+1)' },
  { value: 'America/New_York', label: 'New York (GMT-5)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (GMT+9)' },
];

export default function BrandForm({ brand, onSubmit, onCancel, isLoading }: BrandFormProps) {
  const [ctas, setCtas] = useState<string[]>(brand?.ctas || []);
  const [forbidden, setForbidden] = useState<string[]>(brand?.forbidden || []);
  const [newCta, setNewCta] = useState('');
  const [newForbidden, setNewForbidden] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>(brand?.logoUrl || '');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>(brand?.coverUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: brand?.name || '',
      slug: brand?.slug || '',
      description: brand?.description || '',
      logoUrl: brand?.logoUrl || '',
      coverUrl: brand?.coverUrl || '',
      primaryColor: brand?.primaryColor || '',
      secondaryColor: brand?.secondaryColor || '',
      locale: brand?.locale || 'fr',
      timezone: brand?.timezone || 'Africa/Kinshasa',
      tone: brand?.tone || '',
    },
    mode: 'onChange'
  });

  const watchedValues = watch();

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (!brand) { // Only auto-generate slug for new brands
      const slug = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') // Remove leading/trailing dashes
        .trim();
      setValue('slug', slug);
    }
  };

  const addCta = () => {
    if (newCta.trim() && !ctas.includes(newCta.trim())) {
      setCtas([...ctas, newCta.trim()]);
      setNewCta('');
    }
  };

  const removeCta = (index: number) => {
    setCtas(ctas.filter((_, i) => i !== index));
  };

  const addForbidden = () => {
    if (newForbidden.trim() && !forbidden.includes(newForbidden.trim())) {
      setForbidden([...forbidden, newForbidden.trim()]);
      setNewForbidden('');
    }
  };

  const removeForbidden = (index: number) => {
    setForbidden(forbidden.filter((_, i) => i !== index));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Le fichier ne doit pas dépasser 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Veuillez sélectionner une image');
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        setValue('logoUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('Le fichier ne doit pas dépasser 10MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Veuillez sélectionner une image');
        return;
      }
      setCoverFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCoverPreview(result);
        setValue('coverUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearLogo = () => {
    setLogoFile(null);
    setLogoPreview('');
    setValue('logoUrl', '');
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  const clearCover = () => {
    setCoverFile(null);
    setCoverPreview('');
    setValue('coverUrl', '');
    if (coverInputRef.current) coverInputRef.current.value = '';
  };

  const onFormSubmit = async (data: any) => {
    const formData = {
      name: data.name,
      slug: data.slug?.toLowerCase(), // Convertir en minuscules
      locale: data.locale || 'fr',
      timezone: data.timezone || 'Africa/Kinshasa',
      ctas: ctas.length > 0 ? ctas : undefined,
      forbidden: forbidden.length > 0 ? forbidden : undefined,
      logoUrl: data.logoUrl || undefined,
      coverUrl: data.coverUrl || undefined,
      primaryColor: data.primaryColor || undefined,
      secondaryColor: data.secondaryColor || undefined,
      description: data.description || undefined,
      tone: data.tone || undefined,
    };

    console.log('🚀 Données envoyées au backend:', formData);
    await onSubmit(formData);
  };

  return (
    <div className="container-fluid p-4">
      {/* Header Velzon Style */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 fs-18 fw-semibold">
              {brand ? 'Modifier la marque' : 'Créer une nouvelle marque'}
            </h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><a href="#">Marques</a></li>
                <li className="breadcrumb-item active">
                  {brand ? 'Modifier' : 'Créer'}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        {/* Card Velzon Style */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">Informations de base</h4>
              </div>
              <div className="card-body">
                <p className="text-muted">Configurez les informations principales de votre marque</p>
                
                {/* Grille Velzon Style - 3 colonnes */}
                <div className="row g-3 mb-4">
                  {/* Nom de marque */}
                  <div className="col-lg-4">
                    <div className="mb-3">
                      <label className="form-label">Nom de la marque *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Ma Super Marque"
                        {...register('name', { onChange: handleNameChange })}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name.message}</div>
                      )}
                      <div className="form-text">Exemple: Nike, Apple, Coca-Cola</div>
                    </div>
                  </div>

                  {/* Identifiant unique */}
                  <div className="col-lg-4">
                    <div className="mb-3">
                      <label className="form-label">Identifiant unique *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                        placeholder="ma-super-marque"
                        style={{ fontFamily: 'monospace' }}
                        {...register('slug')}
                      />
                      {errors.slug && (
                        <div className="invalid-feedback">{errors.slug.message}</div>
                      )}
                      <div className="form-text">Lettres, chiffres et tirets uniquement</div>
                    </div>
                  </div>

                  {/* Langue */}
                  <div className="col-lg-4">
                    <div className="mb-3">
                      <label className="form-label">Langue principale</label>
                      <select 
                        className="form-select"
                        value={watchedValues.locale || 'fr'}
                        onChange={(e) => setValue('locale', e.target.value)}
                      >
                        {locales.map((locale) => (
                          <option key={locale.value} value={locale.value}>
                            {locale.label}
                          </option>
                        ))}
                      </select>
                      <div className="form-text">Défaut: Français (France)</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Description de la marque</label>
                      <textarea
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        rows={4}
                        placeholder="Décrivez votre marque, ses valeurs et sa mission..."
                        {...register('description')}
                      />
                      {errors.description && (
                        <div className="invalid-feedback">{errors.description.message}</div>
                      )}
                      <div className="form-text">Maximum 500 caractères</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Apparence Velzon Style */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">Apparence visuelle</h4>
              </div>
              <div className="card-body">
                <p className="text-muted">Personnalisez l'identité visuelle de votre marque</p>
                
                {/* Grille couleurs - 2 colonnes */}
                <div className="row g-3 mb-4">
                  {/* Couleur primaire */}
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Couleur primaire</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className={`form-control ${errors.primaryColor ? 'is-invalid' : ''}`}
                          placeholder="#6366F1"
                          style={{ fontFamily: 'monospace' }}
                          {...register('primaryColor')}
                        />
                        <span 
                          className="input-group-text p-1"
                          style={{ 
                            backgroundColor: watchedValues.primaryColor || '#6366F1',
                            width: '40px',
                            border: '1px solid #dee2e6'
                          }}
                        ></span>
                      </div>
                      {errors.primaryColor && (
                        <div className="invalid-feedback">{errors.primaryColor.message}</div>
                      )}
                      <div className="form-text">Boutons, liens, éléments principaux</div>
                    </div>
                  </div>

                  {/* Couleur secondaire */}
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Couleur secondaire</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className={`form-control ${errors.secondaryColor ? 'is-invalid' : ''}`}
                          placeholder="#EC4899"
                          style={{ fontFamily: 'monospace' }}
                          {...register('secondaryColor')}
                        />
                        <span 
                          className="input-group-text p-1"
                          style={{ 
                            backgroundColor: watchedValues.secondaryColor || '#EC4899',
                            width: '40px',
                            border: '1px solid #dee2e6'
                          }}
                        ></span>
                      </div>
                      {errors.secondaryColor && (
                        <div className="invalid-feedback">{errors.secondaryColor.message}</div>
                      )}
                      <div className="form-text">Accents, badges, éléments décoratifs</div>
                    </div>
                  </div>
                </div>

                {/* Upload et URLs Logo/Cover */}
                <div className="row g-3">
                  {/* Logo Section */}
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Logo de la marque</label>
                      
                      {/* Aperçu du logo */}
                      {logoPreview && (
                        <div className="mb-2 text-center">
                          <div className="position-relative d-inline-block">
                            <img 
                              src={logoPreview} 
                              alt="Logo preview" 
                              className="img-thumbnail"
                              style={{ maxHeight: '80px', maxWidth: '120px' }}
                            />
                            <button
                              type="button"
                              className="btn btn-danger btn-sm position-absolute top-0 end-0 translate-middle rounded-circle p-1"
                              onClick={clearLogo}
                              style={{ width: '24px', height: '24px' }}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Upload de fichier */}
                      <div className="mb-2">
                        <input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="form-control"
                        />
                        <div className="form-text">PNG/JPG, max 5MB</div>
                      </div>

                      {/* Ou URL */}
                      <div className="input-group">
                        <span className="input-group-text">URL</span>
                        <input
                          type="url"
                          className={`form-control ${errors.logoUrl ? 'is-invalid' : ''}`}
                          placeholder="https://example.com/logo.png"
                          {...register('logoUrl')}
                        />
                      </div>
                      {errors.logoUrl && (
                        <div className="invalid-feedback">{errors.logoUrl.message}</div>
                      )}
                    </div>
                  </div>

                  {/* Cover Section */}
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Image de couverture</label>
                      
                      {/* Aperçu de la couverture */}
                      {coverPreview && (
                        <div className="mb-2 text-center">
                          <div className="position-relative d-inline-block">
                            <img 
                              src={coverPreview} 
                              alt="Cover preview" 
                              className="img-thumbnail"
                              style={{ maxHeight: '60px', maxWidth: '120px', objectFit: 'cover' }}
                            />
                            <button
                              type="button"
                              className="btn btn-danger btn-sm position-absolute top-0 end-0 translate-middle rounded-circle p-1"
                              onClick={clearCover}
                              style={{ width: '24px', height: '24px' }}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Upload de fichier */}
                      <div className="mb-2">
                        <input
                          ref={coverInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleCoverUpload}
                          className="form-control"
                        />
                        <div className="form-text">JPG/PNG, max 10MB</div>
                      </div>

                      {/* Ou URL */}
                      <div className="input-group">
                        <span className="input-group-text">URL</span>
                        <input
                          type="url"
                          className={`form-control ${errors.coverUrl ? 'is-invalid' : ''}`}
                          placeholder="https://example.com/cover.jpg"
                          {...register('coverUrl')}
                        />
                      </div>
                      {errors.coverUrl && (
                        <div className="invalid-feedback">{errors.coverUrl.message}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Configuration Velzon Style */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">Configuration avancée</h4>
              </div>
              <div className="card-body">
                <p className="text-muted">Paramètres de localisation et ton éditorial</p>
                
                <div className="row g-3 mb-4">
                  {/* Fuseau horaire */}
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Fuseau horaire</label>
                      <select 
                        className="form-select"
                        value={watchedValues.timezone || 'Africa/Kinshasa'}
                        onChange={(e) => setValue('timezone', e.target.value)}
                      >
                        {timezones.map((tz) => (
                          <option key={tz.value} value={tz.value}>
                            {tz.label}
                          </option>
                        ))}
                      </select>
                      <div className="form-text">Pour la planification automatique</div>
                    </div>
                  </div>

                  {/* Ton éditorial */}
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Ton éditorial</label>
                      <textarea
                        className={`form-control ${errors.tone ? 'is-invalid' : ''}`}
                        rows={3}
                        placeholder="Style de communication de votre marque..."
                        {...register('tone')}
                      />
                      {errors.tone && (
                        <div className="invalid-feedback">{errors.tone.message}</div>
                      )}
                      <div className="form-text">Maximum 200 caractères</div>
                    </div>
                  </div>
                </div>

                {/* CTA et Mots interdits */}
                <div className="row g-3">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Call-to-Actions</label>
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ajouter un CTA..."
                          value={newCta}
                          onChange={(e) => setNewCta(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCta())}
                        />
                        <button 
                          type="button" 
                          className="btn btn-outline-primary"
                          onClick={addCta}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="d-flex flex-wrap gap-1">
                        {ctas.map((cta, index) => (
                          <span key={index} className="badge bg-primary-subtle text-primary">
                            {cta}
                            <button
                              type="button"
                              className="btn-close btn-close-sm ms-1"
                              onClick={() => removeCta(index)}
                            ></button>
                          </span>
                        ))}
                      </div>
                      <div className="form-text">Actions recommandées</div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Mots interdits</label>
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ajouter un mot interdit..."
                          value={newForbidden}
                          onChange={(e) => setNewForbidden(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addForbidden())}
                        />
                        <button 
                          type="button" 
                          className="btn btn-outline-danger"
                          onClick={addForbidden}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="d-flex flex-wrap gap-1">
                        {forbidden.map((word, index) => (
                          <span key={index} className="badge bg-danger-subtle text-danger">
                            {word}
                            <button
                              type="button"
                              className="btn-close btn-close-sm ms-1"
                              onClick={() => removeForbidden(index)}
                            ></button>
                          </span>
                        ))}
                      </div>
                      <div className="form-text">Mots à éviter</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="text-end">
                  <button 
                    type="button" 
                    className="btn btn-light me-2"
                    onClick={onCancel}
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={!isValid || isLoading}
                  >
                    {isLoading && <Loader2 className="h-4 w-4 me-2 animate-spin" />}
                    {brand ? 'Mettre à jour' : 'Créer la marque'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
