import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { LoggerFactory } from './logger/logger';
import * as express from 'express';
import { join } from 'path';

const start = async () => {
  try {
    const config = new DocumentBuilder()
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
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.use('/static', express.static(join(__dirname, '..', 'static')));

    await app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
