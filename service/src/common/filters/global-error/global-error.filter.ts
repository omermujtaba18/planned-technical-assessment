import {
  ArgumentsHost,
  Catch,
  HttpStatus,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let message: string | object, status: number;

    if (exception instanceof HttpException) {
      message = exception.getResponse();
      status = exception.getStatus();
    } else {
      this.logger.error((exception as any).message, {
        stack: (exception as any).stack,
        error: exception as any,
      });

      message = {
        message: 'Something went wrong!',
        error: 'Unknown error',
        statusCode: 500,
      };
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json(message);
  }
}
