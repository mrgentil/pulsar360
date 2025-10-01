// brands/brands.service.ts
import { Injectable, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/create-brand.dto';
import { AddMemberDto, UpdateMemberRoleDto } from './dto/member.dto';
import { CreateChannelDto, UpdateChannelDto } from './dto/channel.dto';
import { Role, ChannelType } from '@prisma/client';

@Injectable()
export class BrandsService {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, dto: CreateBrandDto) {
        const exists = await this.prisma.brand.findUnique({ where: { slug: dto.slug } });
        if (exists) throw new ForbiddenException('Slug déjà pris');

        return this.prisma.brand.create({
            data: {
                name: dto.name,
                slug: dto.slug,
                description: dto.description,
                logoUrl: dto.logoUrl,
                coverUrl: dto.coverUrl,
                primaryColor: dto.primaryColor,
                secondaryColor: dto.secondaryColor,
                locale: dto.locale ?? 'fr',
                timezone: dto.timezone ?? 'Africa/Kinshasa',
                tone: dto.tone,
                ctas: dto.ctas ?? [],
                forbidden: dto.forbidden ?? [],
                owner: { connect: { id: userId } },
                members: { create: { userId, role: Role.OWNER } },
            },
            include: {
                owner: { select: { id: true, name: true, email: true } },
                members: { include: { user: { select: { id: true, name: true, email: true } } } },
                channels: true,
                _count: { select: { members: true, channels: true, contents: true, media: true } }
            },
        });
    }

    async mine(userId: string) {
        return this.prisma.brand.findMany({
            where: { members: { some: { userId } } },
            include: {
                owner: { select: { id: true, name: true, email: true } },
                members: { 
                    where: { userId },
                    select: { role: true }
                },
                _count: { select: { members: true, channels: true, contents: true, media: true } }
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(userId: string, brandId: string) {
        await this.assertMember(userId, brandId);
        
        const brand = await this.prisma.brand.findUnique({
            where: { id: brandId },
            include: {
                owner: { select: { id: true, name: true, email: true, avatarUrl: true } },
                members: { 
                    include: { 
                        user: { select: { id: true, name: true, email: true, avatarUrl: true } }
                    },
                    orderBy: { role: 'asc' }
                },
                channels: {
                    select: {
                        id: true,
                        type: true,
                        provider: true,
                        status: true,
                        createdAt: true,
                        updatedAt: true
                    }
                },
                _count: { select: { members: true, channels: true, contents: true, media: true } }
            },
        });

        if (!brand) throw new NotFoundException('Marque introuvable');
        return brand;
    }

    async update(userId: string, brandId: string, dto: UpdateBrandDto) {
        const member = await this.assertMember(userId, brandId);
        
        // Seuls OWNER et ADMIN peuvent modifier la marque
        if (member.role !== Role.OWNER && member.role !== Role.ADMIN) {
            throw new ForbiddenException('Permissions insuffisantes pour modifier cette marque');
        }

        return this.prisma.brand.update({
            where: { id: brandId },
            data: dto,
            include: {
                owner: { select: { id: true, name: true, email: true } },
                members: { include: { user: { select: { id: true, name: true, email: true } } } },
                channels: true,
                _count: { select: { members: true, channels: true, contents: true, media: true } }
            },
        });
    }

    async delete(userId: string, brandId: string) {
        const member = await this.assertMember(userId, brandId);
        
        // Seul le OWNER peut supprimer la marque
        if (member.role !== Role.OWNER) {
            throw new ForbiddenException('Seul le propriétaire peut supprimer cette marque');
        }

        await this.prisma.brand.delete({ where: { id: brandId } });
        return { message: 'Marque supprimée avec succès' };
    }

    // === GESTION DES MEMBRES ===
    async addMember(userId: string, brandId: string, dto: AddMemberDto) {
        const member = await this.assertMember(userId, brandId);
        
        // Seuls OWNER et ADMIN peuvent ajouter des membres
        if (member.role !== Role.OWNER && member.role !== Role.ADMIN) {
            throw new ForbiddenException('Permissions insuffisantes pour ajouter des membres');
        }

        // Vérifier que l'utilisateur à ajouter existe
        const userToAdd = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!userToAdd) {
            throw new NotFoundException('Utilisateur introuvable avec cet email');
        }

        // Vérifier qu'il n'est pas déjà membre
        const existingMember = await this.prisma.member.findUnique({
            where: { brandId_userId: { brandId, userId: userToAdd.id } }
        });
        if (existingMember) {
            throw new BadRequestException('Cet utilisateur est déjà membre de cette marque');
        }

        return this.prisma.member.create({
            data: {
                brandId,
                userId: userToAdd.id,
                role: dto.role
            },
            include: {
                user: { select: { id: true, name: true, email: true, avatarUrl: true } }
            }
        });
    }

    async updateMemberRole(userId: string, brandId: string, memberId: string, dto: UpdateMemberRoleDto) {
        const member = await this.assertMember(userId, brandId);
        
        // Seuls OWNER et ADMIN peuvent modifier les rôles
        if (member.role !== Role.OWNER && member.role !== Role.ADMIN) {
            throw new ForbiddenException('Permissions insuffisantes pour modifier les rôles');
        }

        const targetMember = await this.prisma.member.findUnique({ where: { id: memberId } });
        if (!targetMember || targetMember.brandId !== brandId) {
            throw new NotFoundException('Membre introuvable');
        }

        // Le propriétaire ne peut pas être rétrogradé
        if (targetMember.role === Role.OWNER) {
            throw new ForbiddenException('Impossible de modifier le rôle du propriétaire');
        }

        return this.prisma.member.update({
            where: { id: memberId },
            data: { role: dto.role },
            include: {
                user: { select: { id: true, name: true, email: true, avatarUrl: true } }
            }
        });
    }

    async removeMember(userId: string, brandId: string, memberId: string) {
        const member = await this.assertMember(userId, brandId);
        
        // Seuls OWNER et ADMIN peuvent retirer des membres
        if (member.role !== Role.OWNER && member.role !== Role.ADMIN) {
            throw new ForbiddenException('Permissions insuffisantes pour retirer des membres');
        }

        const targetMember = await this.prisma.member.findUnique({ where: { id: memberId } });
        if (!targetMember || targetMember.brandId !== brandId) {
            throw new NotFoundException('Membre introuvable');
        }

        // Le propriétaire ne peut pas être retiré
        if (targetMember.role === Role.OWNER) {
            throw new ForbiddenException('Impossible de retirer le propriétaire');
        }

        await this.prisma.member.delete({ where: { id: memberId } });
        return { message: 'Membre retiré avec succès' };
    }

    // === GESTION DES CANAUX ===
    async createChannel(userId: string, brandId: string, dto: CreateChannelDto) {
        const member = await this.assertMember(userId, brandId);
        
        // Seuls OWNER et ADMIN peuvent créer des canaux
        if (member.role !== Role.OWNER && member.role !== Role.ADMIN) {
            throw new ForbiddenException('Permissions insuffisantes pour créer des canaux');
        }

        // Vérifier qu'un canal de ce type n'existe pas déjà
        const existingChannel = await this.prisma.channel.findUnique({
            where: { brandId_type: { brandId, type: dto.type } }
        });
        if (existingChannel) {
            throw new BadRequestException(`Un canal ${dto.type} existe déjà pour cette marque`);
        }

        return this.prisma.channel.create({
            data: {
                brandId,
                type: dto.type,
                provider: dto.provider,
                meta: dto.config || {}
            }
        });
    }

    async updateChannel(userId: string, brandId: string, channelId: string, dto: UpdateChannelDto) {
        const member = await this.assertMember(userId, brandId);
        
        // Seuls OWNER et ADMIN peuvent modifier les canaux
        if (member.role !== Role.OWNER && member.role !== Role.ADMIN) {
            throw new ForbiddenException('Permissions insuffisantes pour modifier les canaux');
        }

        const channel = await this.prisma.channel.findFirst({
            where: { id: channelId, brandId }
        });
        if (!channel) {
            throw new NotFoundException('Canal introuvable');
        }

        return this.prisma.channel.update({
            where: { id: channelId },
            data: {
                status: dto.status,
                meta: dto.meta ? { ...channel.meta as object, ...dto.meta } : channel.meta || undefined
            }
        });
    }

    async deleteChannel(userId: string, brandId: string, channelId: string) {
        const member = await this.assertMember(userId, brandId);
        
        // Seuls OWNER et ADMIN peuvent supprimer les canaux
        if (member.role !== Role.OWNER && member.role !== Role.ADMIN) {
            throw new ForbiddenException('Permissions insuffisantes pour supprimer les canaux');
        }

        const channel = await this.prisma.channel.findFirst({
            where: { id: channelId, brandId }
        });
        if (!channel) {
            throw new NotFoundException('Canal introuvable');
        }

        await this.prisma.channel.delete({ where: { id: channelId } });
        return { message: 'Canal supprimé avec succès' };
    }

    async assertMember(userId: string, brandId: string) {
        const m = await this.prisma.member.findFirst({ where: { userId, brandId } });
        if (!m) throw new ForbiddenException('Accès refusé à cette marque');
        return m;
    }
}
