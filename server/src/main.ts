import { NestFactory } from '@nestjs/core';
import { AppModule } from './applications/app.module';

const serverUrl = process.env.SERVER_LINK || "http://localhost:3000";
const playerUrl = process.env.PLAYER_LINK || "http://localhost:5175";
const targetUrl = process.env.TARGET_LINK || "http://localhost:5174";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      playerUrl,
      targetUrl,
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  await app.listen(process.env.PORT_S ?? 3000);
}
bootstrap();
