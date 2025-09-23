import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';
import { MailerService } from '../mailer/mailer.service';
import { verifyEmailTemplate } from '../mailer/templates/verify-email';
import { resetPasswordTemplate } from '../mailer/templates/reset-password';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mailer: MailerService,
  ) {}

  private sign(sub: string, email: string, jti?: string) {
    const payload = { sub, email, jti: jti || uuidv4() };
    return this.jwt.sign(payload);
  }

  async isTokenRevoked(jti: string): Promise<boolean> {
    const revokedToken = await this.prisma.revokedToken.findUnique({
      where: { jti },
    });
    return !!revokedToken;
  }

  async oauthLogin(params: { email?: string | null; name?: string | null; avatarUrl?: string | null; provider: 'google' | 'facebook'; providerId: string }) {
    const email = params.email?.toLowerCase().trim();
    if (!email) {
      throw new BadRequestException(`Impossible d'obtenir l'e-mail depuis ${params.provider}`);
    }

    const publicSelect = { id: true, email: true, name: true, role: true, isEmailVerified: true, avatarUrl: true } as const;
    let user = await this.prisma.user.findUnique({ where: { email }, select: publicSelect });
    if (!user) {
      // Crée l'utilisateur avec un mot de passe aléatoire et email vérifié
      const password = randomBytes(24).toString('hex');
      user = await this.prisma.user.create({
        data: {
          email,
          name: params.name || null,
          password,
          role: 'EDITOR' as any,
          isEmailVerified: true,
          avatarUrl: params.avatarUrl || null,
          provider: params.provider,
          providerId: params.providerId,
        },
        select: publicSelect,
      });
    } else {
      // Associe/actualise le provider et l'avatar si fourni
      await this.prisma.user.update({
        where: { email },
        data: { provider: params.provider, providerId: params.providerId, avatarUrl: params.avatarUrl || undefined },
      });
    }

    if (!user) throw new BadRequestException('Connexion OAuth échouée');
    const token = this.sign(user.id, user.email);
    return { user, token };
  }

  private buildVerifyUrl(token: string) {
    const baseFront = process.env.FRONT_BASE_URL; // si tu veux que le front gère l’activation
    const baseApi = process.env.APP_BASE_URL;     // sinon, lien direct vers l’API
    const path = `/auth/verify-email?token=${token}`;

    if (baseFront) return `${baseFront}${path}`;
    if (baseApi)   return `${baseApi}${path}`;
    const port = process.env.PORT || '3001';
    return `http://localhost:${port}/api${path}`;
  }

  async register(dto: RegisterDto) {
    const email = String(dto.email).trim().toLowerCase();
    const passwordHash = await argon2.hash(dto.password, { type: argon2.argon2id });

    let user;
    try {
      user = await this.prisma.user.create({
        data: {
          email,
          password: passwordHash,
          name: dto.name?.trim() || null,
          role: 'EDITOR' as any, // tu peux forcer OWNER si tu veux
          isEmailVerified: false,
        },
        select: { id: true, email: true, name: true, role: true, isEmailVerified: true },
      });
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        // Anti-énumération : on répond de façon neutre
        return { ok: true, message: 'Si un compte existe, un e-mail de vérification a été envoyé.' };
      }
      throw e;
    }

    // Crée un token unique, expirant dans 30 minutes
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await this.prisma.verificationToken.create({
      data: { userId: user.id, token, expiresAt },
    });

    const verifyUrl = this.buildVerifyUrl(token);
    await this.mailer.sendMail(
      user.email,
      `Active ton compte Pulsar360`,
      verifyEmailTemplate({ name: user.name, verifyUrl }),
    );

    // Réponse neutre 👇
    return { ok: true, message: 'Vérifie ta boîte mail pour activer ton compte.' };
  }

  async resend(emailRaw: string) {
    const email = String(emailRaw).trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });
    // Toujours réponse neutre
    if (!user) return { ok: true, message: 'Si un compte existe, un e-mail a été envoyé.' };
    if (user.isEmailVerified) return { ok: true, message: 'Compte déjà vérifié.' };

    // Invalide les anciens tokens (optionnel)
    await this.prisma.verificationToken.deleteMany({
      where: { userId: user.id, usedAt: null },
    });

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    await this.prisma.verificationToken.create({ data: { userId: user.id, token, expiresAt } });

    const verifyUrl = this.buildVerifyUrl(token);
    await this.mailer.sendMail(
      user.email,
      `Nouveau lien d’activation — Pulsar360`,
      verifyEmailTemplate({ name: user.name, verifyUrl }),
    );

    return { ok: true, message: 'Si un compte existe, un e-mail a été envoyé.' };
  }

  async verifyEmail(token: string) {
    const record = await this.prisma.verificationToken.findUnique({ where: { token } });
    if (!record || record.usedAt || record.expiresAt < new Date()) {
      throw new BadRequestException('Lien invalide ou expiré');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({ where: { id: record.userId }, data: { isEmailVerified: true } });
      await tx.verificationToken.update({ where: { id: record.id }, data: { usedAt: new Date() } });
    });

    return { ok: true, message: 'E-mail vérifié. Tu peux te connecter.' };
  }

  async login(dto: LoginDto) {
    const email = String(dto.email).trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Identifiants invalides');

    const ok = await argon2.verify(user.password, dto.password);
    if (!ok) throw new UnauthorizedException('Identifiants invalides');

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Compte non vérifié. Vérifie tes e-mails.');
    }

    const payload = { id: user.id, email: user.email, name: user.name, role: user.role as any };
    return { user: payload, token: this.sign(user.id, user.email) };
  }

  private buildResetUrl(token: string) {
    const baseFront = process.env.FRONT_BASE_URL;
    const path = `/auth/reset-password?token=${token}`;
    
    if (baseFront) return `${baseFront}${path}`;
    const port = process.env.PORT || '3001';
    return `http://localhost:3000${path}`;
  }

  async forgotPassword(emailRaw: string) {
    const email = String(emailRaw).trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });
    
    // Toujours réponse neutre pour éviter l'énumération d'emails
    if (!user) {
      return { ok: true, message: 'Si un compte existe, un e-mail de récupération a été envoyé.' };
    }

    // Invalide les anciens tokens de reset
    await this.prisma.verificationToken.deleteMany({
      where: { userId: user.id, usedAt: null },
    });

    // Crée un nouveau token de reset, expirant dans 1 heure
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 heure

    await this.prisma.verificationToken.create({
      data: { userId: user.id, token, expiresAt },
    });

    const resetUrl = this.buildResetUrl(token);
    await this.mailer.sendMail(
      user.email,
      'Réinitialisation de mot de passe - Pulsar360',
      resetPasswordTemplate({ name: user.name, resetUrl }),
    );

    return { ok: true, message: 'Si un compte existe, un e-mail de récupération a été envoyé.' };
  }

  async resetPassword(token: string, newPassword: string) {
    const record = await this.prisma.verificationToken.findUnique({ where: { token } });
    if (!record || record.usedAt || record.expiresAt < new Date()) {
      throw new BadRequestException('Lien invalide ou expiré');
    }

    const passwordHash = await argon2.hash(newPassword, { type: argon2.argon2id });

    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: record.userId },
        data: { password: passwordHash },
      });
      await tx.verificationToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      });
    });

    return { ok: true, message: 'Mot de passe réinitialisé avec succès.' };
  }

  async getAllUsers(requesterId: string) {
    // Vérifier que le demandeur est OWNER ou ADMIN
    const requester = await this.prisma.user.findUnique({
      where: { id: requesterId },
      select: { role: true },
    });

    if (!requester || !['OWNER', 'ADMIN'].includes(requester.role)) {
      throw new UnauthorizedException('Accès refusé');
    }

    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isEmailVerified: true,
        avatarUrl: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateUserRole(requesterId: string, userId: string, newRole: string) {
    // Vérifier que le demandeur est OWNER
    const requester = await this.prisma.user.findUnique({
      where: { id: requesterId },
      select: { role: true },
    });

    if (!requester || requester.role !== 'OWNER') {
      throw new UnauthorizedException('Seul le propriétaire peut modifier les rôles');
    }

    // Vérifier que le nouveau rôle est valide
    const validRoles = ['OWNER', 'ADMIN', 'EDITOR', 'VIEWER'];
    if (!validRoles.includes(newRole)) {
      throw new BadRequestException('Rôle invalide');
    }

    // Ne pas permettre de modifier son propre rôle
    if (requesterId === userId) {
      throw new BadRequestException('Vous ne pouvez pas modifier votre propre rôle');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { role: newRole as any },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isEmailVerified: true,
        avatarUrl: true,
      },
    });

    return { user: updatedUser, message: 'Rôle mis à jour avec succès' };
  }

  async logout(userId: string, jti: string) {
    // Ajouter le token à la liste des tokens révoqués
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 jours
    
    await this.prisma.revokedToken.create({
      data: {
        jti,
        userId,
        expiresAt,
      },
    });

    return { ok: true, message: 'Déconnexion réussie' };
  }

  async refreshToken(oldJti: string, userId: string, email: string) {
    // Vérifier que l'ancien token n'est pas révoqué
    const isRevoked = await this.isTokenRevoked(oldJti);
    if (isRevoked) {
      throw new UnauthorizedException('Token révoqué');
    }

    // Révoquer l'ancien token
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await this.prisma.revokedToken.create({
      data: {
        jti: oldJti,
        userId,
        expiresAt,
      },
    });

    // Générer un nouveau token
    const newJti = uuidv4();
    const newToken = this.sign(userId, email, newJti);

    return { token: newToken, jti: newJti };
  }

  // Nettoyage périodique des tokens expirés
  async cleanupExpiredTokens() {
    await this.prisma.revokedToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}
