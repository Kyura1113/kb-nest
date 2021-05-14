import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { logger } from './middleware/logger.middleware'
import { TransformInterceptor} from "./interceptor/transform.interceptor";
import { HttpExceptionFilter } from "./filter/http-exception.filter";
import { AllExceptionsFilter } from "./filter/all-exception.filter"
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(logger);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
