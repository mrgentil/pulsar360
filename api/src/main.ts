import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // Validation globale des DTO
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  // Active CORS pour le front (supporte plusieurs origines via liste séparée par des virgules)
  const corsEnv = process.env.CORS_ORIGIN ?? '';
  const allowedOrigins = corsEnv
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  app.enableCors({
    origin:
      allowedOrigins.length === 0
        ? true // si non défini, autorise tout en dev
        : (origin, callback) => {
            // autorise requêtes sans origine (curl, Postman)
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) return callback(null, true);
            return callback(new Error('Not allowed by CORS'), false);
          },
    credentials: true,
  });
  if (allowedOrigins.length === 0) {
    Logger.log('CORS origin: ANY', 'Bootstrap');
  } else {
    Logger.log(`CORS origin: ${allowedOrigins.join(', ')}`, 'Bootstrap');
  }

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
  const url = await app.getUrl();
  Logger.log(`API en écoute: ${url} (prefix: /api)`, 'Bootstrap');
}
bootstrap();
