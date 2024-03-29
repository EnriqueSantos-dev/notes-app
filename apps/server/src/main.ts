import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const PORT = Number(process.env.PORT) || 4000;
  await app.listen(PORT);
}
bootstrap();
