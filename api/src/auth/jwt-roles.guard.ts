import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../prisma.service';

@Injectable()
export class JwtRolesGuard extends AuthGuard('jwt') {
  private rolesGuard: RolesGuard;

  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {
    super();
    this.rolesGuard = new RolesGuard(reflector, prisma);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // D'abord vérifier l'authentification JWT
    const jwtResult = await super.canActivate(context);
    if (!jwtResult) {
      return false;
    }

    // Ensuite vérifier les rôles
    return this.rolesGuard.canActivate(context);
  }
}
