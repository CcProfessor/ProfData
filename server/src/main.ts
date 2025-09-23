import { NestFactory } from '@nestjs/core';
import { AppModule } from './applications/app.module';


import { Logger } from '@nestjs/common'; // Temp

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT_S ?? 3000);

   const server = app.getHttpServer();
  const address = await app.getUrl();
  Logger.log(`🚀 Server is running at ${address}`);

  // Lista rotas
  const router = server._events.request?.router;
  if (router) {
    const routes = [];
    router.stack.forEach((layer) => {
      if (layer.route) {
        const path = layer.route?.path;
        const methods = Object.keys(layer.route.methods)
          .map((m) => m.toUpperCase())
          .join(', ');
        routes.push(`${methods} ${path}`);
      }
    });
    Logger.log('📌 Routes:\n' + routes.join('\n'));
  } else {
    Logger.warn('⚠️ Não consegui ler rotas via Express. Use um módulo como @nestjs/core/RouterExplorer');
  }
}
bootstrap();
