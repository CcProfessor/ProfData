import { NestFactory } from '@nestjs/core';
import { AppModule } from './applications/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "https://turbo-space-yodel-974px7q6wjrw2x9gx-5175.app.github.dev",
      "https://turbo-space-yodel-974px7q6wjrw2x9gx-5175.app.github.dev/login",
      "https://turbo-space-yodel-974px7q6wjrw2x9gx-5174.app.github.dev",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  await app.listen(process.env.PORT_S ?? 3000);
}
bootstrap();
