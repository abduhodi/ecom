import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { LoggerFactory } from './logger/logger';

const start = async () => {
  try {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('E-Ashyo shop')
      .setDescription('Project for E-Ashyo shop')
      .setVersion('1.0.0')
      .addTag('NodeJs, NestJS, Postgress, Sequielize, JWT, OTP, Swagger')
      .build();

    const PORT = process.env.PORT || 3333;
    const app = await NestFactory.create(AppModule, {
      logger: LoggerFactory('nest'),
    });
    app.setGlobalPrefix('api');
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    app.enableCors({
      origin: true,
      credentials: true,
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    const url = process.env.API_HOST;
    const port = process.env.PORT;

    await app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
      console.log(`doc: ${url}:${port}/api/docs`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
