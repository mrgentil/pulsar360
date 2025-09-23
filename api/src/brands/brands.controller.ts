// brands/brands.controller.ts
import { Body, Controller, Get, Post, Req, UseGuards, Delete, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { JwtRolesGuard } from '../auth/jwt-roles.guard';
import { Roles } from '../auth/roles.decorator';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';

@Controller('brands')
@UseGuards(JwtAuthGuard)
export class BrandsController {
    constructor(private service: BrandsService) {}

    @Post()
    create(@Req() req: any, @Body() dto: CreateBrandDto) {
        return this.service.create(req.user.id, dto);
    }

    @Get('me')
    mine(@Req() req: any) {
        return this.service.mine(req.user.id);
    }

    // Exemple d'utilisation des rôles - seuls OWNER et ADMIN peuvent supprimer
    @Delete(':id')
    @UseGuards(JwtRolesGuard)
    @Roles('OWNER', 'ADMIN')
    async delete(@Param('id') id: string, @Req() req: any) {
        // Logique de suppression ici
        return { message: 'Brand deleted successfully' };
    }

    // Exemple - seuls EDITOR et plus peuvent créer du contenu
    @Post(':id/content')
    @UseGuards(JwtRolesGuard)
    @Roles('EDITOR', 'ADMIN', 'OWNER')
    async createContent(@Param('id') brandId: string, @Req() req: any) {
        // Logique de création de contenu ici
        return { message: 'Content created successfully' };
    }
}
