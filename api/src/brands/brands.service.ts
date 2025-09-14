// brands/brands.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Role } from '@prisma/client';

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
                logoUrl: dto.logoUrl,
                primaryColor: dto.primaryColor,
                locale: dto.locale ?? 'fr',
                timezone: dto.timezone ?? 'Africa/Kinshasa',
                tone: dto.tone ?? 'pro',
                ctas: dto.ctas ?? [],
                forbidden: dto.forbidden ?? [],
                owner: { connect: { id: userId } },
                members: { create: { userId, role: Role.OWNER } },
            },
            select: { id: true, name: true, slug: true },
        });
    }

    async mine(userId: string) {
        return this.prisma.brand.findMany({
            where: { members: { some: { userId } } },
            select: { id: true, name: true, slug: true, locale: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async assertMember(userId: string, brandId: string) {
        const m = await this.prisma.member.findFirst({ where: { userId, brandId } });
        if (!m) throw new ForbiddenException('Accès refusé à cette marque');
        return m;
    }
}
