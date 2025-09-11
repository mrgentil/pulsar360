import { Body, Controller, Get, HttpCode, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from './jwt.guard';
import { PrismaService } from '../prisma.service';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService, private prisma: PrismaService) {}

  @Throttle({ default: { limit: 3, ttl: 60 } })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.auth.verifyEmail(token);
  }

  @Throttle({ default: { limit: 3, ttl: 60 } })
  @Post('resend')
  async resend(@Body('email') email: string) {
    return this.auth.resend(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: any) {
    const userId: string | undefined = req.user?.userId;
    if (!userId) return null;
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, isEmailVerified: true, avatarUrl: true },
    });
    return { user };
  }

  // Google OAuth
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() { /* redirection vers Google */ }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: any, @Res() res: Response) {
    const data = req.user as { email?: string; name?: string; avatarUrl?: string; providerId: string; provider: 'google' };
    const result = await this.auth.oauthLogin({
      email: data.email || null,
      name: data.name || null,
      avatarUrl: data.avatarUrl || null,
      provider: 'google',
      providerId: data.providerId,
    });
    const front = process.env.FRONT_BASE_URL || 'http://localhost:3000';
    const url = `${front.replace(/\/$/, '')}/auth/social/callback?token=${encodeURIComponent(result.token)}`;
    return res.redirect(url);
  }
}
