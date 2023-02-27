import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';
import { CustomLogger } from 'src/logging/CustomLogger.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private logger: CustomLogger) {}

  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = error.getStatus();

    if (error instanceof Error) {
      this.logger.error(error.message, error.stack);

      response.status(status).json({
        statusCode: status,
        url: request.url,
        message: status === 500 ? 'Internal Server Error' : error.message,
      });
    }
  }
}
