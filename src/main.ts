import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { CustomFilter } from './custom.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global sync middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`before global middleware: ${req.url}`);

    next();

    console.log(`after global middleware: ${req.url}`);
  });

  // Global async middleware
  // app.use(async (req: Request, res: Response, next: NextFunction) => {
  //   console.log(`before global middleware: ${req.url}`);

  //   await next();

  //   console.log(`after global middleware: ${req.url}`);
  // });

  // app.useGlobalGuards(new LoginGuard());

  // app.useGlobalInterceptors(new TimeInterceptor());

  // app.useGlobalPipes(new ValidatePipe());

  // app.useGlobalFilters(new CustomFilter());

  await app.listen(3000);
}

bootstrap();
