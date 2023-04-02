import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.enableCors();

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Documentations RestFul api')
    .setDescription('Prueba de Api RestFul de la prueba tecnica Back-end')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentations', app, document);

    await app.listen(process.env.PORT || 3000);
  
}
bootstrap();
