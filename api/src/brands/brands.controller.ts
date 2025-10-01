// brands/brands.controller.ts
import { Body, Controller, Get, Post, Req, UseGuards, Delete, Param, Put, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { JwtRolesGuard } from '../auth/jwt-roles.guard';
import { Roles } from '../auth/roles.decorator';
import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/create-brand.dto';
import { AddMemberDto, UpdateMemberRoleDto } from './dto/member.dto';
import { CreateChannelDto, UpdateChannelDto } from './dto/channel.dto';

@Controller('brands')
@UseGuards(JwtAuthGuard)
export class BrandsController {
    constructor(private service: BrandsService) {}

    // === GESTION DES MARQUES ===
    @Post()
    async create(@Req() req: any, @Body() dto: CreateBrandDto) {
        try {
            console.log('🔍 Backend - Création marque:', {
                user: req.user,
                userId: req.user?.id,
                dto: dto
            });
            
            if (!req.user?.id) {
                throw new Error('Utilisateur non authentifié - req.user.id manquant');
            }
            
            const result = await this.service.create(req.user.id, dto);
            console.log('✅ Backend - Marque créée:', result.id);
            return result;
        } catch (error) {
            console.error('❌ Backend - Erreur création marque:', {
                error: error.message,
                stack: error.stack,
                dto: dto,
                userId: req.user.id
            });
            throw error;
        }
    }

    @Get('me')
    mine(@Req() req: any) {
        return this.service.mine(req.user.id);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: any) {
        return this.service.findOne(req.user.id, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Req() req: any, @Body() dto: UpdateBrandDto) {
        return this.service.update(req.user.id, id, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string, @Req() req: any) {
        return this.service.delete(req.user.id, id);
    }

    // === GESTION DES MEMBRES ===
    @Post(':id/members')
    addMember(@Param('id') brandId: string, @Req() req: any, @Body() dto: AddMemberDto) {
        return this.service.addMember(req.user.id, brandId, dto);
    }

    @Patch(':id/members/:memberId/role')
    updateMemberRole(
        @Param('id') brandId: string,
        @Param('memberId') memberId: string,
        @Req() req: any,
        @Body() dto: UpdateMemberRoleDto
    ) {
        return this.service.updateMemberRole(req.user.id, brandId, memberId, dto);
    }

    @Delete(':id/members/:memberId')
    removeMember(
        @Param('id') brandId: string,
        @Param('memberId') memberId: string,
        @Req() req: any
    ) {
        return this.service.removeMember(req.user.id, brandId, memberId);
    }

    // === GESTION DES CANAUX ===
    @Post(':id/channels')
    createChannel(@Param('id') brandId: string, @Req() req: any, @Body() dto: CreateChannelDto) {
        return this.service.createChannel(req.user.id, brandId, dto);
    }

    @Put(':id/channels/:channelId')
    updateChannel(
        @Param('id') brandId: string,
        @Param('channelId') channelId: string,
        @Req() req: any,
        @Body() dto: UpdateChannelDto
    ) {
        return this.service.updateChannel(req.user.id, brandId, channelId, dto);
    }

    @Delete(':id/channels/:channelId')
    deleteChannel(
        @Param('id') brandId: string,
        @Param('channelId') channelId: string,
        @Req() req: any
    ) {
        return this.service.deleteChannel(req.user.id, brandId, channelId);
    }
}
