import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './applications/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT_S ?? 3000);

  const serverUrl = await app.getUrl();
  Logger.log(`🚀 Server is running at ${serverUrl}`);

  // 👇 maneira oficial de acessar rotas no Express
  const httpAdapter = app.getHttpAdapter();

  /* if (httpAdapter.getInstance) {
    const instance = httpAdapter.getInstance(); // Express app
    if (instance?._router?.stack) {
      const routes = [];
      instance._router.stack.forEach((layer) => {
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
      Logger.warn('⚠️ Não achei _router dentro do Express instance');
    }
  } */
}
bootstrap();
