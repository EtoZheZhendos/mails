import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3100);
}
bootstrap().then(() => {
  console.log(`Server started on ${3100} port`);
});
//  TODO:
// 1. Добавление исходящих
// 2. Удаление исходящих

// 1. Получение входящих/исходящих
// 4. Удаление входящих
//
