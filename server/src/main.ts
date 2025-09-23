import { NestFactory } from '@nestjs/core';
import { AppModule } from './applications/app.module';
import { Logger } from '@nestjs/common';
import { RouterExplorer } from '@nestjs/core/router-explorer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT_S ?? 3000);

  const address = await app.getUrl();
  Logger.log(`🚀 Server is running at ${address}`);

  // ✅ Usa RouterExplorer (oficial do Nest)
  const { container } = app as any;
  const modulesContainer = container.getModules();
  const routerExplorer = app.get(RouterExplorer);

  const allRoutes = [];
  modulesContainer.forEach((moduleRef, moduleName) => {
    routerExplorer.explore(moduleRef.routes, moduleRef.metatype).forEach((route) => {
      allRoutes.push(`${route.requestMethod.toUpperCase()} ${route.path}`);
    });
  });

  Logger.log('📌 Routes:\n' + allRoutes.join('\n'));
}
bootstrap();
