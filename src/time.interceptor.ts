import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();

    // controller class, handler function
    console.log(context.getClass(), context.getHandler());

    return next.handle().pipe(
      tap(() => {
        console.log(`Time: ${Date.now() - startTime}ms`);
      }),
    );
  }
}
