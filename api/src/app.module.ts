import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60,        // 60s
      limit: 5,       // 5 requêtes / minute / IP / handler
    }]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
