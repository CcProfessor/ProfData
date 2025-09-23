import { NestFactory } from '@nestjs/core';
import { AppModule } from './applications/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT_S ?? 3000);

  const address = await app.getUrl();
  Logger.log(`🚀 Server is running at ${address}`);

  // ✅ Loga rotas usando Express
  const server = app.getHttpAdapter().getInstance();
  if (server._router) {
    const routes: string[] = [];
    server._router.stack.forEach((middleware) => {
      if (middleware.route) {
        const methods = Object.keys(middleware.route.methods)
          .map((m) => m.toUpperCase())
          .join(', ');
        routes.push(`${methods} ${middleware.route.path}`);
      }
    });

    Logger.log('📌 Routes:\n' + routes.join('\n'));
  } else {
    Logger.warn('⚠️ Não encontrei rotas no _router (provavelmente não é Express).');
  }
}
bootstrap();
