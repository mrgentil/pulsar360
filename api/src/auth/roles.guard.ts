import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;
    
    if (!userId) {
      return false;
    }

    // Récupère l'utilisateur avec son rôle
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      return false;
    }

    // Hiérarchie des rôles (du plus élevé au plus bas)
    const roleHierarchy: Record<Role, number> = {
      OWNER: 4,
      ADMIN: 3,
      EDITOR: 2,
      VIEWER: 1,
    };

    const userRoleLevel = roleHierarchy[user.role];
    const requiredLevel = Math.min(...requiredRoles.map(role => roleHierarchy[role]));

    return userRoleLevel >= requiredLevel;
  }
}
