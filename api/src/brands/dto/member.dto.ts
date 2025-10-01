// brands/dto/member.dto.ts
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class AddMemberDto {
    @IsEmail({}, { message: 'Email invalide' })
    email: string;

    @IsEnum(Role, { message: 'Rôle invalide' })
    role: Role;

    @IsOptional()
    @IsString()
    message?: string; // Message d'invitation personnalisé
}

export class UpdateMemberRoleDto {
    @IsEnum(Role, { message: 'Rôle invalide' })
    role: Role;
}

export class MemberResponseDto {
    id: string;
    role: Role;
    user: {
        id: string;
        name: string;
        email: string;
        avatarUrl?: string;
    };
    joinedAt: Date;
}
