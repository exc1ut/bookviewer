import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import next from 'next';
import { resolve } from 'path';

declare const module: any;

const dev = process.env.NODE_ENV !== 'production';

const nextApp = next({ dev, dir: resolve(__dirname, '../client/') });
export const nextHandle = nextApp.getRequestHandler();

async function bootstrap() {
  await nextApp.prepare();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
