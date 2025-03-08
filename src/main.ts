import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist:true}))
  // Setup Swagger documentation
  if(process.env.NODE_ENV === 'development'){
  const config = new DocumentBuilder()
    .setTitle('Orphanage Management API')
    .setDescription('API documentation for the Orphanage Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
