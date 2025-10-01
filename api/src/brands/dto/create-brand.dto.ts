// brands/dto/create-brand.dto.ts
import { IsArray, IsOptional, IsString, Matches, IsHexColor, MinLength, MaxLength, IsUrl } from 'class-validator';

export class CreateBrandDto {
    @IsString()
    @MinLength(2, { message: 'Le nom doit contenir au moins 2 caractères' })
    @MaxLength(50, { message: 'Le nom ne peut pas dépasser 50 caractères' })
    name: string;

    @IsString()
    @Matches(/^[a-z0-9-]+$/, { message: 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets' })
    @MinLength(2)
    @MaxLength(30)
    slug: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @IsOptional()
    @IsUrl({}, { message: 'URL du logo invalide' })
    logoUrl?: string;

    @IsOptional()
    @IsUrl({}, { message: 'URL de couverture invalide' })
    coverUrl?: string;

    @IsOptional()
    @IsHexColor({ message: 'Couleur primaire invalide (format hex requis)' })
    primaryColor?: string;

    @IsOptional()
    @IsHexColor({ message: 'Couleur secondaire invalide (format hex requis)' })
    secondaryColor?: string;

    @IsOptional()
    @IsString()
    @Matches(/^[a-z]{2}(-[A-Z]{2})?$/, { message: 'Format de locale invalide (ex: fr, en-US)' })
    locale?: string; // default 'fr'

    @IsOptional()
    @IsString()
    timezone?: string; // default 'Africa/Kinshasa'

    @IsOptional()
    @IsString()
    @MaxLength(200)
    tone?: string; // Ton éditorial

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    ctas?: string[]; // Call-to-actions

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    forbidden?: string[]; // Mots interdits
}

export class UpdateBrandDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @IsOptional()
    @IsUrl()
    logoUrl?: string;

    @IsOptional()
    @IsUrl()
    coverUrl?: string;

    @IsOptional()
    @IsHexColor()
    primaryColor?: string;

    @IsOptional()
    @IsHexColor()
    secondaryColor?: string;

    @IsOptional()
    @IsString()
    @Matches(/^[a-z]{2}(-[A-Z]{2})?$/)
    locale?: string;

    @IsOptional()
    @IsString()
    timezone?: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    tone?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    ctas?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    forbidden?: string[];
}
