import { Body, Controller, Get, HttpCode, Post, Query, Req, Res, UseGuards, Put, Param, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtRolesGuard } from './jwt-roles.guard';
import { Roles } from './roles.decorator';
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

  @Throttle({ default: { limit: 3, ttl: 60 } })
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.auth.forgotPassword(dto.email);
  }

  @HttpCode(200)
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.auth.resetPassword(dto.token, dto.password);
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

  // Facebook OAuth
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() { /* redirection vers Facebook */ }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookCallback(@Req() req: any, @Res() res: Response) {
    const data = req.user as { email?: string; name?: string; avatarUrl?: string; providerId: string; provider: 'facebook' };
    const result = await this.auth.oauthLogin({
      email: data.email || null,
      name: data.name || null,
      avatarUrl: data.avatarUrl || null,
      provider: 'facebook',
      providerId: data.providerId,
    });
    const front = process.env.FRONT_BASE_URL || 'http://localhost:3000';
    const url = `${front.replace(/\/$/, '')}/auth/social/callback?token=${encodeURIComponent(result.token)}`;
    return res.redirect(url);
  }

  // Gestion des utilisateurs et rôles
  @Get('users')
  @UseGuards(JwtRolesGuard)
  @Roles('OWNER', 'ADMIN')
  async getAllUsers(@Req() req: any) {
    return this.auth.getAllUsers(req.user.userId);
  }

  @Put('users/:id/role')
  @UseGuards(JwtRolesGuard)
  @Roles('OWNER')
  async updateUserRole(@Req() req: any, @Param('id') userId: string, @Body('role') role: string) {
    return this.auth.updateUserRole(req.user.userId, userId, role);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: any) {
    const jti = req.user?.jti;
    if (!jti) {
      throw new BadRequestException('Token invalide');
    }
    return this.auth.logout(req.user.userId, jti);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refresh(@Req() req: any) {
    const { jti, userId, email } = req.user;
    if (!jti || !userId || !email) {
      throw new BadRequestException('Token invalide');
    }
    return this.auth.refreshToken(jti, userId, email);
  }
}
