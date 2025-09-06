import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}

    async register(dto: RegisterDto) {
        const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (exists) throw new BadRequestException('Email déjà utilisé');

        const hash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: { email: dto.email, password: hash, name: dto.name, role: 'OWNER' as any },
            select: { id: true, email: true, name: true, role: true, createdAt: true },
        });

        return { user, token: this.sign(user.id, user.email) };
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user) throw new UnauthorizedException('Identifiants invalides');

        const ok = await bcrypt.compare(dto.password, (user as any).password);
        if (!ok) throw new UnauthorizedException('Identifiants invalides');

        const safe = { id: user.id, email: user.email, name: (user as any).name, role: (user as any).role };
        return { user: safe, token: this.sign(user.id, user.email) };
    }

    private sign(sub: string, email: string) {
        return this.jwt.sign({ sub, email });
    }
}
