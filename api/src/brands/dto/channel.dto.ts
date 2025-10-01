// brands/dto/channel.dto.ts
import { IsEnum, IsOptional, IsString, IsObject } from 'class-validator';
import { ChannelType } from '@prisma/client';

export class CreateChannelDto {
    @IsEnum(ChannelType, { message: 'Type de canal invalide' })
    type: ChannelType;

    @IsOptional()
    @IsString()
    provider?: string; // 'meta', 'google', 'mailgun', etc.

    @IsOptional()
    @IsObject()
    config?: Record<string, any>; // Configuration spécifique au canal
}

export class UpdateChannelDto {
    @IsOptional()
    @IsString()
    status?: string; // 'connected', 'disconnected', 'error'

    @IsOptional()
    @IsObject()
    config?: Record<string, any>;

    @IsOptional()
    @IsObject()
    meta?: Record<string, any>; // Métadonnées du canal
}

export class ChannelResponseDto {
    id: string;
    type: ChannelType;
    provider?: string;
    status: string;
    isConnected: boolean;
    lastSync?: Date;
    config?: Record<string, any>;
    meta?: Record<string, any>;
}
