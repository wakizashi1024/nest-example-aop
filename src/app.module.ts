import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogMiddleware } from './log.middleware';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { CustomFilter } from './custom.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: LoginGuard,
    // },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: TimeInterceptor,
    },
    // {
    //   provide: 'APP_PIPE',
    //   useClass: ValidatePipe,
    // },
    {
      provide: 'APP_FILTER',
      useClass: CustomFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('test1*');
  }
}
