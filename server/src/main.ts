import { NestFactory } from '@nestjs/core';
import { AppModule } from './applications/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT_S ?? 3000);
}
bootstrap();
