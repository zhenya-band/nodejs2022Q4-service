import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './CustomLogger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: CustomLogger) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, query, body } = req;

    res.on('finish', () => {
      const { statusMessage, statusCode } = res;
      const timestamp = new Date().toUTCString();
      const log = `${timestamp} [Request] url: ${req.url} method: ${method} body: ${JSON.stringify(
        body,
      )} query: ${JSON.stringify(query)} [Response] ${res.statusCode} ${JSON.stringify(statusMessage)}`;

      if (statusCode >= 200 && statusCode < 300) {
        this.logger.log(log);
      }

      if (statusCode >= 400) {
        this.logger.error(log);
      }
    });
    next();
  }
}
