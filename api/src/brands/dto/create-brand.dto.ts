// brands/dto/create-brand.dto.ts
import { IsArray, IsOptional, IsString, Matches } from 'class-validator';
export class CreateBrandDto {
    @IsString() name: string;
    @IsString() @Matches(/^[a-z0-9-]+$/) slug: string;
    @IsOptional() @IsString() locale?: string;         // default 'fr'
    @IsOptional() @IsString() timezone?: string;       // default 'Africa/Kinshasa'
    @IsOptional() @IsString() tone?: string;           // default 'pro'
    @IsOptional() @IsArray()  ctas?: string[];         // ['Découvrir','Acheter']
    @IsOptional() @IsArray()  forbidden?: string[];    // ['gratuit','urgent']
    @IsOptional() @IsString() logoUrl?: string;
    @IsOptional() @IsString() primaryColor?: string;   // '#7C3AED'
}
