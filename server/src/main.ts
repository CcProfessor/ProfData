import { NestFactory } from '@nestjs/core';
import { AppModule } from './applications/app.module';
import { Logger } from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { ModuleRef } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT_S ?? 3000);

  const address = await app.getUrl();
  Logger.log(`🚀 Server is running at ${address}`);

  // ✅ Lista todas as rotas via servidor HTTP
  const server = app.getHttpServer();
  const router = server._events.request?.router;

  if (router && router.stack) {
    const routes: string[] = [];
    router.stack.forEach((layer) => {
      if (layer.route) {
        const path = layer.route.path;
        const methods = Object.keys(layer.route.methods)
          .map((m) => m.toUpperCase())
          .join(', ');
        routes.push(`${methods} ${path}`);
      }
    });
    Logger.log('📌 Routes:\n' + routes.join('\n'));
  } else {
    Logger.warn('⚠️ Nenhuma rota encontrada — pode ser que esteja usando Fastify, ou que a estrutura mudou.');
  }
}
bootstrap();
