// brands/brands.controller.ts
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
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
}
