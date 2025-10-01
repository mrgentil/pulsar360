// types/brand.ts
export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  coverUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  locale: string;
  timezone: string;
  tone?: string;
  ctas: string[];
  forbidden: string[];
  createdAt: string;
  updatedAt: string;
  owner: User;
  members: Member[];
  channels: Channel[];
  _count: {
    members: number;
    channels: number;
    contents: number;
    media: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Member {
  id: string;
  role: Role;
  user: User;
  joinedAt?: string;
}

export interface Channel {
  id: string;
  type: ChannelType;
  provider?: string;
  status: string;
  isConnected: boolean;
  lastSync?: string;
  config?: Record<string, any>;
  meta?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export enum Role {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER'
}

export enum ChannelType {
  INSTAGRAM = 'INSTAGRAM',
  FACEBOOK = 'FACEBOOK',
  EMAIL = 'EMAIL',
  WHATSAPP = 'WHATSAPP',
  SMS = 'SMS'
}

export interface CreateBrandData {
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  coverUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  locale?: string;
  timezone?: string;
  tone?: string;
  ctas?: string[];
  forbidden?: string[];
}

export interface UpdateBrandData {
  name?: string;
  description?: string;
  logoUrl?: string;
  coverUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  locale?: string;
  timezone?: string;
  tone?: string;
  ctas?: string[];
  forbidden?: string[];
}

export interface AddMemberData {
  email: string;
  role: Role;
  message?: string;
}

export interface CreateChannelData {
  type: ChannelType;
  provider?: string;
  config?: Record<string, any>;
}
