import { Controller, Get, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { CustomFilter } from './custom.filter';

@Controller()
// @UseInterceptors(TimeInterceptor)
// @UsePipes(ValidatePipe)
// @UseFilters(CustomFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('handler...');

    return this.appService.getHello();
  }

  @Get('/test1')
  @UseGuards(LoginGuard)
  getTest1(): string {
    console.log('test1...');

    return 'test1';
  }

  @Get('/test2')
  // @UseInterceptors(TimeInterceptor)
  getTest2(): string {
    console.log('test2...');

    return 'test2';
  }

  @Get('/test3')
  @UseFilters(CustomFilter)
  getTest3(@Query('num', ValidatePipe) num: number): string {
    console.log('test3...');

    return `test3: ${num + 1}`;
  }
}
