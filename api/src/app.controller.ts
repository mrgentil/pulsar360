import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
    constructor(private prisma: PrismaService) {}
    @Get('health') async health() {
        const count = await this.prisma.user.count();
        return { ok: true, users: count };
    }
}
