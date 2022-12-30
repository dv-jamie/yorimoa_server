import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';

  @Catch()
  export class CatchException implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: unknown, host: ArgumentsHost): void {
      console.log(exception)
      
      const { httpAdapter } = this.httpAdapterHost;
      const ctx = host.switchToHttp();

      let status: number
      let message: any
      if(exception instanceof HttpException) {
        status = exception.getStatus()
        message = exception.message
      } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR
        message = '서버 오류입니다.'
      }
  
      const data:ErrorDataDto = {
        message,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest())
      }
      const responseBody:ResponseDto = { status, data }
  
      httpAdapter.reply(ctx.getResponse(), responseBody);
    }
  }
  