import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IConfiguration } from './config/configuration';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { GlobalErrorFilter } from './common/filters/global-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<IConfiguration>(ConfigService);

  app.enableCors({ origin: config.appUrl });

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new GlobalErrorFilter(app.get(Logger)));

  await app.listen(config.port);
}
bootstrap();
