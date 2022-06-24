import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { PrismaService } from './prisma/prisma.service';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: true,
  });

  const config = new DocumentBuilder()
    .setTitle('TestING Advisor API')
    .setDescription('The TestING Advisor API description')
    .setVersion('1.0')
    .addTag('testadvisor')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(PORT);
}
bootstrap();
