// lib/api/brands.ts
import { Brand, CreateBrandData, UpdateBrandData, AddMemberData, CreateChannelData, Role } from '@/types/brand';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class BrandsAPI {
  private getAuthToken(): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(/(?:^|; )token=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getAuthToken();
    
    console.log('🔍 BrandsAPI Debug:', {
      endpoint,
      token: token ? `${token.substring(0, 20)}...` : 'NO TOKEN',
      url: `${API_BASE}${endpoint}`
    });

    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      credentials: 'include', // Pour inclure les cookies JWT
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Erreur réseau' }));
      console.error('❌ Erreur API complète:', {
        status: response.status,
        statusText: response.statusText,
        url: `${API_BASE}${endpoint}`,
        error: error,
        headers: Object.fromEntries(response.headers.entries())
      });
      throw new Error(error.message || `Erreur ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // === GESTION DES MARQUES ===
  async getMyBrands(): Promise<Brand[]> {
    return this.request<Brand[]>('/brands/me');
  }

  async getBrand(id: string): Promise<Brand> {
    return this.request<Brand>(`/brands/${id}`);
  }

  async createBrand(data: CreateBrandData): Promise<Brand> {
    return this.request<Brand>('/brands', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBrand(id: string, data: UpdateBrandData): Promise<Brand> {
    return this.request<Brand>(`/brands/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBrand(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/brands/${id}`, {
      method: 'DELETE',
    });
  }

  // === GESTION DES MEMBRES ===
  async addMember(brandId: string, data: AddMemberData): Promise<any> {
    return this.request(`/brands/${brandId}/members`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMemberRole(brandId: string, memberId: string, role: Role): Promise<any> {
    return this.request(`/brands/${brandId}/members/${memberId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  }

  async removeMember(brandId: string, memberId: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/brands/${brandId}/members/${memberId}`, {
      method: 'DELETE',
    });
  }

  // === GESTION DES CANAUX ===
  async createChannel(brandId: string, data: CreateChannelData): Promise<any> {
    return this.request(`/brands/${brandId}/channels`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateChannel(brandId: string, channelId: string, data: any): Promise<any> {
    return this.request(`/brands/${brandId}/channels/${channelId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteChannel(brandId: string, channelId: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/brands/${brandId}/channels/${channelId}`, {
      method: 'DELETE',
    });
  }
}

export const brandsAPI = new BrandsAPI();
