import { NestFactory } from '@nestjs/core';
import { AppModule } from './applications/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT_S ?? 3000);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  console.log(
    router.stack
      .filter(r => r.route)
      .map(r => r.route.path)
  );
}
bootstrap();
