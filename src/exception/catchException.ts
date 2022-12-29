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
      const { httpAdapter } = this.httpAdapterHost;
      const ctx = host.switchToHttp();

      let status: number
      let message: string
      if(exception instanceof HttpException) {
        status = exception.getStatus()
        message = exception.message
      } else {
        console.log(exception)
        
        status = HttpStatus.INTERNAL_SERVER_ERROR
        message = '서버 오류입니다.'
      }
  
      const responseBody:ErrorResponseDto = {
        status,
        message,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };
  
      httpAdapter.reply(ctx.getResponse(), responseBody);
    }
  }
  