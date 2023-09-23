import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
  .setTitle('Cello')
  .setDescription('Online Shop API')
  .addBearerAuth()
  .setVersion('0.0.1')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('shop', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  await app.listen(process.env.PORT);
}
bootstrap();
